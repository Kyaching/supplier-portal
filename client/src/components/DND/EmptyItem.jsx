import {Input} from "@/components/ui/input";
import {useDraggable} from "@dnd-kit/core";
import UserItem from "./UserItem";

const EmptyItems = () => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useDraggable({
      id: "draggable",
      data: {
        type: "empty",
      },
    });

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px,0)`,
    transition,
    zIndex: 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="my-2 h-24 w-3/5"
    >
      {isDragging ? (
        <UserItem />
      ) : (
        <>
          <div
            className="flex items-center justify-between h-6 bg-sky-500 px-1
       text-white border rounded-t-lg cursor-grab "
          ></div>
          <form className="grid grid-cols-4 gap-2 bg-gray-200 p-1 border rounded-b-lg">
            <Input className="col-span-2 h-6" />
          </form>
        </>
      )}
    </div>
  );
};

export default EmptyItems;
