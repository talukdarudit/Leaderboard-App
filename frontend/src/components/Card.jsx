import React from "react";

const Card = ({ rank, user }) => {
  if (!user) return null; // Prevent rendering if user is undefined

  return (
    <div className="bg-white rounded-t-xl py-6 px-5 flex flex-col items-center w-full max-w-xs min-h-[140px] border-t-2 border-l-2 border-r-2 border-yellow-400">
      <div className="bg-yellow-400 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold shadow-md mb-2 border-4 border-white">
        {rank}
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-2 text-base font-semibold text-center">{user.fullName}</div>
        <div className="text-gray-600 font-bold text-base">
          {user.totalPoints} pts
        </div>
      </div>
    </div>
  );
};

export default Card;
