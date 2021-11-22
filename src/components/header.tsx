import React from "react";
import nuberLogo from "../images/eats-logo.svg";

export const Header = () => {
  return (
    <header className=" py-4">
      <img src={nuberLogo} className="w-40 mb-10" alt="" />
      <div className="w-full max-w-screen-xl mx-auto">Im the header</div>
    </header>
  );
};
