import React, { useState } from "react";

const PAGE_SIZE = 10;

const ClaimHistory = ({ history }) => {
  // Sort by latest first
  const sorted = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const startIdx = (page - 1) * PAGE_SIZE;
  const pageHistory = sorted.slice(startIdx, startIdx + PAGE_SIZE);

  return (
    <div className="w-full bg-orange-50 rounded-xl shadow p-4">
      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Points</th>
            <th className="px-4 py-2 text-left">Time</th>
          </tr>
        </thead>
        <tbody>
          {pageHistory.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 font-medium">{item.userName}</td>
              <td className="px-4 py-2 text-yellow-700 font-bold">{item.points}</td>
              <td className="px-4 py-2 text-gray-500 text-sm">{new Date(item.timestamp).toLocaleString()}</td>
            </tr>
          ))}
          {pageHistory.length === 0 && (
            <tr>
              <td colSpan={3} className="px-4 py-6 text-center text-gray-400">No claim history yet.</td>
            </tr>
          )}
        </tbody>
      </table>
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

export default ClaimHistory; 