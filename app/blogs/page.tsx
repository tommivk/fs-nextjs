import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = "" } = await searchParams;
  const blogs = await getBlogs();
  const sortedBlogs = blogs
    .sort((a, b) => b.likes - a.likes)
    .filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="m-auto w-fit p-3 mt-4">
      <h2 className="text-2xl mb-4">Blogs</h2>
      <ul>
        {sortedBlogs.map((blog) => (
          <li key={blog.id} className="mb-2">
            <Link href={`/blogs/${blog.id}`}>
              "{blog.title}" - {blog.author}{" "}
            </Link>{" "}
            {`${blog.likes} likes`}
          </li>
        ))}
      </ul>
      <form action={"/blogs"} method="GET">
        <input
          className="bg-stone-200 rounded-sm mt-4 mr-2 text-slate-900"
          type="text"
          name="filter"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default Blogs;
