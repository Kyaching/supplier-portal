import PropTypes from "prop-types";
import {AiOutlineDelete} from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {FiMaximize} from "react-icons/fi";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {useSortable} from "@dnd-kit/sortable";
import toast from "react-hot-toast";
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
} from "../ui/alert-dialog";
import {useDelete} from "../hooks/useAPICall";

const UserItems = ({
  user,
  index,
  onChange,
  userData,
  setUserData,
  setNewUserId,
  handleMaximize,
  maximize,
  setIsEditing,
  setOriginalData,
}) => {
  const [jobTitles, setJobTitles] = useState(null);
  const [userTypes, setUserTypes] = useState(null);
  const {deleteEmp: deleteUser} = useDelete();
  const form = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      user_name: user?.user_name || "",
      job_id: user?.jobTitle?.id,
      user_type_id: user?.userType?.id || "",
      tenant_id: "1",
    },
  });

  useEffect(() => {
    const jobTitle = async () => {
      const response = await fetch("http://localhost:3000/api/jobTitle");
      const result = await response.json();
      setJobTitles(result);
    };
    jobTitle();
  }, []);

  useEffect(() => {
    const userType = async () => {
      const response = await fetch("http://localhost:3000/api/userTypes");
      const result = await response.json();
      setUserTypes(result);
    };
    userType();
  }, []);

  const handleToggleMaximize = () => {
    handleMaximize(user.id);
  };
  const {attributes, listeners, setNodeRef, transform, isDragging, transition} =
    useSortable({id: user.id});

  const style = {
    transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px,0)`,
    transition,
    opacity: isDragging && "0.6",
  };

  useEffect(() => {
    const subscription = form.watch(data => onChange(index, data));

    return () => subscription.unsubscribe();
  }, [form, index, onChange]);

  const handleDeleteUser = async id => {
    const isTimeStamp = id > 1e10;
    if (isTimeStamp) {
      const updatedUser = userData.filter(user => user.id !== id);
      setUserData(updatedUser);
      setNewUserId(null);
    } else {
      await deleteUser(`/users/${id}`);
      toast.error("Deleted Successfully");
      setIsEditing(false);
      const updatedUser = userData.filter(user => user.id !== id);
      setUserData(updatedUser);
      setOriginalData(updatedUser);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="my-2 cursor-grab shadow-md shadow-green-400 border rounded-lg"
    >
      <div
        className="flex items-center justify-between bg-sky-500 px-1
       text-white border rounded-t-lg"
      >
        <p>{index}</p>
        <div className="flex gap-1">
          <button onClick={handleToggleMaximize}>
            <FiMaximize className="cursor-pointer" />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button>
                <AiOutlineDelete className="text-base"></AiOutlineDelete>
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Form {...form}>
        <form className="grid grid-cols-4 gap-2 bg-gray-200 p-1 border rounded-b-lg">
          <FormField
            control={form.control}
            name="first_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className="h-6" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="h-6" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="h-6" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {maximize && (
            <>
              <FormField
                control={form.control}
                name="user_name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input className="h-6" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="job_id"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-6">
                          <SelectValue>
                            {
                              jobTitles?.find(
                                job => job.id === parseInt(field.value)
                              )?.title
                            }
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTitles?.map(job => (
                          <SelectItem key={job?.id} value={job?.id}>
                            {job?.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_type_id"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>User Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-6">
                          <SelectValue>
                            {
                              userTypes?.find(
                                tp => tp.id === parseInt(field.value)
                              )?.type
                            }
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {userTypes?.map(tp => (
                          <SelectItem key={tp?.id} value={tp?.id}>
                            {tp?.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tenant_id"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tenant Id</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-6">
                          <SelectValue defaultValue={"1"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserItems;
UserItems.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  isNew: PropTypes.bool.isRequired,
  userData: PropTypes.array.isRequired,
  setUserData: PropTypes.func.isRequired,
  handleMaximize: PropTypes.func.isRequired,
  setNewUserId: PropTypes.func.isRequired,
  maximize: PropTypes.object.isRequired,
};
