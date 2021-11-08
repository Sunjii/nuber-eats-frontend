import React from "react";

export const Login = () => {
  return (
    <span className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center pt-5 pb-7">
        <h3 className="text-3xl text-gray-800 font-bold">Log In</h3>
        <form className="flex flex-col mt-5 px-5">
          <input placeholder="Email" className="input mb-3" />
          <input placeholder="Password" className="input" />
          <button className="px-5 py-3 bg-gray-800 text-white text-lg mt-3 rounded-xl hover:opacity-80">
            Log In
          </button>
        </form>
      </div>
    </span>
  );
};
