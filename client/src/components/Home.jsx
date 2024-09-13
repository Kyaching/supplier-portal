import {useEffect} from "react";
import Header from "./Header";
import SideMenuBar from "./SideMenuBar";
import Login from "./auth/Login";
import {Navigate, useLocation} from "react-router-dom";
import {useAuth} from "@/context/AuthContext";
import BeatLoader from "react-spinners/BeatLoader";

const Home = () => {
  const {isAuthenticated, socket, loading} = useAuth();

  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated()) {
      socket.connect();
      <Navigate to="/" state={{from: location}} replace />; // Redirect to home path if authenticated
    }
  }, [isAuthenticated, location, socket]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <BeatLoader color="green" />
      </div>
    );
  }

  return (
    <>
      {isAuthenticated() ? (
        <>
          <Header />
          <SideMenuBar />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
