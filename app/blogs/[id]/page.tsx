import { notFound } from "next/navigation";
import { likeBlog } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="m-auto p-20 bg-slate-500 mt-20 rounded-2xl w-fit">
        <h2 className="text-2xl">{blog.title}</h2>
        <h3 className="text-lg">Author: {blog.author}</h3>
        <a className="text-blue-200" href={blog.url}>
          {blog.url}
        </a>
        <p>Likes: {blog.likes}</p>
        <form action={likeBlog} className="mx-auto mt-4 text-lg w-fit">
          <input type="hidden" name="id" value={blog.id} />
          <button className="rounded-md bg-indigo-500 px-2 mt-2" type="submit">
            Like
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPage;
