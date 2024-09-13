import {useEffect, useState} from "react";
import UserItems from "./UserItems";
import {
  DndContext,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {arrayMove, SortableContext} from "@dnd-kit/sortable";
import {restrictToVerticalAxis} from "@dnd-kit/modifiers";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import {usePost} from "../hooks/useAPICall";

const UserList = ({
  onChange,
  userData,
  newUserId,
  setUserData,
  setNewUserId,
  setIsEditing,
  isEditing,
  handleMaximize,
  maximizeState,
  setOriginalData,
}) => {
  const [localUserData, setLocalUserData] = useState([]);
  const {post} = usePost();
  const {setNodeRef} = useDroppable({
    id: "drop",
    data: {
      accepts: ["empty"],
    },
  });

  // useEffect(() => {
  //   setLocalUserData(userData);
  // }, [userData]);

  useEffect(() => {
    // Sort users by order field
    setLocalUserData([...userData].sort((a, b) => a.order - b.order));
  }, [userData]);

  const handleFormChange = (index, data) => {
    const updatedUsers = [...localUserData];
    updatedUsers[index] = {...updatedUsers[index], ...data};
    setLocalUserData(updatedUsers);
    onChange(updatedUsers);
  };
  const handleDragEnd = event => {
    const {active, over} = event;

    if (over && active.id !== over.id) {
      setLocalUserData(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        localStorage.setItem("userData", JSON.stringify(newItems));

        // Update order property
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          order: index,
        }));

        // Save to local storage for immediate UI update
        localStorage.setItem("userData", JSON.stringify(updatedItems));

        // Save order to the backend
        post("/users", updatedItems).catch(error => {
          console.error("Failed to save order:", error);
          toast.error("Failed to save order.");
        });

        return updatedItems;
      });
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  return (
    <div ref={setNodeRef}>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={localUserData?.map(user => user.id)}>
          {localUserData?.map((user, index) => (
            <UserItems
              key={user.id}
              user={user}
              index={index}
              onChange={handleFormChange}
              isNew={user.id === newUserId}
              userData={userData}
              setUserData={setUserData}
              setNewUserId={setNewUserId}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              handleMaximize={handleMaximize}
              maximize={maximizeState[user.id] || false}
              toast={toast}
              setOriginalData={setOriginalData}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

UserList.propTypes = {
  onChange: PropTypes.func.isRequired,
  userData: PropTypes.array.isRequired,
  newUserId: PropTypes.number.isRequired,
  setUserData: PropTypes.func.isRequired,
  setNewUserId: PropTypes.func.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleMaximize: PropTypes.func.isRequired,
  maximizeState: PropTypes.object.isRequired,
};

export default UserList;
