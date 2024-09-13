import {useDelete, useGet} from "@/components/hooks/useAPICall";
import MailTable from "@/components/mail/MailTable";
import {MailContext} from "@/context/MailContext";
import {useContext, useEffect, useState} from "react";

const draftHeaders = [
  {label: "To", className: "font-semibold w-[100px]"},
  {label: "Subject/Body", className: "font-semibold w-[500px]"},
  {label: "Date", className: "font-semibold w-[10px]"},
  {label: "Action", className: "font-semibold w-[10px]"},
];

const DraftPage = () => {
  // const {refetch} = useGet("/messages");
  const {drafts, handleAction} = useContext(MailContext);

  return (
    <MailTable
      title="Draft"
      headers={draftHeaders}
      data={drafts}
      onAction={handleAction}
    />
  );
};

export default DraftPage;
