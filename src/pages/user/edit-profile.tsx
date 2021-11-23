import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";
import { useMe } from "../../hooks/useMe";

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  // get userData
  const { data: userData } = useMe();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormProps>({
    // default value
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <h4>Edit Profile</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mb-5 mt-5 w-full"
      >
        <input
          {...register("email", {
            required: "Email required.",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "이메일 형식으로 입력하세요",
            },
          })}
          className="input"
          type="email"
          placeholder="New Email"
          required
        />
        <input
          {...register("password", {
            minLength: 8,
          })}
          className="input"
          type="password"
          placeholder="New Password"
        />
        {errors.password?.message && (
          <FormError errorMessage={errors.password.message} />
        )}
        {errors.password?.type === "minLength" && (
          <span className="font-medium text-red-500">
            비밀번호는 8자 이상입니다.
          </span>
        )}
        <Button loading={false} canClick={true} actionText="Save Profile" />
      </form>
    </div>
  );
};
