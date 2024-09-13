import {AiOutlineDelete} from "react-icons/ai";

import {Input} from "@/components/ui/input";
import {FiMaximize} from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {Label} from "../ui/label";

const UserItem = () => {
  return (
    <div className="cursor-grab h-4/5">
      <div
        className="flex items-center justify-between bg-sky-500 px-1
       text-white border rounded-t-lg"
      >
        <p>0</p>
        <div className="flex gap-1">
          <button>
            <FiMaximize className="cursor-pointer" />
          </button>
          <AiOutlineDelete />
        </div>
      </div>

      <form className="grid grid-cols-4 gap-2 bg-gray-200 p-1 border rounded-b-lg">
        <div>
          <Label>First Name</Label>
          <Input className="h-6" />
        </div>
        <div>
          <Label>Last Name</Label>
          <Input className="h-6" />
        </div>

        <div className="col-span-2">
          <Label>Email</Label>
          <Input className="h-6" />
        </div>
        <div>
          <Label>User Name</Label>
          <Input className="h-6" />
        </div>
        <div>
          <Label>Job Title</Label>
          <Select>
            <SelectTrigger className="h-6">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Frontend">Frontend</SelectItem>
              <SelectItem value="Backend">Backend</SelectItem>
              <SelectItem value="Full Stack">Full Stack</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>User Type</Label>
          <Select>
            <SelectTrigger className="h-6">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Employee">Employee</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Tenant Id</Label>
          <Select>
            <SelectTrigger className="h-6">
              <SelectValue defaultValue={"1"} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  );
};

export default UserItem;
