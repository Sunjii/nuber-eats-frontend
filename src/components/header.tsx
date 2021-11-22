import React from "react";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/eats-logo.svg";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className=" py-4">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-40" alt="" />
        <span className="text-xs">{data?.me.email}</span>
      </div>
    </header>
  );
};
