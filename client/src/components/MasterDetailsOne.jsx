import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {useState} from "react";
import {Checkbox} from "./ui/checkbox";
import {FiSave, FiX} from "react-icons/fi";

const depts = [
  {
    id: "01",
    name: "Allu Khan",
    action: "",
  },
];

const MasterDetailsOne = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [addDept, setAddDept] = useState(false);
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
  const handleViewDetails = () => {
    setShowDetails(!showDetails);
    console.log(showDetails);
  };
  const handleAddData = () => {
    setAddDept(!addDept);
    console.log(showDetails);
  };

  return (
    <div>
      <div className="bg-gray-300 m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex  bg-red-300">
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
              <FormField
                control={form.control}
                name="department"
                render={({field}) => (
                  <FormItem className="flex items-center m-4">
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={value => field.onChange(value)}
                        value={field.value}
                      >
                        <SelectTrigger className="w-96">
                          <SelectValue placeholder="Select departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hrm">
                            Human Resource Management
                          </SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="sales">Sales</SelectItem>
                          <SelectItem value="production">Production</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="m-4" type="submit" onClick={handleViewDetails}>
                View Department
              </Button>
              {showDetails ? (
                <Button className="m-4" type="submit" onClick={handleAddData}>
                  Add Department
                </Button>
              ) : (
                ""
              )}
            </div>
          </form>
        </Form>
      </div>
      {showDetails ? (
        <div className="m-6 border rounded">
          <hr className="mx-4" />
          <Table>
            <TableHeader>
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
                        <Input type="text" placeholder="Department"></Input>
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
      ) : (
        ""
      )}
      <div className="bg-gray-300 m-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-center bg-red-300">
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
              <Button className="m-4" type="submit">
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="m-6 border rounded">
        <hr className="mx-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Check</TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Employee Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {depts.map(dept => (
              <TableRow key={dept.id}>
                <TableCell>
                  <Checkbox></Checkbox>
                </TableCell>
                <TableCell>
                  <Input className="w-12" type="text" placeholder="ID"></Input>
                </TableCell>
                <TableCell>
                  <Input type="text" placeholder="Department"></Input>
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
            ))} */}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MasterDetailsOne;
