import Link from "next/link";
import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();
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
    </div>
  );
};
export default Blogs;
