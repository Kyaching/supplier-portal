import {TableCell, TableRow} from "../ui/table";
import {Input} from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import PropTypes from "prop-types";
import {FiSave, FiX} from "react-icons/fi";
import {useEffect, useState} from "react";
import {useGet, usePost} from "../hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const EmployeeForm = ({addEmployee, setAddEmployee}) => {
  const {post} = usePost();
  const {data: departments, getData} = useGet("/departments");
  const [data, setData] = useState({
    id: "",
    emp_name: "",
    email: "",
    first_name: "",
    last_name: "",
    job_title: "",
    departmentId: "",
    departmentName: "",
  });

  useEffect(() => {}, [getData, addEmployee]);

  const handleInputChange = e => {
    const {name, value} = e.target;

    setData(pre => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSelectChange = value => {
    const selectedDept = departments.find(dept => dept.id === parseInt(value));
    console.log(selectedDept);
    setData(prev => ({
      ...prev,
      departmentId: value,
      departmentName: selectedDept ? selectedDept.dept_name : "",
    }));
    console.log(data);
  };
  const handleAddEmployee = () => {
    const {
      id,
      emp_name,
      email,
      first_name,
      last_name,
      job_title,
      departmentId,
    } = data;
    const parseId = parseInt(id);
    const newData = {
      id: parseId,
      emp_name,
      email,
      first_name,
      last_name,
      job_title,
      departmentId: parseInt(departmentId),
    };
    post("/employees", newData);
    toast.success("Added Successfully");
    setAddEmployee(!addEmployee);
    console.log(data);
  };

  const handleRemove = () => {
    setAddEmployee(!addEmployee);
  };

  return (
    <TableRow>
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
          placeholder="Employee Name"
          name="emp_name"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Job Title"
          name="job_title"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="First Name"
          name="first_name"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Last Name"
          name="last_name"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Email"
          name="email"
          onChange={e => handleInputChange(e)}
        />
      </TableCell>
      <TableCell>
        <Select name="departmentId" onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>
              {data.departmentName || "Select Department"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {departments?.map(dept => (
              <SelectItem key={dept?.id} value={dept?.id}>
                {dept?.dept_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
                  onClick={handleAddEmployee}
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

EmployeeForm.propTypes = {
  addEmployee: PropTypes.bool.isRequired,
  setAddEmployee: PropTypes.func.isRequired,
};

export default EmployeeForm;
