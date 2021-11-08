import React from "react";

export const Login = () => {
  return (
    <span className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-3xl text-gray-800">Login</h3>
        <form className="flex flex-col mt-5 px-5">
          <input
            placeholder="Email"
            className="bg-gray-200 shadow-inner focus:outline-none focus:border-green-500 border-2 focus:border-opacity-40 mb-3 py-3 px-4 rounded-3xl"
          />
          <input
            placeholder="Password"
            className="bg-gray-200 shadow-inner focus:outline-none focus:border-green-500 border-2 focus:border-opacity-40 py-3 px-4 rounded-3xl"
          />
          <button className="px-5 py-3 bg-gray-800 text-white text-lg mt-3 rounded-xl hover:opacity-80">
            Log In
          </button>
        </form>
      </div>
    </span>
  );
};
