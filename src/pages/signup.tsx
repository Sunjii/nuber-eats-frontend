import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Helmet from "react-helmet";
import React from "react";
import { useForm, useFormState } from "react-hook-form";
import { FormError } from "../components/form-error";

import nuberLogo from "../images/eats-logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const Signup = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  // login mutation
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT_MUTATION, {});

  const onSubmit = () => {};

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-40">
      <Helmet>
        <title>Sign Up | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-60 mb-5" />
        <h4 className="w-full font-bold text-left text-3xl mb-10">
          Let's Create Account!
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mb-5 mt-5 w-full"
        >
          <input
            {...register("email", {
              required: "Email is required.",
            })}
            required
            name="email"
            placeholder="Email"
            className="input mb-3"
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {console.log(errors.email?.message)}
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: 8,
            })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className="input"
          />
          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">
              비밀번호는 8자 이상입니다.
            </span>
          )}
          <Button
            canClick={isValid}
            loading={false}
            actionText={"Create Account"}
          ></Button>
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now.
          </Link>
        </div>
      </div>
    </div>
  );
};
