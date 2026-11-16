import { getBlogs } from "../services/blogs";

const Blogs = () => {
  const blogs = getBlogs();
  return (
    <div>
      <h2>blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            "{blog.title}" - {blog.author} {`${blog.likes} likes`}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Blogs;
