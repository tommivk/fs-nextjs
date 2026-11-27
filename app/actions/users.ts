"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createUser, getUserWithBlogs } from "../services/users";

export const registerUser = async (
  prevState: {
    values: {
      username: string;
      name: string;
      password: string;
      passwordConfirm: string;
    };
    error: string;
  },
  formData: FormData,
) => {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const values = { username, name, password, passwordConfirm };

  const exists = await getUserWithBlogs(username);
  if (exists) {
    return {
      values,
      error: "Username is taken",
    };
  }

  if (!username || username.length < 4) {
    return {
      values,
      error: "username must be at least 4 characters long",
    };
  }
  if (!name) {
    return {
      values,
      error: "Name is required",
    };
  }
  if (!password || password.length < 4) {
    return {
      values,
      error: "Password must be at least 4 characters long",
    };
  }

  if (password !== passwordConfirm) {
    return {
      values,
      error: "Password confirmation does not match",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await createUser(username, name, passwordHash);
  } catch (error: any) {
    return {
      values,
      error: "Failed to create user",
    };
  }
  redirect("/login");
};
