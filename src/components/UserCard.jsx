import React from "react";

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="card bg-base-200 w-96 shadow-xl border border-base-300">
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="card-title text-2xl">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-sm opacity-60 capitalize">
              {user.gender}
              {user.age && ` • ${user.age} years old`}
            </p>
          </div>

          <img
            src={
              user.gender === "male"
                ? "https://api.dicebear.com/10.x/adventurer/svg?seed=Milo"
                : "https://api.dicebear.com/10.x/adventurer/svg?seed=Aneka"
            }
            alt="avatar"
            className="w-20 h-20"
          />
        </div>

        {user.bio && (
          <div className="mt-3">
            <h3 className="font-semibold">About</h3>

            <p className="mt-1 text-sm leading-relaxed opacity-70">
              {user.bio}
            </p>
          </div>
        )}

        {user.skills?.length > 0 && (
          <div className="mt-4">
            <h3 className="mb-2 font-semibold">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="badge badge-primary badge-outline">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions justify-center gap-6 mt-6">
          <button className="btn btn-error btn-circle text-xl" title="Ignore">
            ✕
          </button>

          <button
            className="btn btn-success btn-circle text-xl"
            title="Interested"
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
