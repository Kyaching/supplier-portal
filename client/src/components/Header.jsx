import {FaRegBell, FaTasks} from "react-icons/fa";
import {FiHome} from "react-icons/fi";
import {LuPower} from "react-icons/lu";
import {TfiEmail} from "react-icons/tfi";
import {Link, NavLink, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useAuth} from "@/context/AuthContext";

const Header = () => {
  const {unreadNotifications, handleLogout} = useAuth();

  return (
    <div className=" z-10 flex justify-between items-center h-16 w-full bg-white shadow-lg">
      <img className="w-20" src="/assets//logo.jpg" alt="" />
      <div className="flex justify-between items-center gap-3">
        <Link
          to="/"
          className="className= p-2 cursor-pointer mx-2 hover:bg-slate-300"
        >
          <FiHome className="h-6 w-6" />
        </Link>
        <a
          href="/home"
          className="className= p-2 cursor-pointer ml-2 hover:bg-slate-300"
        >
          <FaRegBell className="h-6 w-6" />
        </a>
        <a
          href="#"
          className="className= p-2 cursor-pointer ml-2 hover:bg-slate-300"
        >
          <FaTasks className="h-6 w-6" />
        </a>
        <NavLink
          to="/notification"
          className={({isActive}) =>
            `relative p-2 cursor-pointer ml-2 ${
              isActive ? "bg-slate-300 rounded-sm" : "hover:bg-slate-300"
            }`
          }
        >
          <div className=" flex gap-2 items-center">
            <TfiEmail className="h-6 w-6" />
            <span>Notification</span>

            {unreadNotifications.size > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-sm font-semibold">
                {unreadNotifications.size}
              </span>
            )}
          </div>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center flex-row gap-2 mx-2 h-[48px]  bg-red-600 hover:bg-red-300 p-2 rounded"
        >
          <LuPower className="size-6 md:size-8" />
          <p className="text-sm md:text-lg">Log Out</p>
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
};
export default Header;
