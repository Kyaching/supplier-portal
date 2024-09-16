import {TableCell, TableRow} from "../ui/table";
import {Checkbox} from "../ui/checkbox";
import {Input} from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import PropTypes from "prop-types";
import {FiSave, FiX} from "react-icons/fi";
import {useState} from "react";
import {usePost} from "../hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";

const DepartmentForm = ({addDept, setAddDept, onAddDepartments}) => {
  const {post} = usePost();
  const [data, setData] = useState({
    id: "",
    dept_name: "",
  });
  const handleInputChange = e => {
    const {name, value} = e.target;

    setData(pre => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleAddDepartment = async () => {
    const {id, dept_name} = data;
    const parseId = parseInt(id);
    const newData = {id: parseId, dept_name};

    try {
      await post("/departments", newData);
      toast.success("Added Successfully");
      onAddDepartments(); // Call the function passed as prop
      setAddDept(!addDept);
    } catch (error) {
      toast.error("Failed to add department");
    }
  };

  const handleRemove = () => {
    setAddDept(!addDept);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox></Checkbox>
      </TableCell>
      <TableCell>
        <Input
          className="w-12"
          placeholder="ID"
          name="id"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Department Name"
          name="dept_name"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <button
                  type="button"
                  className="hover:bg-green-500 p-2 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                  onClick={handleAddDepartment}
                >
                  <FiSave className="text-base"></FiSave>
                </button>
              </TooltipTrigger>
              <TooltipContent>Save</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <button
            type="button"
            onClick={handleRemove}
            className="hover:bg-red-400 p-1 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
          >
            <FiX className="text-base"></FiX>
          </button>
        </div>
      </TableCell>
      <Toaster />
    </TableRow>
  );
};

DepartmentForm.propTypes = {
  addDept: PropTypes.bool.isRequired,
  setAddDept: PropTypes.func.isRequired,
  onAddDepartments: PropTypes.func.isRequired,
};

export default DepartmentForm;
