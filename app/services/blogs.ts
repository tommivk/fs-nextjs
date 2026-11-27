import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingList, users } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getBlogs = async () => {
  return await db.query.blogs.findMany();
};

export const getBlogById = async (id: number) =>
  await db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  });

export const incrementLike = async (id: number) => {
  const blog = await getBlogById(id);
  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};

export const getUsersReadingList = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  return await db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: { blog: true },
  });
};

export const markAsRead = async (readingListId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  await db
    .update(readingList)
    .set({ read: true })
    .where(
      and(eq(readingList.id, readingListId), eq(readingList.userId, user.id)),
    );
};

export const addBlogToReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  await db.insert(readingList).values({ blogId, userId: user.id });
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const [blog] = await db
    .insert(blogs)
    .values({ title, author, url, userId: user!.id })
    .returning({ id: blogs.id });

  await addBlogToReadingList(blog.id);
};
