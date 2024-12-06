import React, { useEffect, useState } from "react";
import CMSTable from "../../components/CMSTable";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch users from the API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users from the API
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const searchUsers = async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app/api/search/users",
        {
          params: { query: searchQuery },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleBlockUser = async (id, isBanned) => {
    try {
      let response;
      if (isBanned) {
        response = await axios.get(
          `https://webdev-production-2eb9.up.railway.app/api/users/unblock/${id}`
        );
      } else {
        response = await axios.get(
          `https://webdev-production-2eb9.up.railway.app/api/users/block/${id}`
        );
      }
      console.log(response.data);
      // Refresh the users list after blocking/unblocking a user
      fetchUsers();
    } catch (error) {
      console.error(
        `Error ${isBanned ? "unblocking" : "blocking"} user:`,
        error
      );
    }
  };

  // Render action buttons for each user row
  function renderActions(user) {
    return (
      <td>
        <button
          onClick={() => handleBlockUser(user.id, user.is_banned)}
          className={`p-2 rounded ${
            user.is_banned ? "bg-green-500" : "bg-red-500"
          } text-white hover:opacity-80`}
        >
          {user.is_banned ? "Unblock" : "Block"}
        </button>
      </td>
    );
  }

  // Format users data for CMSTable
  const formattedUsers = users.map((user, index) => [
    index + 1, // Row number
    user.username, // Username
    user.email, // Email
    renderActions(user), // Actions
  ]);

  return (
    <section className="w-full h-screen flex flex-col">
      <div className="flex flex-col w-3/4 mx-auto h-full bg-white rounded-lg shadow-lg p-4 overflow-y-auto">
        {/* Form layout for adding a new user */}
        <div className="flex flex-row mb-8 gap-4 bg-slate-100 p-4 rounded">
          <div className="flex flex-col">
            <label className="text-sm">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-slate-300 text-black p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-slate-300 text-black p-2 rounded w-full"
            />
          </div>
          <button
            className="bg-orange-500 text-white text-xs p-2 rounded hover:text-black hover:bg-white mt-6"
            onClick={() => console.log("Add user functionality here")}
          >
            Submit
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center mb-6 p-4 bg-slate-100 rounded">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="w-full px-3 py-2 bg-white rounded"
          />
          <button
            className="ml-4 bg-slate-500 text-white text-xs px-3 py-1 rounded hover:bg-slate-600"
            onClick={searchUsers}
          >
            Search
          </button>
        </div>

        {/* Table layout for displaying users */}
        <div className="overflow-y-auto">
          <CMSTable
            headers={["No", "Username", "Email", "Actions"]}
            datas={formattedUsers}
          />
        </div>
      </div>
    </section>
  );
}

export default Users;
