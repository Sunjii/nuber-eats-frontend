import React from "react";
import nuberLogo from "../images/eats-logo.svg";

interface IHeaderProps {
  email: string;
}

export const Header: React.FC<IHeaderProps> = ({ email }) => {
  return (
    <header className=" py-4">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-40" alt="" />
        <span className="text-xs">{email}</span>
      </div>
    </header>
  );
};
