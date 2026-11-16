import { Suspense } from "react";
import { notFound } from "next/navigation";
import { likeBlog } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";

const BlogDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <h3>{blog.author}</h3>
      <a href={blog.url}>{blog.url}</a>
      <p>Likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

export default function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <Suspense fallback={<p>Loading product...</p>}>
        <BlogDetails params={params} />
      </Suspense>
    </div>
  );
}
