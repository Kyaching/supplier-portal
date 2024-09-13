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
import {usePost} from "./hooks/useAPICall";
import toast, {Toaster} from "react-hot-toast";

const AddDepartment = () => {
  const {post} = usePost();
  const form = useForm({
    defaultValues: {
      dept_id: "",
      dept_name: "",
    },
  });

  const onSubmit = async data => {
    const {dept_id, dept_name} = data;
    const id = parseInt(dept_id);
    const newData = {id, dept_name};
    console.log(newData);
    await post("/departments", newData);
    toast.success("Data  Added Successfully");
    form.reset();
  };
  return (
    <div className="bg-gray-300 flex flex-col w-[400px] mx-auto mt-12 rounded-md">
      <h2 className="text-2xl mx-auto pt-4 font-bold">Add Departments</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="dept_id"
            render={({field}) => (
              <FormItem className="flex items-center justify-between m-4">
                <FormLabel>Department Id</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="w-3/5"
                    placeholder="Department Id"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dept_name"
            render={({field}) => (
              <FormItem className="flex items-center justify-between m-4">
                <FormLabel>Department Name</FormLabel>
                <FormControl>
                  <Input
                    className="w-3/5"
                    placeholder="Dept. Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="m-4" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <Toaster />
    </div>
  );
};

export default AddDepartment;
