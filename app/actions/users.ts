"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createUser, getUserWithBlogs, updateToken } from "../services/users";
import { getCurrentUser } from "../services/session";

export const registerUser = async (
  prevState: {
    values: {
      username: string;
      name: string;
      password: string;
      passwordConfirm: string;
    };
    error: string;
    field?: string;
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
      field: "username",
    };
  }

  if (!username || username.length < 4) {
    return {
      values,
      error: "username must be at least 4 characters long",
      field: "username",
    };
  }
  if (!name) {
    return {
      values,
      error: "Name is required",
      field: "name",
    };
  }
  if (!password || password.length < 4) {
    return {
      values,
      error: "Password must be at least 4 characters long",
      field: "password",
    };
  }

  if (password !== passwordConfirm) {
    return {
      values,
      error: "Password confirmation does not match",
      field: "passwordConfirm",
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    await createUser(username, name, passwordHash);
  } catch (error: any) {
    return {
      values,
      error: "Failed to create user",
      field: "form",
    };
  }
  redirect("/login");
};

export const generateNewToken = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  const token = crypto.randomUUID();
  await updateToken(user.id, token);
  revalidatePath("/me");
};
