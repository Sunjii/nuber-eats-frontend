import React from "react";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";

export const EditProfile = () => {
  // get userData
  const { data: userData } = useMe();

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4>Edit Profile</h4>
      <form className="grid max-w-screen-sm gap-3 mb-5 mt-5 w-full">
        <input className="input" type="email" placeholder="Email" required />
        <input className="input" type="password" placeholder="Password" />
        <Button loading={false} canClick={true} actionText="Save Profile" />
      </form>
    </div>
  );
};
