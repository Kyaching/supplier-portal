import UserList from "./UserList";
import {LuSaveAll} from "react-icons/lu";
import {FiPlus} from "react-icons/fi";
import {useCallback, useEffect, useState} from "react";
import EmptyItems from "./EmptyItem";
import {DndContext} from "@dnd-kit/core";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";
import {useGet, usePost} from "../hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";

const DNDContainer = () => {
  const {data, loading, error} = useGet("/users");
  const {post, error: err} = usePost();
  const [userData, setUserData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [newUserId, setNewUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [maximizeState, setMaximizeState] = useState({});

  useEffect(() => {
    if (data) {
      setUserData(data);
      setOriginalData(data);
    }
  }, [data]);

  const handleFormChange = updatedUsers => {
    setUserData(updatedUsers);
  };

  const isNewUserComplete = useCallback(() => {
    if (newUserId) {
      // Check if the new user's form is complete
      const newUser = userData.find(user => user.id === newUserId);
      if (newUser) {
        const isFilled = Object.values(newUser).every(v => v !== "");
        console.log("New user is filled:", isFilled);
        return isFilled;
      } else {
        console.log("New user not found.");
        return false;
      }
    } else {
      // Check for changes in the existing user data
      const original = originalData || [];

      const changes = !original.every(
        (user, index) =>
          JSON.stringify(user) === JSON.stringify(userData[index])
      );
      // const changes = !isEqual(!originalData || userData);
      console.log("Changes Detected:", changes);
      return changes;
    }
  }, [userData, newUserId, originalData]);

  console.log(originalData.length, userData.length);
  useEffect(() => {
    setIsEditing(isNewUserComplete);
  }, [isNewUserComplete, originalData]);

  const complete = isNewUserComplete();
  console.log("Complete", complete);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      first_name: "",
      last_name: "",
      email: "",
      user_name: "",
      tenant_id: "1",
    };
    setUserData(prev => [newUser, ...prev]);
    setNewUserId(newUser.id);
    setIsEditing(false);

    setMaximizeState(prev => {
      const newMaximizeState = {...prev, [newUser.id]: true};
      localStorage.setItem("maximizeState", JSON.stringify(newMaximizeState));
      return newMaximizeState;
    });
  };

  const handleSaveAll = async () => {
    try {
      await post("/users", userData);
      setNewUserId(null);
      setIsEditing(false);
      setOriginalData(userData);
      toast.success("Updated User Successfully");
      // await refetch();
    } catch (error) {
      console.log("Error Occurred", error);
      toast.error("Something went wrong");
    }

    console.log(userData);
  };

  const handleDragEnd = event => {
    const {active, over} = event;

    if (newUserId) {
      const newUser = userData.find(user => user.id === newUserId);
      const isFilled = newUser && Object.values(newUser).every(v => v !== "");

      if (!isFilled) {
        toast("Please fill all input field.", {
          icon: "ℹ",
        });
        return;
      }
    }
    if (over && active.data.current.type === "empty") {
      const newUser = {
        id: Date.now(),
        first_name: "",
        last_name: "",
        email: "",
        user_name: "",
        tenant_id: "1",
      };
      setUserData(prev => [newUser, ...prev]);
      setNewUserId(newUser.id);
      setIsEditing(false);

      setMaximizeState(prev => {
        const newMaximizeState = {...prev, [newUser.id]: true};
        localStorage.setItem("maximizeState", JSON.stringify(newMaximizeState));
        return newMaximizeState;
      });
    }

    localStorage.setItem("userData", JSON.stringify(userData));
  };
  console.log(userData);
  const isSaveButtonDisabled = !isEditing;

  const handleMaximize = id => {
    setMaximizeState(prev => {
      const newMaximizeState = {...prev, [id]: !prev[id]};
      localStorage.setItem("maximizeState", JSON.stringify(newMaximizeState));
      return newMaximizeState;
    });
  };

  useEffect(() => {
    const storedMaximizeState = localStorage.getItem("maximizeState");
    if (storedMaximizeState) {
      setMaximizeState(JSON.parse(storedMaximizeState));
    }
  }, []);

  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     setUserData(JSON.parse(storedUserData));
  //   } else {
  //     setUserData(userData || []);
  //   }
  // }, [userData]);
  if (error) return <p>Error: {error}</p>;
  if (!userData) return <p>No data available</p>;
  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToWindowEdges]}>
        <div className="m-4 grid grid-cols-2 gap-2">
          <EmptyItems onDragEnd={handleDragEnd} />

          <div className="w-[500px]">
            <div className=" flex gap-2">
              <button
                className={newUserId ? `cursor-not-allowed opacity-50` : ``}
                disabled={!!newUserId}
                onClick={handleAddUser}
              >
                <FiPlus></FiPlus>
              </button>
              <button
                className={
                  isSaveButtonDisabled ? `cursor-not-allowed opacity-50` : ``
                }
                disabled={isSaveButtonDisabled}
                onClick={handleSaveAll}
              >
                <LuSaveAll></LuSaveAll>
              </button>
            </div>

            {loading ? (
              <div className=" p-3 text-center">Loading...</div>
            ) : (
              <UserList
                userData={userData}
                setUserData={setUserData}
                onChange={handleFormChange}
                newUserId={newUserId}
                setNewUserId={setNewUserId}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleMaximize={handleMaximize}
                maximizeState={maximizeState}
                setMaximizeState={setMaximizeState}
                toast={toast}
                setOriginalData={setOriginalData}
              />
            )}
          </div>
        </div>
      </DndContext>
      <Toaster />
    </div>
  );
};

export default DNDContainer;
