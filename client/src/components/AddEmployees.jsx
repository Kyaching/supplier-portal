import {Button} from "@/components/ui/button";
import {useState} from "react";
import {usePost} from "./hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";

// Arrow function for the AddEmployees component
const AddEmployees = () => {
  const [employees, setEmployees] = useState({
    emp_name: "",
    email: "",
    first_name: "",
    last_name: "",
    job_title: "",
    dept: "",
  });
  const {post} = usePost();

  const handleInput = e => {
    const {name, value} = e.target;
    setEmployees(pre => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    post("/employees", employees)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    toast.success("Successfully Data Added");
    setEmployees({
      emp_name: "",
      email: "",
      first_name: "",
      last_name: "",
      job_title: "",
      dept: "",
    });
  };
  return (
    <div className="bg-gray-300 flex flex-col w-[400px] mx-auto mt-12 rounded-md">
      <h2 className="text-2xl mx-auto pt-4 font-bold">Add Employee</h2>
      <form method="post" onSubmit={handleSubmit}>
        <div className="flex justify-between m-4">
          <label htmlFor="emp_name">Employee Name</label>
          <input
            className="h-8 text-center"
            type="text"
            name="emp_name"
            value={employees.emp_name}
            onChange={handleInput}
            placeholder="Employee Name"
          />
        </div>
        <div className="flex justify-between m-4">
          <label htmlFor="first_name">First Name</label>
          <input
            className="h-8 text-center"
            type="text"
            name="first_name"
            value={employees.first_name}
            onChange={handleInput}
            placeholder="First Name"
          />
        </div>
        <div className="flex justify-between m-4">
          <label htmlFor="last_name">Last Name</label>
          <input
            className="h-8 text-center"
            type="text"
            name="last_name"
            value={employees.last_name}
            onChange={handleInput}
            placeholder="Last Name"
          />
        </div>
        <div className="flex justify-between m-4">
          <label htmlFor="job_title">Job Title</label>
          <input
            className="h-8 text-center"
            type="text"
            name="job_title"
            value={employees.job_title}
            onChange={handleInput}
            placeholder="Job Title"
          />
        </div>
        <div className="flex justify-between m-4">
          <label htmlFor="email">Email</label>
          <input
            className="h-8 text-center"
            type="email"
            name="email"
            value={employees.email}
            onChange={handleInput}
            placeholder="email"
          />
        </div>
        <div className="flex justify-between m-4">
          <label htmlFor="dept">Department</label>
          <select
            className="h-8 text-center w-48"
            name="dept"
            value={employees.dept}
            onChange={handleInput}
          >
            <option value="hrm">Human Resource Management</option>
            <option value="finance">Finance</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="production">Production</option>
            <option value="computers and Information Technology">
              Computers and Information Technology
            </option>
          </select>
        </div>
        <Button className="m-4" type="submit">
          Submit
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddEmployees;
