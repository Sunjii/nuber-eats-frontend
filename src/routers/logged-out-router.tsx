import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("Cant login");
  };

  console.log(errors);
  //
  return (
    <div>
      <h1>Logged Out</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            {...register("email", {
              required: "this is required.",
              pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            required
            name="email"
            type="email"
            placeholder="email"
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            required
            placeholder="password"
          />
        </div>
        <button className="bg-red-500">Submit</button>
      </form>
    </div>
  );
};
