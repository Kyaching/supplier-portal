import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import PropTypes from "prop-types";
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
import {useEffect, useRef, useState} from "react";
import {FiEdit, FiSave, FiX} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {useDelete, useUpdate} from "./hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";
import EmployeeForm from "./inputform/EmployeeForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const EmployeesData = ({
  loadDepartments,
  addEmployee,
  setAddEmployee,
  filterEmployeesData,
  setFilterEmployeesData,
}) => {
  // const {data, getData, setData} = useGet();
  const {update} = useUpdate();
  const {deleteEmp} = useDelete();
  const [editRow, setEditRow] = useState(null);
  const formRef = useRef(null);
  const selectRef = useRef(null);

  const form = useForm({
    defaultValues: {
      id: "",
      emp_name: "",
      email: "",
      first_name: "",
      last_name: "",
      job_title: "",
      departmentId: "",
    },
  });
  // useEffect(() => {
  //   getData("/employees");
  // }, [getData, addEmployee]);
  // console.log(filterEmployeesData);
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target) &&
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setEditRow(null);
        form.reset();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [form]);

  const onSubmitEmployee = async formData => {
    const {
      id,
      emp_name,
      email,
      first_name,
      last_name,
      job_title,
      departmentId,
    } = formData;

    const parseId = parseInt(id);

    try {
      await update(`/employees/${editRow}`, {
        id: parseId,
        emp_name,
        email,
        first_name,
        last_name,
        job_title,
        departmentId,
      });

      // Update local state with new employee data
      const updatedData = filterEmployeesData.map(emp =>
        emp.id === editRow
          ? {
              ...emp,
              ...formData,
              department: loadDepartments.find(
                dept => dept.id === parseInt(formData.departmentId)
              ),
            }
          : emp
      );
      setFilterEmployeesData(updatedData);

      setEditRow(null);
      toast.success("Updated Successfully");

      form.reset();
    } catch (error) {
      toast.error("Failed to update department");
    }

    console.log(formData);
  };

  const handleAddData = () => {
    setAddEmployee(!addEmployee);
  };

  const handleEditUser = (id, index) => {
    setEditRow(id);
    form.setValue("id", id);
    form.setValue("emp_name", filterEmployeesData[index].emp_name);
    form.setValue("email", filterEmployeesData[index].email);
    form.setValue("first_name", filterEmployeesData[index].first_name);
    form.setValue("last_name", filterEmployeesData[index].last_name);
    form.setValue("job_title", filterEmployeesData[index].job_title);
    form.setValue("departmentId", filterEmployeesData[index].department.id);
  };

  const handleDelete = id => {
    deleteEmp(`/employees/${id}`);
    const updateData = filterEmployeesData.filter(data => data.id !== id);
    setFilterEmployeesData(updateData);
    toast.error("Deleted Successfully");
  };

  return (
    <div>
      <div className="m-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input type="text" placeholder="Search bar"></Input>
            <Button className="m-4" type="button" onClick={handleAddData}>
              Add Employee
            </Button>
          </div>
          <h2 className="text-xl font-bold m-4">Employees Data</h2>
        </div>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmitEmployee)}>
            <div className="border">
              <hr className="mx-4" />
              <div className="h-60 overflow-auto">
                <Table>
                  <TableHeader className="border-b-blue-600 border-b-2">
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>DP</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addEmployee && (
                      <EmployeeForm
                        loadDepartments={loadDepartments}
                        addEmployee={addEmployee}
                        setAddEmployee={setAddEmployee}
                      />
                    )}

                    {filterEmployeesData?.map((emp, index) => (
                      <TableRow key={emp.id}>
                        <TableCell>
                          {editRow === emp.id ? (
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
                            emp.id
                          )}
                        </TableCell>
                        <TableCell>
                          {editRow === emp.id ? (
                            <FormField
                              control={form.control}
                              name="emp_name"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="Employee Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            emp.emp_name
                          )}
                        </TableCell>
                        <TableCell>
                          {editRow === emp.id ? (
                            <FormField
                              control={form.control}
                              name="job_title"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Job Title" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            emp.job_title
                          )}
                        </TableCell>
                        <TableCell>
                          {editRow === emp.id ? (
                            <FormField
                              control={form.control}
                              name="first_name"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      placeholder="First Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            emp.first_name
                          )}
                        </TableCell>
                        <TableCell>
                          {editRow === emp.id ? (
                            <FormField
                              control={form.control}
                              name="last_name"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Last Name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            emp.last_name
                          )}
                        </TableCell>
                        <TableCell>
                          {editRow === emp.id ? (
                            <FormField
                              control={form.control}
                              name="email"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Input placeholder="Email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : (
                            emp.email
                          )}
                        </TableCell>
                        <TableCell>
                          {editRow === emp.id ? (
                            <FormField
                              control={form.control}
                              name="departmentId"
                              render={({field}) => (
                                <FormItem>
                                  <FormControl>
                                    <Select
                                      ref={selectRef}
                                      onValueChange={field.onChange}
                                      defaultValue={field.value.toString()}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select Department" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {loadDepartments?.map(dept => (
                                          <SelectItem
                                            key={dept.id}
                                            value={dept.id.toString()}
                                          >
                                            {dept.dept_name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ) : (
                            emp.department.dept_name
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            {emp.id === editRow ? (
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
                                        handleEditUser(emp.id, index)
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
                              onClick={() => handleDelete(emp.id)}
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
                                    onClick={() => handleDelete(emp.id)}
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
      <Toaster />
    </div>
  );
};

EmployeesData.propTypes = {
  loadDepartments: PropTypes.array.isRequired,
  addEmployee: PropTypes.bool.isRequired,
  setAddEmployee: PropTypes.func.isRequired,
  setFilterEmployeesData: PropTypes.func.isRequired,
  filterEmployeesData: PropTypes.array.isRequired,
  // selectRef: PropTypes.func.isRequired,
};

export default EmployeesData;
