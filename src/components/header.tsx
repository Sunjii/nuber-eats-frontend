import React from "react";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import nuberLogo from "../images/eats-logo.svg";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 py-4 px-3 text-center text-white text-lg">
          <span>Please verify your email</span>
        </div>
      )}
      <header className=" py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <img src={nuberLogo} className="w-40" alt="" />
          <span className="text-xs">
            <Link to="/edit-profile/">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
              {data?.me.email}
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
