import MailTable from "@/components/mail/MailTable";
import {MailContext} from "@/context/MailContext";
import {useContext} from "react";

const inboxHeaders = [
  {label: "From", className: "font-semibold w-[100px]"},
  {label: "Subject/Body", className: "font-semibold -[500px]"},
  {label: "Date", className: "font-semibold w-[10px]"},
  {label: "Action", className: "font-semibold w-[10px]"},
];

const InboxPage = () => {
  const {inboxMails, handleAction} = useContext(MailContext);

  return (
    <MailTable
      title="Inbox"
      headers={inboxHeaders}
      data={inboxMails}
      onAction={handleAction}
    />
  );
};

export default InboxPage;
