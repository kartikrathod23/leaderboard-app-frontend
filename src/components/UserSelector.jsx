// UserSelector.jsx - Component for selecting a user from the list
import React, { useState } from "react";

// Helper to generate avatar URL with initials
const PLACEHOLDER = "https://ui-avatars.com/api/?background=random";
function getInitialsUrl(name) {
  if (!name) return PLACEHOLDER;
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random`;
}

const PAGE_SIZE = 5;

const UserSelector = ({ users, selectedUser, onSelect }) => {
  // Track current page for pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageUsers = users.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {pageUsers.map((user) => {
            // Check if this user is currently selected
            const selected = selectedUser && selectedUser._id === user._id;
            return (
              <li key={user._id || user.id || user.name}>
                {/*
                  Clicking a user selects them. If already selected, clicking again will deselect.
                  Avatar shows profilePic if present, otherwise shows initials.
                */}
                <button
                  onClick={() => onSelect(selected ? null : user)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg font-semibold shadow-sm transition-all duration-150 focus:outline-none
                    ${selected ? "bg-yellow-300 border-2 border-yellow-500 shadow-lg text-yellow-900" : "bg-yellow-100 border border-yellow-200 text-yellow-800 hover:bg-yellow-200 hover:shadow-md"}`}
                >
                  <span className="w-8 h-8 rounded-full bg-yellow-200 border border-yellow-400 flex items-center justify-center font-bold text-yellow-700 overflow-hidden">
                    {user.profilePic ? (
                      <img
                        src={user.profilePic}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <img
                        src={getInitialsUrl(user.name)}
                        alt={user.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </span>
                  <span className="truncate">{user.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Pagination controls for user list */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mt-4">
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 rounded bg-gray-200 text-gray-700 font-semibold disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSelector; 