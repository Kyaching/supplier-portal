import {useState, useEffect} from "react";
import {useGet} from "@/components/hooks/useAPICall";

const useConsolidatedMessages = user => {
  const [sentMessages, setSentMessages] = useState([]);
  const [draftMessages, setDraftMessages] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);

  const {data: sentData, refetch: refetchSent} = useGet(
    `/messages/sent/${user}`
  );
  const {data: draftData, refetch: refetchDraft} = useGet(
    `/messages/draft/${user}`
  );
  const {data: inboxData, refetch: refetchInbox} = useGet(
    `/messages/inbox/${user}`
  );

  useEffect(() => {
    if (sentData) setSentMessages(sentData);
    if (draftData) setDraftMessages(draftData);
    if (inboxData) setInboxMessages(inboxData);
  }, [sentData, draftData, inboxData]);

  const refetchAll = async () => {
    await Promise.all([refetchSent(), refetchDraft(), refetchInbox()]);
  };

  return {sentMessages, draftMessages, inboxMessages, refetchAll};
};

export default useConsolidatedMessages;
