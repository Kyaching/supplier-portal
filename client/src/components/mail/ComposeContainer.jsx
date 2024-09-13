import {FiInbox, FiPaperclip, FiSend} from "react-icons/fi";
import Option from "../ui/Option";
import {Button} from "../ui/button";
import {LuMailPlus} from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {Label} from "../ui/label";
import {Input} from "../ui/input";
import UserSelect from "./UserSelect";
import {Textarea} from "../ui/textarea";
import {useForm} from "react-hook-form";
import {MailContext} from "@/context/MailContext";
import {useContext} from "react";

const ComposeContainer = () => {
  const {
    handleDraft,
    drafts,
    handleSend,
    sentMails,
    inboxMails,
    selectedUsers,
  } = useContext(MailContext);
  const {register, handleSubmit, watch} = useForm();
  const watchSubject = watch("subject");
  const watchBody = watch("body");
  const optionData = [
    {
      id: 1,
      icon: <FiInbox className="w-6 h-6" />,
      name: "Inbox",
      count: inboxMails?.length,
      to: "inbox",
    },
    {
      id: 2,
      icon: <FiSend className="w-6 h-6" />,
      name: "Sent",
      count: sentMails?.length,
      to: "sent",
    },
    {
      id: 3,
      icon: <FiPaperclip className="w-6 h-6" />,
      name: "Draft",
      count: drafts?.length,
      to: "draft",
    },
  ];

  const onSubmit = () => {};

  return (
    <div className="relative">
      <>
        {optionData.map(option => (
          <Option
            key={option.id}
            icon={option?.icon}
            name={option?.name}
            count={option?.count}
            to={option?.to}
          />
        ))}
      </>

      <Dialog>
        <DialogTrigger>
          <Button className="absolute mt-80">
            <LuMailPlus className="w-6 h-6 mr-2" />
            Compose
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle className="my-3">New Message</DialogTitle>
            <UserSelect />
            <DialogDescription />
            <div>
              <Label className="font-semibold text-md">Subject</Label>
              <Input className="mt-2" {...register("subject")} />
            </div>

            <div>
              <Label htmlFor="username" className="font-semibold text-md">
                Body
              </Label>
              <Textarea
                className="my-2"
                placeholder="Type your message here."
                {...register("body")}
              />
            </div>

            <DialogFooter>
              {watchSubject && watchBody && selectedUsers.length > 0 && (
                <>
                  <Button
                    type="submit"
                    onClick={() =>
                      handleDraft({subject: watchSubject, body: watchBody})
                    }
                    className="flex items-center gap-2 font-semibold text-md rounded-none rounded-l-full"
                  >
                    <FiPaperclip />
                    <span>Draft</span>
                  </Button>
                  <Button
                    onClick={() =>
                      handleSend({subject: watchSubject, body: watchBody})
                    }
                    className="flex items-center gap-2 font-semibold text-md rounded-none rounded-r-full"
                  >
                    <FiSend />
                    <span>Sent</span>
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComposeContainer;
