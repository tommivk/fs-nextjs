"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementLike } from "../services/blogs";
import { auth } from "@/auth";

export const createBlog = async (
  prevState: { error: string },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  if (!title || title.length < 5) {
    return { error: "Title must be at least 5 characters long" };
  }
  if (!author || author.length < 5) {
    return { error: "Author must be at least 5 characters long" };
  }
  if (!url || url.length < 5) {
    return { error: "Url must be at least 5 characters long" };
  }
  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLike(id);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
};
