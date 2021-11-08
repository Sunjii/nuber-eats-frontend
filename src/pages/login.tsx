import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email?: string;
  password?: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();
  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <span className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center pt-8 pb-7">
        <h3 className="text-3xl text-gray-800 font-bold">Log In</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 px-5"
        >
          <input
            {...register("email", {
              required: "Email is required.",
            })}
            required
            name="email"
            placeholder="email"
            className="input mb-3"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">
              {errors.email?.message}
            </span>
          )}

          <input
            {...register("password", {
              required: "Password is required.",
              minLength: 8,
            })}
            required
            name="password"
            type="password"
            placeholder="password"
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">
              {errors.password?.message}
            </span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              비밀번호는 8자 이상입니다.
            </span>
          )}
          <button className="btn mt-3">Log In</button>
        </form>
      </div>
    </span>
  );
};
