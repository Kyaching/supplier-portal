import {Outlet} from "react-router-dom";
import ComposeContainer from "./ComposeContainer";
import {MailProvider} from "@/context/MailContext";
import {Toaster} from "react-hot-toast";

const MailContainer = () => {
  return (
    <MailProvider>
      <div className="m-4 flex gap-2">
        <div className="basis-1/6  max-h-36 border rounded-sm">
          <ComposeContainer />
        </div>
        <div className=" flex-grow">
          <Outlet />
        </div>
      </div>
      <Toaster />
    </MailProvider>
  );
};

export default MailContainer;
