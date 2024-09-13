import {useDelete, useGet} from "@/components/hooks/useAPICall";
import MailTable from "@/components/mail/MailTable";
import {MailContext} from "@/context/MailContext";
import {useContext, useEffect, useState} from "react";

const sentHeaders = [
  {label: "To", className: "font-semibold w-[100px]"},
  {label: "Subject/Body", className: "font-semibold w-[500px]"},
  {label: "Date", className: "font-semibold w-[10px]"},
  {label: "Action", className: "font-semibold w-[10px]"},
];

const SentPage = () => {
  const {sentMails, handleAction} = useContext(MailContext);
  // const {sentMails} = useContext(MailContext);

  return (
    <MailTable
      title="Sent"
      headers={sentHeaders}
      data={sentMails}
      onAction={handleAction}
    />
  );
};

export default SentPage;
