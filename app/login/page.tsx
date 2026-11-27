"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useNotification } from "@/app/components/NotificationContext";

export default function LoginPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const username = formData.get("username") as string;

    const result = await signIn("credentials", {
      username,
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      showNotification(`Logged in as ${username}`);
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center">
      <div className="m-auto px-20 py-20 bg-slate-500 mt-20 rounded-2xl w-fit">
        <h2 className="text-2xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="w-24 inline-block">
              Username
            </label>
            <input
              id="username"
              className="bg-stone-200 rounded-sm mt-4 ml-2 text-slate-900"
              type="text"
              name="username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="w-24 inline-block">
              Password
            </label>
            <input
              id="password"
              className="bg-stone-200 rounded-sm mt-4 ml-2 text-slate-900"
              type="password"
              name="password"
              required
            />
          </div>
          <button
            className="rounded-md block w-fit m-auto bg-indigo-500 px-2 mt-6"
            type="submit"
            data-testid="login-button"
          >
            Login
          </button>
          {error && (
            <p className="text-red-700 mt-2" data-testid="error-message">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
