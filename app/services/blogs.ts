import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs } from "../../db/schema";

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

export const addBlog = async (title: string, author: string, url: string) => {
  return await db.insert(blogs).values({ title, author, url });
};
