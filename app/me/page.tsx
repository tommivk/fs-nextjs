import { redirect } from "next/navigation";
import { generateNewToken } from "../actions/users";
import { markBlogAsRead } from "../actions/blogs";
import { getCurrentUser } from "../services/session";
import { getUsersReadingList } from "../services/blogs";
import Link from "next/link";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const readingList = await getUsersReadingList();

  const read = readingList.filter((item) => item.read);
  const unread = readingList.filter((item) => !item.read);

  return (
    <div className="mt-20 flex-col m-auto w-fit justify-center">
      <div>
        <h2 className="text-2xl mt-6">Reading list</h2>

        <h2 className="text-lg">Unread</h2>
        {unread.length === 0 && <p>No blogs</p>}
        {unread.map((listItem) => (
          <div key={listItem.id} className="flex justify-between">
            <Link
              href={`/blogs/${listItem.blogId}`}
              className="flex gap-1 mb-1"
            >
              <span>{listItem.blog.title}</span> -
              <span>{listItem.blog.author}</span>
            </Link>
            <form action={markBlogAsRead}>
              <input type="hidden" name="id" value={listItem.id} />
              <button
                type="submit"
                className="inline ml-2 rounded-md bg-indigo-500 px-2 mt-1"
              >
                Mark as read
              </button>
            </form>
          </div>
        ))}

        <h2 className="text-lg mt-4">Read</h2>
        {read.length === 0 && <p>No blogs</p>}
        {read.map((listItem) => (
          <Link href={`/blogs/${listItem.blogId}`} className="flex gap-1 mb-1">
            <span>{listItem.blog.title}</span> -
            <span>{listItem.blog.author}</span>
          </Link>
        ))}
      </div>

      <div className="mt-20">
        <div className="mb-2">API Token: {user.token}</div>

        <form action={generateNewToken}>
          <button type="submit" className="rounded-md  bg-indigo-500 px-2 ">
            Generate new token
          </button>
        </form>
      </div>
    </div>
  );
};

export default MePage;
