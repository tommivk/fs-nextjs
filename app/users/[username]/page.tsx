import { notFound } from "next/navigation";
import { getUserWithBlogs } from "@/app/services/users";

export const dynamic = "force-dynamic";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const userData = await getUserWithBlogs(username);

  if (!userData) {
    notFound();
  }
  const blogs = userData.blogs;
  return (
    <div>
      <h1>{userData.name}</h1>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <div>
          <h2>{blog.title}</h2>
          <h3>{blog.author}</h3>
          <a href={blog.url}>{blog.url}</a>
          <p>Likes: {blog.likes}</p>
        </div>
      ))}
    </div>
  );
};

export default UserPage;
