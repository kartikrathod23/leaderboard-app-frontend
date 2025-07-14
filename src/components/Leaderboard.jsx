// Leaderboard.jsx - Displays the top users and their rankings
import React, { useState } from "react";

const PAGE_SIZE = 5;
const TROPHY = "🏆";
const PLACEHOLDER = "https://ui-avatars.com/api/?background=random";

// Helper to generate avatar URL with initials
const getInitialsUrl = (name) => {
  if (!name) return PLACEHOLDER;
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=random`;
};

const Leaderboard = ({ users }) => {
  // Track current page for pagination (for users beyond top 3)
  const [page, setPage] = useState(1);
  // Sort users by points descending
  const sorted = [...users].sort((a, b) => (b.points || 0) - (a.points || 0));
  // Calculate pagination for users beyond top 3
  const totalPages = Math.ceil((sorted.length - 3) / PAGE_SIZE);
  const startIdx = 3 + (page - 1) * PAGE_SIZE;
  const pageUsers = sorted.slice(startIdx, startIdx + PAGE_SIZE);

  // Arrange top 3 users for podium display: left=2nd, middle=1st, right=3rd
  const top3 = [sorted[1], sorted[0], sorted[2]];

  return (
    <div className="bg-orange-50 rounded-xl p-4">
      {/* Top 3 podium cards */}
      <div className="flex justify-center gap-4 mb-6">
        {top3.map((user, idx) => {
          // idx: 0=left(2nd), 1=middle(1st), 2=right(3rd)
          // Only card size changes, avatar size stays the same
          const cardWidth = idx === 1 ? "w-36" : idx === 0 ? "w-28" : "w-24";
          const marginTop = idx === 1 ? 0 : 24;
          const place = idx === 1 ? 1 : idx === 0 ? 2 : 3;
          const userObj = user || {};
          const border = idx === 1 ? "border-yellow-400" : idx === 0 ? "border-gray-400" : "border-orange-400";
          return (
            <div
              key={userObj.id || userObj._id || idx}
              className={`flex flex-col items-center bg-white rounded-xl shadow p-3 ${cardWidth} ${idx === 1 ? "z-10" : ""}`}
              style={{ marginTop }}
            >
              {/* Avatar: show profilePic or initials */}
              <div className={`w-16 h-16 rounded-full border-4 ${border} mb-2 overflow-hidden bg-gray-100 flex items-center justify-center`}>
                {userObj.profilePic ? (
                  <img
                    src={userObj.profilePic}
                    alt={userObj.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={getInitialsUrl(userObj.name)}
                    alt={userObj.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* User name */}
              <div className="font-bold text-center text-sm truncate w-full" title={userObj.name}>{userObj.name}</div>
              {/* Points and trophy */}
              <div className="flex items-center gap-1 text-yellow-700 font-bold text-lg mt-1">
                {TROPHY} <span>{userObj.points || 0}</span>
              </div>
              {/* Place/rank */}
              <div className="mt-1 text-xs text-gray-500 font-semibold">{place}</div>
            </div>
          );
        })}
      </div>
      {/* Remaining users with pagination */}
      <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
        {pageUsers.map((user, idx) => (
          <div key={user.id || user._id} className="flex items-center px-4 py-2">
            <div className="w-8 text-center font-bold text-gray-700">{startIdx + idx + 1}</div>
            {/* Avatar: show profilePic or initials */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 mr-3 flex items-center justify-center">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={getInitialsUrl(user.name)}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1 font-medium truncate" title={user.name}>{user.name}</div>
            <div className="flex items-center gap-1 text-yellow-700 font-semibold">
              {TROPHY} <span>{user.points || 0}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls for leaderboard */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
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

export default Leaderboard; 