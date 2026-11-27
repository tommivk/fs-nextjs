"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

const inputClass = "bg-stone-200 rounded-sm mt-4 ml-2 text-slate-900";
const labelClass = "w-40 inline-block";

const RegisterPage = () => {
  const [state, formAction] = useActionState(registerUser, {
    values: { username: "", name: "", password: "", passwordConfirm: "" },
    error: "",
    field: "",
  });
  return (
    <div className="flex justify-center">
      <div className="m-auto px-20 py-20 bg-slate-500 mt-20 rounded-2xl w-fit">
        <h2 className="text-2xl mb-4">Register</h2>
        <form action={formAction}>
          <div>
            <label htmlFor="username" className={labelClass}>
              Username
            </label>
            <input
              id="username"
              className={inputClass}
              type="text"
              name="username"
              required
              defaultValue={state.values?.username}
            />
          </div>
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              className={inputClass}
              type="text"
              name="name"
              required
              defaultValue={state.values?.name}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              className={inputClass}
              type="password"
              name="password"
              required
              defaultValue={state.values?.password}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className={labelClass}>
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              className={inputClass}
              type="password"
              name="passwordConfirm"
              required
              defaultValue={state.values?.passwordConfirm}
            />
          </div>
          <button
            className="rounded-md block w-fit m-auto bg-indigo-500 px-2 mt-6"
            type="submit"
            data-testid="register-button"
          >
            Register
          </button>
          {state.error && (
            <p
              className="text-red-700 mt-2"
              data-testid={`${state.field || "form"}-error`}
            >
              {state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
