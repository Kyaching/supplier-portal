import QRCode from "react-qr-code";
import {Button} from "./ui/button";

const Profile = () => {
  const userInfo = {
    name: "Mr. Y",
    email: "mr@gmail.com",
    site: "https://www.youtube.com/",
    user: "bob",
    job: "HR",
  };
  const qrCodeValue = `${userInfo.site}`;
  return (
    <div className="flex gap-3">
      <div className="text-base border m-8 p-3 w-52">
        <p>
          Name: <span className="font-semibold">{userInfo.name}</span>{" "}
        </p>
        <p>Email: {userInfo.email}</p>
        <p>
          UserName: <span className="font-semibold">{userInfo.user}</span>
        </p>
        <p>
          JobTitle: <span className="font-semibold">{userInfo.job}</span>
        </p>
        <Button className="my-3">Update Profile</Button>
      </div>
      <div className="text-base border m-8 p-3">
        <p>Site QR Code</p>
        <QRCode value={qrCodeValue} size={100}></QRCode>
      </div>
    </div>
  );
};

export default Profile;
