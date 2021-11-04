import React from "react";
import { useForm } from "react-hook-form";

// interface
interface IForm {
  email: string;
  password: string;
}

export const LoggedOutRouter = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const onSubmit = () => {
    console.log(watch());
  };
  const onInvalid = () => {
    console.log("Cant create accont");
  };

  // 화면 구성
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
            name="email"
            type="email"
            placeholder="email"
          />
          {errors.email?.message && (
            <span className="text-red-600">{errors.email?.message}</span>
          )}
          {errors.email?.type === "pattern" && (
            <span className="text-red-600">Only Gmail Allowed</span>
          )}
        </div>
        <div>
          <input
            {...register("password", { required: true })}
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
