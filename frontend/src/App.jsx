import React, { useState, useEffect } from "react";
import { axiosInstance } from "./lib/axios";
import Card from "./components/Card";

const USERS_PER_PAGE = 10;

const App = () => {
  const [userData, setUserData] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/getusers");
      setUserData(res.data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Add user handler
  const handleAddUser = async (e) => {
    e.preventDefault();
    if (!newUser.trim()) return;
    setLoading(true);
    try {
      await axiosInstance.post("/adduser", { fullName: newUser });
      setNewUser("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error.message);
    }
    setLoading(false);
  };

  const handleClaim = async (e) => {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    try {
      await axiosInstance.post("/claimpoint", {
        userId: selectedUser,
        point: randomNumber,
      });
      setSelectedUser("");
      fetchUsers();
    } catch (error) {
      console.error("Error claiming points:", error.message);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(userData.length / USERS_PER_PAGE);
  const startIdx = (page - 1) * USERS_PER_PAGE;
  const endIdx = startIdx + USERS_PER_PAGE;
  const pageUsers = userData.slice(startIdx, endIdx);

  // Top 3 cards logic (only on first page)
  const showCards = page === 1;
  const tableUsers = showCards ? pageUsers.slice(3) : pageUsers;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400 relative px-2 sm:px-0">
      {/* Glassy overlay */}
      <div className="absolute inset-0 z-0 backdrop-blur-md bg-rose-200/70" />
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 mt-6 tracking-tight text-center">
          Points Game
        </h1>
        {/* User Dropdown Form */}
        <form
          id="claim-form"
          className="mb-6 w-full max-w-xl flex flex-col sm:flex-row gap-4 justify-center"
          onSubmit={handleClaim}
        >
          <select
            id="user-select"
            className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select a user</option>
            {userData.map((user) => (
              <option key={user._id} value={user._id}>
                {user.fullName}
              </option>
            ))}
          </select>
          <button
            id="claim-button"
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Claim
          </button>
        </form>

        {/*Top 3 Cards*/}
        <div className="flex flex-col flex-1 items-center w-full">
          {showCards && (
            <div className="flex flex-row justify-center mb-0 w-full max-w-lg ">
              <Card rank="2" user={userData[1]} />
              <Card rank="1" user={userData[0]} />
              <Card rank="3" user={userData[2]} />
            </div>
          )}

          <div className="w-full max-w-lg overflow-x-auto">
            <table className="w-full table-auto border-collapse mt-0 bg-yellow-50 border border-gray-300 rounded-lg divide-y divide-gray-200 text-sm sm:text-base">
              <tbody>
                {tableUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`bg-yellow-50${idx !== tableUsers.length - 1 ? ' border-b border-gray-200' : ''}`}
                  >
                    <td className="py-2 px-4 text-center font-semibold">
                      {showCards ? idx + 4 : startIdx + idx + 1}
                    </td>
                    <td className="py-2 px-4 ">{user.fullName}</td>
                    <td className="py-2 px-4 text-center">
                      {user.totalPoints} pts
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-4 flex-wrap">
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded font-semibold ${
                  page === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-semibold disabled:opacity-50"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>

          {/* Add User Form */}
          <form
            id="add-user-form"
            className="flex flex-col sm:flex-row gap-4 mt-8 mb-2 justify-center w-full max-w-xl"
            onSubmit={handleAddUser}
          >
            <input
              type="text"
              id="new-user"
              className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new user"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              id="add-user-button"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
