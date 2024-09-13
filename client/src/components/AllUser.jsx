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
} from "@/components/ui/tooltip";

import {useForm} from "react-hook-form";
import {FiEdit, FiSave, FiX} from "react-icons/fi";
import {useEffect, useRef, useState} from "react";
import toast, {Toaster} from "react-hot-toast";

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const {register, handleSubmit, setValue, reset} = useForm();
  const formRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setEditRow(null);
        reset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [reset]);

  const handleEditUser = (id, index) => {
    setEditRow(id);
    setValue("rowIndex", index);
    setValue("firstname", users[index].firstname);
    setValue("lastname", users[index].lastname);
    setValue("job_title", users[index].job_title);
  };

  const onSubmit = data => {
    const {rowIndex, firstname, lastname, job_title} = data;
    const updatedUser = {
      ...users[rowIndex],
      firstname,
      lastname,
      job_title,
    };
    fetch("http://localhost:3000/api/users/" + editRow, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then(res => res.json())
      .then(updatedData => {
        const newData = users.map((row, index) => {
          if (index === parseInt(rowIndex)) {
            return updatedData;
          }
          return row;
        });
        setUsers(newData);
        toast.success("Updated Successfully");
        setEditRow(null);
      })
      .catch(err => console.log(err));

    // console.log("form data", updatedData);
  };

  const handleDelete = id => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    })
      .then(res => res.json())
      .then(data => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        toast.error("Deleted Succesfully");
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="m-6 p-3 border border-black bg-gray-300 rounded w-3/4 mx-auto">
      <h2 className="text-2xl font-bold text-center p-6">Users Table</h2>
      <hr className="mx-4" />
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Table className="overflow-x-hidden">
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
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <input
                      className="p-2"
                      type="text"
                      {...register("firstname")}
                      defaultValue={user.firstname}
                    />
                  ) : (
                    user.firstname
                  )}
                </TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <input
                      className="p-2"
                      type="text"
                      {...register("lastname")}
                      defaultValue={user.lastname}
                    />
                  ) : (
                    user.lastname
                  )}
                </TableCell>
                <TableCell>
                  {editRow === user.id ? (
                    <input
                      className="p-2"
                      type="text"
                      {...register("job_title")}
                      defaultValue={user.job_title}
                    />
                  ) : (
                    user.job_title
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-3">
                    {editRow === user.id ? (
                      <>
                        <input
                          type="hidden"
                          {...register("rowIndex")}
                          value={index}
                        />
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <button
                                type="submit"
                                className="hover:bg-green-500 p-2 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                              >
                                <FiSave className="text-base"></FiSave>
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
                              onClick={() => handleEditUser(user.id, index)}
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
                      onClick={() => handleDelete(user.id)}
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
      </form>
      <Toaster />
    </div>
  );
};

export default AllUser;
