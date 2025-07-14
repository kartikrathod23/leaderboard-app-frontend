// App.jsx - Main application component for the Leaderboard App
import React, { useState, useEffect } from "react";
import UserSelector from "./components/UserSelector";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";
import ClaimHistory from "./components/ClaimHistory";
import API_URL from "../server";

const App = () => {
  // State for all users
  const [users, setUsers] = useState([]);
  // Currently selected user for claiming points
  const [selectedUser, setSelectedUser] = useState(null);
  // Claim history records
  const [claimHistory, setClaimHistory] = useState([]);
  // New user input value
  const [newUser, setNewUser] = useState("");
  // Loading states for users and history
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  // Flags to only show loading indicators on initial load
  const [initialUsersLoad, setInitialUsersLoad] = useState(true);
  const [initialHistoryLoad, setInitialHistoryLoad] = useState(true);
  // Points awarded in the most recent claim
  const [awardedPoints, setAwardedPoints] = useState(null);

  // Fetch all users from the backend
  const fetchUsers = async (isInitial = false) => {
    if (isInitial) setLoadingUsers(true);
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    setUsers(data);
    setLoadingUsers(false);
    if (isInitial) setInitialUsersLoad(false);
  };

  // Fetch claim history from the backend
  const fetchHistory = async (isInitial = false) => {
    if (isInitial) setLoadingHistory(true);
    const res = await fetch(`${API_URL}/history`);
    const data = await res.json();
    setClaimHistory(data);
    setLoadingHistory(false);
    if (isInitial) setInitialHistoryLoad(false);
  };

  // On initial mount, load users and claim history
  useEffect(() => {
    fetchUsers(true);
    fetchHistory(true);
  }, []);

  // Add a new user to the database
  const handleAddUser = async (name) => {
    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setNewUser("");
    fetchUsers();
    alert("User has been added!"); // Show confirmation alert
  };

  // Claim random points for the selected user
  const handleClaim = async () => {
    if (!selectedUser) return;
    const res = await fetch(`${API_URL}/claim`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUser._id}),
    });
    const data = await res.json();
    setAwardedPoints(data.awardedPoints); // Show awarded points
    setTimeout(() => setAwardedPoints(null), 2000); // Hide after 2 seconds
    setSelectedUser(null); // Deselect user after claim
    fetchUsers(); // Refresh leaderboard
    fetchHistory(); // Refresh claim history
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-4">Leaderboard App</h1>
      <div className="flex flex-col gap-6">
        {/* Main content: User selection and leaderboard side by side on large screens */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* User Selection Section */}
          <div className="flex-1 flex flex-col gap-4 bg-orange-50 rounded-xl p-4 min-w-0">
            <h2 className="text-xl font-semibold mb-4 mt-4 lg:mt-1">User Selection</h2>
            {/* Claim button and awarded points */}
            <div className="flex justify-start mb-2">
              <ClaimButton selectedUser={selectedUser} onClaim={handleClaim} awardedPoints={awardedPoints} />
            </div>
            {/* User list with selection and pagination */}
            <section className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[300px]">
              {(loadingUsers && initialUsersLoad) ? (
                <div className="text-center text-gray-400">Loading users...</div>
              ) : (
                <UserSelector
                  users={users}
                  selectedUser={selectedUser}
                  onSelect={setSelectedUser}
                />
              )}
            </section>
            {/* Add new user input and button */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add new user"
                className="px-3 text-black py-2 rounded-md border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={newUser}
                onChange={e => setNewUser(e.target.value)}
              />
              <button
                className="px-4 py-2 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors"
                disabled={!newUser.trim()}
                onClick={() => handleAddUser(newUser.trim())}
              >
                Add
              </button>
            </div>
          </div>
          {/* Leaderboard Section */}
          <div className="flex-1 flex flex-col gap-4 bg-orange-50 rounded-xl p-4 min-w-0">
            <h2 className="text-xl font-semibold mb-4 mt-4 lg:mt-1">Leaderboard</h2>
            {loadingUsers && initialUsersLoad ? (
              <div className="text-center text-gray-400">Loading leaderboard...</div>
            ) : (
              <Leaderboard users={users} />
            )}
          </div>
        </div>
        {/* Claim History Section (full width) */}
        <section className="w-full mt-4">
          <h2 className="text-xl font-semibold mb-4">Claim History</h2>
          {loadingHistory && initialHistoryLoad ? (
            <div className="text-center text-gray-400">Loading history...</div>
          ) : (
            <ClaimHistory history={claimHistory} />
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
