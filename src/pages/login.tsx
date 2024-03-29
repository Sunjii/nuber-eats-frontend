import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { Helmet } from "react-helmet-async";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../images/eats-logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";

export const LOGIN_MUTATION = gql`
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
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      // saving token
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      // login!
      isLoggedInVar(true);
    }
  };

  // login mutation
  const [
    loginMutation,
    { data: loginMutationResult, loading, error: loginMutationError },
  ] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
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
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
        <img src={nuberLogo} className="w-60 mb-5" alt="" />
        <h4 className="w-full font-bold text-left text-3xl mb-10">
          Welcome Back!
        </h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mb-5 mt-5 w-full"
        >
          <input
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "올바른 이메일을 입력하세요",
              },
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
          <Button
            canClick={isValid}
            loading={loading}
            actionText={"Log In"}
          ></Button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
          {loginMutationError?.message && (
            <FormError errorMessage={loginMutationError.message} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/sign-up" className="text-lime-600 hover:underline">
            Create an Account!
          </Link>
        </div>
      </div>
    </div>
  );
};
