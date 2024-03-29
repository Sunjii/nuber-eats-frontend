import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    role="button"
    className={`text-lg font-medium focus:outline-none text-white px-5 py-4 transition-colors; ${
      canClick
        ? "bg-lime-600 hover:bg-lime-800"
        : "bg-gray-400 pointer-events-none"
    } `}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
