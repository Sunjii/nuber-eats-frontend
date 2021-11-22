import React from "react";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import nuberLogo from "../images/eats-logo.svg";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className=" py-4">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-40" alt="" />
        <span className="text-xs">
          <Link to="/my-profile/">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
            {data?.me.email}
          </Link>
        </span>
      </div>
    </header>
  );
};
