import {createContext, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import PropTypes from "prop-types";
import {useDelete, usePost} from "@/components/hooks/useAPICall";
import {useAuth} from "./AuthContext";
import toast from "react-hot-toast";
import {getCurrentDateTime} from "@/helpers/helpers";
import useConsolidatedMessages from "@/components/hooks/useConsolidatedMessages";

export const MailContext = createContext();

export const MailProvider = ({children}) => {
  const {user, message, setMessage, setUnreadNotifications} = useAuth();

  const {deleteEmp, data: status} = useDelete();
  const {post} = usePost();
  const {sentMessages, draftMessages, inboxMessages, refetchAll, refetchSent} =
    useConsolidatedMessages(user);
  const [drafts, setDrafts] = useState([]);
  const [sentMails, setSentMails] = useState([]);
  const [inboxMails, setInboxMails] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (draftMessages) {
      setDrafts(draftMessages.filter(message => message.status === "draft"));
    }
  }, [draftMessages]);
  useEffect(() => {
    if (sentMessages) {
      setSentMails(sentMessages.filter(message => message.status === "sent"));
    }
  }, [sentMessages]);

  useEffect(() => {
    if (inboxMessages) {
      const filteredMessage = inboxMessages.filter(message =>
        message.receivers.includes(user)
      );
      console.log(filteredMessage);

      // Check if message is not an empty array
      if (Object.keys(message).length > 0) {
        const updatedInbox = [...message, ...filteredMessage];
        setInboxMails(updatedInbox);
      } else {
        setInboxMails(filteredMessage);
      }
    }
  }, [inboxMessages, user, message]);

  const handleMail = async (data, status) => {
    try {
      const newMail = {
        ...data,
        id: uuidv4(),
        sender: user,
        to: selectedUsers,
        date: getCurrentDateTime(),
        status,
      };

      const response = await post("/messages", newMail);

      if (response) {
        if (status === "draft") {
          toast.success("Message Saved as Draft");
          refetchAll();
        } else if (status === "sent") {
          refetchSent();
          toast.success("Message Sent Successfully");
        }
        // refetchAll(); // Refresh all messages
      } else {
        toast.error("Failed to save the message");
      }
    } catch (error) {
      toast.error("An error occurred while saving the message");
      console.error("Error saving message:", error);
    }
  };

  const handleAction = async id => {
    try {
      const result = await deleteEmp(`/messages/${id}`);

      if (result === "success") {
        toast.success("Deleted Successfully");
        setInboxMails(inboxMails.filter(message => message.id !== id));
        setSentMails(sentMails.filter(message => message.id !== id));
        setDrafts(drafts.filter(message => message.id !== id));
        if (message.length > 0) {
          setMessage(message.filter(msg => msg.id !== id));
          console.log("from auth", message);
        }
        setUnreadNotifications(prev => {
          const updated = new Set(prev);
          updated.delete(id);
          return updated;
        });
        // await refetchAll();
      } else if (result === "failed") {
        toast.error(`Error: Message Does not Exist`);
      }
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  return (
    <MailContext.Provider
      value={{
        handleDraft: data => handleMail(data, "draft"),
        handleSend: data => handleMail(data, "sent"),
        drafts,
        sentMails,
        inboxMails,
        selectedUsers,
        setSelectedUsers,
        handleAction,
      }}
    >
      {children}
    </MailContext.Provider>
  );
};
MailProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
