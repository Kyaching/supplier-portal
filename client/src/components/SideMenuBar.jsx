import {useAuth} from "@/context/AuthContext";
import React, {useState} from "react";
import {
  FaRegFileAlt,
  FaRegListAlt,
  FaRegUser,
  FaUser,
  FaUserPlus,
} from "react-icons/fa";
import {FaXmark} from "react-icons/fa6";
import {FiFeather, FiUserPlus} from "react-icons/fi";
import {FiUsers} from "react-icons/fi";
import {GiHamburgerMenu} from "react-icons/gi";
import {IoPaperPlaneOutline} from "react-icons/io5";
import {MdOutlineWidgets} from "react-icons/md";
import {RiDragDropFill} from "react-icons/ri";
import {Sidebar, Menu, MenuItem, SubMenu} from "react-pro-sidebar";
import {Link, Outlet} from "react-router-dom";

const SideMenuBar = () => {
  const {user} = useAuth();
  const [collapsed, setCollapsed] = React.useState(false);
  const [active, setActive] = useState(false);

  function handleChangeActive() {
    setActive(!active);
    setCollapsed(!collapsed);
  }

  return (
    <div className="flex">
      <div className="max-h-[600px] overflow-y-auto overflow-x-hidden ">
        <Sidebar collapsed={collapsed} transitionDuration={1000}>
          <Menu>
            <div className="p-4">
              {active ? (
                <GiHamburgerMenu
                  className="active mx-auto cursor-pointer hover:transition-all hover:-rotate-180"
                  onClick={handleChangeActive}
                >
                  Collapse
                </GiHamburgerMenu>
              ) : (
                <FaXmark
                  className="inactive mx-auto cursor-pointer hover:transition-all hover:-rotate-180"
                  onClick={handleChangeActive}
                >
                  Collapse
                </FaXmark>
              )}
            </div>
            <SubMenu icon={<FiUserPlus />} label="User Management">
              <Link to="/addUser">
                <MenuItem icon={<FiUserPlus />}> Add User</MenuItem>
              </Link>
              <Link to="/allUser">
                <MenuItem icon={<FiUsers />}> All Users</MenuItem>
              </Link>
              <MenuItem icon={<IoPaperPlaneOutline />}> Bar charts</MenuItem>
            </SubMenu>
            <SubMenu icon={<FaRegListAlt />} label="Departments">
              <Link to="/addDepartment">
                <MenuItem icon={<FaRegListAlt />}> Add Departments</MenuItem>
              </Link>
              <Link to="/allDepartment">
                <MenuItem icon={<FaRegFileAlt />}> All Department</MenuItem>
              </Link>
              <Link to="/master_details_1">
                <MenuItem icon={<FaRegFileAlt />}> Master Details 1</MenuItem>
              </Link>
              <Link to="/master_details_2">
                <MenuItem icon={<FaRegFileAlt />}> Master Details 2</MenuItem>
              </Link>
              <Link to="/master_details_3">
                <MenuItem icon={<FaRegFileAlt />}> Master Details 3</MenuItem>
              </Link>
            </SubMenu>
            <SubMenu icon={<FaUser />} label="Employees">
              <Link to="/employees">
                <MenuItem icon={<FaUser />}> Employees</MenuItem>
              </Link>
              <Link to="/addEmployee">
                <MenuItem icon={<FaUserPlus />}> Add Employees</MenuItem>
              </Link>
            </SubMenu>
            <SubMenu icon={<RiDragDropFill />} label="DND">
              <Link to="/users">
                <MenuItem icon={<FiFeather />}> Users</MenuItem>
              </Link>
            </SubMenu>
            <MenuItem icon={<MdOutlineWidgets />}>Widget</MenuItem>
            <Link to="/profile">
              <MenuItem prefix={user} icon={<FaRegUser />}></MenuItem>
            </Link>
          </Menu>
        </Sidebar>
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default SideMenuBar;
