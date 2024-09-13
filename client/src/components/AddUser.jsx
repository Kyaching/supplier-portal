import {useForm} from "react-hook-form";
import {Button} from "./ui/button";
import toast, {Toaster} from "react-hot-toast";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const {
      user_name,
      first_name,
      middle_name,
      last_name,
      job_title,
      job_id,
      email,
      password,
      conf_password,
      user_type,
      user_type_id,
      tenant_id,
    } = data;

    const userData = {
      user_name,
      first_name,
      middle_name,
      last_name,
      job_title,
      job_id: parseInt(job_id),
      email,
      password,
      conf_password,
      user_type,
      user_type_id: parseInt(user_type_id),
      tenant_id,
    };
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        toast.success("Successfully Data submitted");
        reset();
      });
  };

  return (
    <div className="bg-gray-400 flex flex-col w-[400px] mx-auto my-12 rounded-md">
      <h2 className="text-2xl mx-auto pt-4 font-bold">Add User</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <label>Username</label>
            <input
              className="m-3 p-2"
              {...register("user_name", {required: true})}
              placeholder="Username"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>First name</label>
            <input
              className="m-3 p-2"
              {...register("first_name", {required: true})}
              placeholder="First name"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Middle name</label>
            <input
              className="m-3 p-2"
              {...register("middle_name")}
              placeholder="Middle name"
            />
          </div>

          <div className="flex gap-3 items-center justify-between">
            <label>Last name</label>
            <input
              className="m-3 p-2 "
              {...register("last_name", {required: true})}
              placeholder="Last name"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Job Title</label>
            <input
              className="m-3 p-2 "
              {...register("job_title", {required: true})}
              placeholder="Job Title"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Job Title Id</label>
            <input
              type="number"
              className="m-3 p-2 "
              {...register("job_id", {required: true})}
              placeholder="Job Title Id"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Email</label>
            <input
              type="email"
              className="m-3 p-2 "
              {...register("email", {required: true})}
              placeholder="email"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Password</label>
            <input
              type="password"
              className="m-3 p-2 "
              {...register("password", {required: true})}
              placeholder="Password"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Confirm Password</label>
            <input
              type="password"
              className="m-3 p-2 "
              {...register("conf_password", {required: true})}
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>User Type</label>
            <input
              className="m-3 p-2 "
              {...register("user_type", {required: true})}
              placeholder="User Type"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>User Type</label>
            <input
              type="number"
              className="m-3 p-2 "
              {...register("user_type_id", {required: true})}
              placeholder="User Type Id"
            />
          </div>
          <div className="flex gap-3 items-center justify-between">
            <label>Tenant Id</label>
            <input
              type="number"
              className="m-3 p-2 "
              {...register("tenant_id", {required: true})}
              placeholder="Tenant Id"
            />
          </div>
          <Button className="mx auto" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddUser;
