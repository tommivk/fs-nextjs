import { notFound } from "next/navigation";
import { addToReadingList, likeBlog } from "@/app/actions/blogs";
import { getBlogById, getUsersReadingList } from "@/app/services/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const readingList = await getUsersReadingList();

  if (!blog) {
    notFound();
  }

  console.log({ readingList });

  const isInReadingList = readingList.some((b) => b.blogId === blog.id);

  return (
    <div className="flex justify-center" data-testid="blog-detail">
      <div className="m-auto p-20 bg-slate-500 mt-20 rounded-2xl w-fit">
        <h2 className="text-2xl" data-testid="blog-title">
          {blog.title}
        </h2>
        <h3 className="text-lg" data-testid="blog-author">
          Author: {blog.author}
        </h3>
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
        {isInReadingList ? (
          <p className="mt-4">This blog is in your reading list</p>
        ) : (
          <form
            action={addToReadingList}
            className="mx-auto mt-4 text-lg w-fit"
          >
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              className="rounded-md bg-indigo-500 px-2 mt-2"
              type="submit"
              data-testid="add-to-reading-list-button"
            >
              Add to reading list
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
