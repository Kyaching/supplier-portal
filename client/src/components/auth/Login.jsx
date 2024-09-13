import {useForm} from "react-hook-form";
import PropTypes from "prop-types";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
const Login = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      user_name: "",
      password: "",
    },
  });

  const onSubmit = async data => {
    const {user_name, password} = data;

    try {
      const isMatch = await login(user_name, password);
      console.log("isMatch", isMatch);
      if (isMatch) {
        navigate("/");
      } else {
        // Handle failed authentication case (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle errors (e.g., show an error message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" rounded-md text-center w-4/12 p-4 shadow-2xl shadow-green-300">
        <h2 className="text-2xl font-semibold">Log In </h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="user_name"
              render={({field}) => (
                <FormItem className="flex items-center gap-6">
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="User name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem className="flex items-center gap-6">
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Log In</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
Login.propTypes = {
  setIsAuth: PropTypes.func,
};
export default Login;
