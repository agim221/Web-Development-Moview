import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";

function Account() {
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const fetchAccountInfo = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://webdev-production-2eb9.up.railway.app/api/users/detail",
        {
          params: {
            remember_token: localStorage.getItem("remember_token"),
          },
        }
      );
      setUsername(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching account info:", error);
    }
  }, []);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);

  const handlePasswordChange = async () => {
    try {
      await axios.put(
        "https://webdev-production-2eb9.up.railway.app/api/users/change-password",
        {
          remember_token: localStorage.getItem("remember_token"),
          current_password: currentPassword,
          new_password: newPassword,
          confirm_new_password: confirmNewPassword,
        }
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowModal(false);
      setMessage("Password changed successfully");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Incorrect password");
      } else {
        setMessage("Error changing password");
        console.error("Error changing password:", error);
      }
    }
  };

  return (
    <div className="account-container bg-white p-6 max-w-md mx-auto mt-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Account Information
      </h2>

      <div className="account-info mb-4">
        <label className="block text-gray-600 font-medium">Username:</label>
        <p className="text-lg text-gray-800">{username}</p>
      </div>

      <div className="account-info mb-6">
        <label className="block text-gray-600 font-medium">Email:</label>
        <p className="text-lg text-gray-800">{email}</p>
      </div>

      <button
        className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
        onClick={() => setShowModal(true)}
      >
        Change Password
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                Current Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 font-medium mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <div className="flex justify-end space-x-2">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                onClick={handlePasswordChange}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
