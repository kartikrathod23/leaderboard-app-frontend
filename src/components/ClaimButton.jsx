import React from "react";

const ClaimButton = ({ selectedUser, onClaim, awardedPoints }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={onClaim}
        disabled={!selectedUser}
        className={`px-7 py-2 rounded-lg font-semibold text-lg transition-colors duration-150 shadow ${selectedUser ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      >
        Claim
      </button>
      {awardedPoints !== null && (
        <span className="bg-yellow-300 text-gray-900 px-5 py-2 rounded-lg font-semibold text-lg shadow animate-bounce">
          +{awardedPoints} points!
        </span>
      )}
    </div>
  );
};

export default ClaimButton; 