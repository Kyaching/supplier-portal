import {useContext, useState} from "react";
import {FiDelete} from "react-icons/fi";
import "../../style/custom-scroll.css";
import {MailContext} from "@/context/MailContext";
import {useGet} from "../hooks/useAPICall";
import {useAuth} from "@/context/AuthContext";
const UserSelect = () => {
  const {data} = useGet("/users");
  const {selectedUsers, setSelectedUsers} = useContext(MailContext);
  const {user: loggedUser} = useAuth();

  const [isDrop, setIsDrop] = useState(false);
  const [search, setSearch] = useState("");
  const users = data.map(user => user.user_name);

  const toggleDropDown = () => setIsDrop(!isDrop);

  const handleSelectAllUser = () => {
    const selectAllUsers = users?.filter(user => loggedUser !== user);
    setSelectedUsers(selectAllUsers);
  };

  const handleSelectUser = user => {
    if (!selectedUsers.includes(user)) {
      const newSelectedUsers = [...selectedUsers, user];
      setSelectedUsers(newSelectedUsers);
    }
    setIsDrop(false);
  };
  const handleRemoveUser = userToRemove => {
    const newSelectedUsers = selectedUsers.filter(
      user => user !== userToRemove
    );
    setSelectedUsers(newSelectedUsers);
  };
  const filterUser = users?.filter(
    user =>
      user.toLowerCase().includes(search.toLowerCase()) &&
      !selectedUsers.includes(user) &&
      loggedUser !== user
  );
  return (
    <>
      <div className="relative">
        <div className="flex gap-2">
          <button
            onClick={toggleDropDown}
            className="w-1/2 h-6 bg-black px-1 text-sm text-white"
          >
            Select recipient
          </button>
          <div
            className="flex flex-wrap justify-end w-full 
         overflow-y-auto custom-scroll gap-3 max-h-14"
          >
            {selectedUsers?.map(user => (
              <div
                key={user}
                className="flex h-6 p-1 items-center bg-gray-300 rounded-full"
              >
                {user}
                <button className="ml-1" onClick={() => handleRemoveUser(user)}>
                  <FiDelete />
                </button>
              </div>
            ))}
          </div>

          {isDrop && (
            <div
              className="absolute z-10 mt-6 w-1/3 bg-white border
           border-gray-300 rounded shadow-lg"
            >
              <ul className="max-h-52 overflow-y-auto overflow-x-hidden custom-scroll">
                <input
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border-b border-gray-300"
                ></input>
                <li
                  className=" hover:bg-gray-100 text-center cursor-pointer"
                  onClick={handleSelectAllUser}
                >
                  All
                </li>
                {filterUser?.length > 0 ? (
                  filterUser?.map(user => (
                    <li
                      key={user}
                      className=" hover:bg-gray-100 text-center cursor-pointer"
                      onClick={() => handleSelectUser(user)}
                    >
                      {user}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">No user Found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserSelect;
