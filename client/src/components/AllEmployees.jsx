import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {FiEdit, FiSave, FiX} from "react-icons/fi";
import {useLoaderData} from "react-router-dom";
import {useDelete, useUpdate} from "./hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";
import {useState} from "react";

const AllEmployees = () => {
  const employeesData = useLoaderData();
  const [employees, setEmployees] = useState(employeesData);
  const [editRowId, setEditRowId] = useState(null);
  const {deleteEmp} = useDelete();
  const {update} = useUpdate();

  const handleChange = (e, id) => {
    const {name, value} = e.target;
    setEmployees(preData =>
      preData.map(row => (row.id === id ? {...row, [name]: value} : row))
    );
  };

  const handleEditEmployee = employee => {
    setEditRowId(employee.id);
  };

  const handleSave = async data => {
    const {index, first_name, last_name, job_title} = data;
    const updateData = {
      ...employees[index],
      first_name,
      last_name,
      job_title,
    };
    await update(`/employees/${data.id}`, updateData);
    setEditRowId(null);
    toast.success("Updated Successfully");
  };

  const handleDelete = id => {
    deleteEmp(`/employees/${id}`);
    const updateData = employees.filter(emp => emp.id !== id);
    setEmployees(updateData);
    toast.error("Deleted Successfully");
  };
  return (
    <div className="m-6 border rounded bg-gray-400">
      <h2 className="text-2xl bold text-center p-6">Employees Table</h2>
      <hr className="mx-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-base text-black">
              User Id
            </TableHead>
            <TableHead className="font-semibold text-base text-black">
              First Name
            </TableHead>
            <TableHead className="font-semibold text-base text-black">
              Last Name
            </TableHead>
            <TableHead className="font-semibold text-base text-black">
              Job Title
            </TableHead>
            <TableHead className="font-semibold text-base text-black">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map(employee => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>
                {editRowId === employee.id ? (
                  <input
                    className="p-2"
                    type="text"
                    name="first_name"
                    value={employee.first_name}
                    onChange={e => handleChange(e, employee.id)}
                  />
                ) : (
                  employee.first_name
                )}
              </TableCell>
              <TableCell>
                {editRowId === employee.id ? (
                  <input
                    className="p-2"
                    type="text"
                    name="last_name"
                    value={employee.last_name}
                    onChange={e => handleChange(e, employee.id)}
                  />
                ) : (
                  employee.last_name
                )}
              </TableCell>
              <TableCell>
                {editRowId === employee.id ? (
                  <input
                    className="p-2"
                    type="text"
                    name="job_title"
                    value={employee.job_title}
                    onChange={e => handleChange(e, employee.id)}
                  />
                ) : (
                  employee.job_title
                )}
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  {editRowId === employee.id ? (
                    <>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <button
                              type="submit"
                              className="hover:bg-green-500 p-2 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                            >
                              <FiSave
                                onClick={() => handleSave(employee)}
                                className="text-base"
                              ></FiSave>
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>Save</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </>
                  ) : (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {" "}
                          <button
                            type="button"
                            onClick={() => handleEditEmployee(employee)}
                            className="hover:bg-blue-400 p-1 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                          >
                            <FiEdit className="text-base"></FiEdit>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Edit</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(employee.id)}
                    className="hover:bg-red-400 p-1 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                  >
                    <FiX className="text-base"></FiX>
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  );
};

export default AllEmployees;
