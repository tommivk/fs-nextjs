"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addBlog,
  addBlogToReadingList,
  incrementLike,
  markAsRead,
} from "../services/blogs";
import { auth } from "@/auth";

export const createBlog = async (
  prevState: {
    values: { title: string; author: string; url: string };
    error: string;
    success?: boolean;
  },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const values = {
    title,
    author,
    url,
  };

  if (!title || title.length < 5) {
    return {
      values,
      error: "Title must be at least 5 characters long",
      success: false,
    };
  }
  if (!author || author.length < 5) {
    return {
      values,
      error: "Author must be at least 5 characters long",
      success: false,
    };
  }
  if (!url || url.length < 5) {
    return {
      values,
      error: "Url must be at least 5 characters long",
      success: false,
    };
  }
  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return { values, error: "", success: true };
};

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLike(id);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
};

export const addToReadingList = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const blogId = Number(formData.get("blogId"));
  await addBlogToReadingList(blogId);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${blogId}`);
};

export const markBlogAsRead = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await markAsRead(id);
  revalidatePath("/me");
};
