import {usePost} from "@/components/hooks/useAPICall";
import PropTypes from "prop-types";
import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import io from "socket.io-client";

const AuthContext = createContext();

const socket = io("http://localhost:3000");

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState([]);
  const [viewedMessageIds, setViewedMessageIds] = useState(new Set());
  const [unreadNotifications, setUnreadNotifications] = useState(new Set());
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const {post} = usePost();

  useEffect(() => {
    if (isAuth && user) {
      socket.emit("register", user);
    }

    const handleReceiveMessage = receivedMessage => {
      // Check if the message is for the current user
      setMessage(prev => [...prev, receivedMessage]);
      setUnreadNotifications(prev => new Set(prev.add(receivedMessage.id)));
    };
    const handleOfflineMessage = receivedMessage => {
      // Check if the message is for the current user
      setUnreadNotifications(prev => new Set(prev.add(receivedMessage.id)));
      console.log("Offline message", receivedMessage);
    };

    socket.on("receive-message", handleReceiveMessage);
    socket.on("offline-message", handleOfflineMessage);

    return () => {
      socket.off("receive-message", handleReceiveMessage);
      socket.off("offline-message", handleOfflineMessage);
    };
  }, [user, message, isAuth]);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  const markMessageAsViewed = id => {
    setUnreadNotifications(prev => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
    setViewedMessageIds(prev => new Set(prev.add(id)));
  };

  const login = async (user_name, password) => {
    try {
      const response = await post("/login", {user_name, password});
      if (response?.success) {
        localStorage.setItem("username", user_name);
        setIsAuth(true);
        setUser(user_name);
        socket.emit("register", user);

        return true;
      } else {
        localStorage.removeItem("username");
        setIsAuth(false);
        setUser(null);
        return false;
      }
    } catch (err) {
      console.error("Error During Api request", err);
      localStorage.removeItem("username");
      setIsAuth(false);
      setUser(null);
      return false;
    }
  };

  const handleLogout = async () => {
    const res = await post("/logout", {});
    console.log(res);
    if (res?.success) {
      localStorage.removeItem("username");
      setIsAuth(false);
      socket.disconnect();
    }
  };

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile", {
        withCredentials: true,
      });
      const data = response.data;
      if (data) {
        setIsAuth(true);
        setUser(data?.username);
      }
    } catch (err) {
      console.error("Error during authentication check:", err);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, [isAuth]);

  const isAuthenticated = useCallback(() => isAuth, [isAuth]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        handleLogout,
        user,
        socket,
        message,
        viewedMessageIds,
        unreadNotifications,
        setUnreadNotifications,
        markMessageAsViewed,
        setMessage,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
