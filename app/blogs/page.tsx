import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter = "" } = await searchParams;
  const blogs = getBlogs()
    .sort((a, b) => b.likes - a.likes)
    .filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              "{blog.title}" - {blog.author}{" "}
            </Link>{" "}
            {`${blog.likes} likes`}
          </li>
        ))}
      </ul>
      <form action={"/blogs"} method="GET">
        <input type="text" name="filter" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
export default Blogs;
