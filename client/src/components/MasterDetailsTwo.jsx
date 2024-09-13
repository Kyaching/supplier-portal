import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {useCallback, useEffect, useRef, useState} from "react";
import {Checkbox} from "./ui/checkbox";
import {FiEdit, FiSave, FiX} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {useDelete, useGet, useUpdate} from "./hooks/useAPICall";
import EmployeesData from "./EmployeesData";
import toast, {Toaster} from "react-hot-toast";
import DepartmentForm from "./inputform/DepartmentForm";
import {useLoaderData} from "react-router-dom";
const MasterDetailsTwo = () => {
  const [addDept, setAddDept] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const [checked, setChecked] = useState(null);
  const {data, fetchData, setData} = useGet("/departments");
  const [filterEmployeesData, setFilterEmployeesData] = useState(null);
  const {update} = useUpdate();
  const {deleteEmp} = useDelete();
  const [editRow, setEditRow] = useState(null);
  const formRef = useRef(null);
  const loadDepartments = useLoaderData();
  console.log(data);
  const form = useForm({
    defaultValues: {
      id: "",
      dept_name: "",
    },
  });

  useEffect(() => {}, [fetchData, addDept, addEmployee]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setEditRow(null);
        form.reset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [form]);

  const onSubmitDepartment = async formData => {
    const {id, dept_name} = formData;
    console.log(formData);
    const parseId = parseInt(id);

    try {
      await update(`/departments/${editRow}`, {id: parseId, dept_name});

      // Update local state with new department data
      const updatedData = data.map(dept =>
        dept.id === editRow ? {...dept, id: parseId, dept_name} : dept
      );
      setData(updatedData);

      setEditRow(null);
      toast.success("Updated Successfully");

      form.reset();
    } catch (error) {
      toast.error("Failed to update department");
    }
  };

  const fetchFilteredEmployees = useCallback(async () => {
    const selectedDeptId = checked;

    try {
      const url = selectedDeptId
        ? `http://localhost:3000/api/employees?departmentId=${selectedDeptId}`
        : `http://localhost:3000/api/employees`;
      const response = await fetch(url);
      const employees = await response.json();
      setFilterEmployeesData(employees);
      console.log(employees); // Log the employees fetched, not the state
    } catch (error) {
      console.error("Error fetching filtered employees:", error);
    }
  }, [checked]);

  useEffect(() => {
    fetchFilteredEmployees();
  }, [fetchFilteredEmployees, addEmployee]);

  const handleCheckboxChange = (checked, deptId) => {
    setChecked(checked ? deptId : null);
  };

  const handleAddData = () => {
    setAddDept(!addDept);
  };

  const handleEditUser = (id, index) => {
    setEditRow(id);
    form.setValue("id", id);
    form.setValue("dept_name", data[index].dept_name);
  };

  const handleDelete = id => {
    deleteEmp(`/departments/${id}`);
    const updateData = data.filter(data => data.id !== id);
    setData(updateData);
    toast.error("Deleted Successfully");
  };

  return (
    <div>
      <div className="m-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input type="text" placeholder="Search bar"></Input>
            <Button className="m-4" type="button" onClick={handleAddData}>
              Add Department
            </Button>
          </div>
          <h2 className="text-xl font-bold m-4">Departments Data</h2>
        </div>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmitDepartment)}>
            <div className="border">
              <hr className="mx-4" />
              <div className="h-60 overflow-auto">
                <Table>
                  <TableHeader className="border-b-blue-600 border-b-2">
                    <TableRow>
                      <TableHead>Check</TableHead>
                      <TableHead>Id</TableHead>
                      <TableHead>Department Name</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addDept && (
                      <DepartmentForm
                        addDept={addDept}
                        setAddDept={setAddDept}
                      />
                    )}

                    {data?.map((dept, index) => (
                      <TableRow key={dept.id}>
                        <TableCell>
                          <Checkbox
                            name="checked"
                            checked={checked === dept.id}
                            onCheckedChange={checked =>
                              handleCheckboxChange(checked, dept.id)
                            }
                          ></Checkbox>
                          {/* <FormField
                            control={form.control}
                            name="checked"
                            render={({field}) => (
                              <FormItem>
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          /> */}
                        </TableCell>
                        <TableCell>
                          {editRow === dept.id ? (
                            <FormField
                              control={form.control}
                              name="id"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      className="w-12"
                                      placeholder="ID"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            dept.id
                          )}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {editRow === dept.id ? (
                            <FormField
                              control={form.control}
                              name="dept_name"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Department Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            dept.dept_name
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            {dept.id === editRow ? (
                              <>
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
                                      onClick={() =>
                                        handleEditUser(dept.id, index)
                                      }
                                      className="hover:bg-blue-400 p-1 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                                    >
                                      <FiEdit className="text-base"></FiEdit>
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {/* <button
                              type="button"
                              onClick={() => handleDelete(dept.id)}
                              className="hover:bg-red-400 p-1 rounded-md transform hover:scale-125 transition-all ease-in duration-300"
                            >
                              <FiX className="text-base"></FiX>
                            </button> */}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button className="hover:bg-red-400 p-1 rounded-md transform hover:scale-125 transition-all ease-in duration-300">
                                  <FiX className="text-base"></FiX>
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(dept.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <EmployeesData
        addEmployee={addEmployee}
        setAddEmployee={setAddEmployee}
        loadDepartments={loadDepartments}
        filterEmployeesData={filterEmployeesData}
        setFilterEmployeesData={setFilterEmployeesData}
      />
      <Toaster />
    </div>
  );
};

export default MasterDetailsTwo;
