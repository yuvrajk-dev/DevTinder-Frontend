import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card bg-base-200 w-80 shadow-xl border border-base-300">
      <figure className="h-72 bg-base-300">
        <img
          src={
            user.photoUrl ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          }
          alt={user.firstName}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl">
          {user.firstName} {user.lastName}
          {user.age && (
            <span className="text-base font-normal opacity-70">{user.age}</span>
          )}
        </h2>

        <p className="opacity-70">{user.gender}</p>

        <div className="card-actions justify-center mt-4">
          <button className="btn btn-error btn-circle text-xl">✕</button>

          <button className="btn btn-success btn-circle text-xl">♥</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
