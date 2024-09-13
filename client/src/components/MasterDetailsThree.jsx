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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const depts = [
  {
    id: "01",
    name: "Allu Khan",
    action: "",
  },
];

import {useState} from "react";
import {Checkbox} from "./ui/checkbox";
import {FiSave, FiX} from "react-icons/fi";

const MasterDetailsThree = () => {
  const [addDept, setAddDept] = useState(false);
  const [addEmployee, setAddEmployee] = useState(false);
  const form = useForm({
    defaultValues: {
      employeeName: "",
      firstName: "",
      lastName: "",
      jobTitle: "",
      email: "",
      department: "",
    },
  });

  const onSubmit = data => {
    console.log("Form submitted with values:", data);
  };
  const handleAddData = () => {
    setAddDept(!addDept);
  };
  const handleEmployeeData = () => {
    setAddEmployee(!addEmployee);
  };
  return (
    <div>
      <div className="m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="border">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="dept_id"
                    render={({field}) => (
                      <FormItem className="m-4">
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Search by name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="m-4" type="submit" onClick={handleAddData}>
                    Add Department
                  </Button>
                </div>
                <h2 className="text-xl font-bold m-4">Departments Data</h2>
              </div>
              <hr className="mx-4" />
              <div className="h-60">
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
                    {addDept
                      ? depts.map(dept => (
                          <TableRow key={dept.id}>
                            <TableCell>
                              <Checkbox></Checkbox>
                            </TableCell>
                            <TableCell>
                              <Input
                                className="w-12"
                                type="text"
                                placeholder="ID"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                placeholder="Department"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-3">
                                <Button className="p-2">
                                  <FiSave className="text-xl"></FiSave>
                                </Button>
                                <Button className="p-2">
                                  <FiX className="text-xl"></FiX>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : ""}
                  </TableBody>
                </Table>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="border">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="dept_id"
                    render={({field}) => (
                      <FormItem className="m-4">
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Search by name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="m-4"
                    type="submit"
                    onClick={handleEmployeeData}
                  >
                    Add Employee
                  </Button>
                </div>
                <h2 className="text-xl font-bold m-4">Employees Data</h2>
              </div>
              <hr className="mx-4" />
              <div className="h-60">
                <Table>
                  <TableHeader className="border-b-blue-600 border-b-2">
                    <TableRow>
                      <TableHead>Check</TableHead>
                      <TableHead>Id</TableHead>
                      <TableHead>Employee Name</TableHead>
                      <TableHead>Job Title</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Dp</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {addEmployee
                      ? depts.map(dept => (
                          <TableRow key={dept.id}>
                            <TableCell>
                              <Checkbox checked={true}></Checkbox>
                            </TableCell>
                            <TableCell>
                              <Input
                                className="w-12"
                                type="text"
                                placeholder="ID"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                placeholder="Employee Name"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                placeholder="Job Title"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                placeholder="First name"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <Input
                                type="text"
                                placeholder="Last name"
                              ></Input>
                            </TableCell>
                            <TableCell>
                              <Input type="email" placeholder="email"></Input>
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="department"
                                render={({field}) => (
                                  <FormItem className="flex items-center m-4">
                                    <FormControl>
                                      <Select
                                        {...field}
                                        onValueChange={value =>
                                          field.onChange(value)
                                        }
                                        value={field.value}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select departments" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="hrm">
                                            Human Resource Management
                                          </SelectItem>
                                          <SelectItem value="finance">
                                            Finance
                                          </SelectItem>
                                          <SelectItem value="marketing">
                                            Marketing
                                          </SelectItem>
                                          <SelectItem value="sales">
                                            Sales
                                          </SelectItem>
                                          <SelectItem value="production">
                                            Production
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-3">
                                <Button className="p-2">
                                  <FiSave className="text-xl"></FiSave>
                                </Button>
                                <Button className="p-2">
                                  <FiX className="text-xl"></FiX>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : ""}
                  </TableBody>
                </Table>
              </div>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center m-3">
        <Button className="mr-2">Prev</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default MasterDetailsThree;
