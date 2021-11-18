import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../images/eats-logo.svg";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const Login = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  // login mutation
  const [
    loginMutation,
    { data: loginMutationResult, loading, error: loginMutationError },
  ] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted: () => null,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-40">
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-60 mb-5" />
        <h4 className="w-full font-bold text-left text-3xl mb-10">
          Welcome Back!
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full"
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
          <button className="btn">{loading ? "Loading..." : "Log In"}</button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
          {loginMutationError?.message && (
            <FormError errorMessage={loginMutationError.message} />
          )}
        </form>
      </div>
    </div>
  );
};
