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
    <div
      className="mt-20 flex-col m-auto w-fit justify-center"
      data-testid="user-profile"
    >
      <div>
        <h1 className="text-3xl" data-testid="user-username">
          {user.username}
        </h1>
        <h2 data-testid="user-name">{user.name}</h2>

        <div data-testid="reading-list-section">
          <h2 className="text-2xl mt-6">Reading list</h2>

          <h2 className="text-lg">Unread</h2>
          {unread.length === 0 && (
            <p data-testid="no-unread-blogs">No unread blogs</p>
          )}
          <div data-testid="unread-section">
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
                    data-testid="mark-read-"
                  >
                    Mark as read
                  </button>
                </form>
              </div>
            ))}
          </div>

          <h2 className="text-lg mt-4">Read</h2>
          {read.length === 0 && (
            <p data-testid="empty-reading-list">No blogs</p>
          )}
          {read.map((listItem) => (
            <Link
              href={`/blogs/${listItem.blogId}`}
              className="flex gap-1 mb-1"
            >
              <span>{listItem.blog.title}</span> -
              <span>{listItem.blog.author}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-20" data-testid="api-token-section">
        <div className="mb-2" data-testid="token-display">
          API Token:{" "}
          {user.token ? (
            <p data-testid="api-token">{user.token}</p>
          ) : (
            <p data-testid="no-token-message">no token</p>
          )}
        </div>

        <form action={generateNewToken}>
          <button
            type="submit"
            className="rounded-md  bg-indigo-500 px-2 "
            data-testid="generate-token-button"
          >
            Generate new token
          </button>
        </form>
      </div>
    </div>
  );
};

export default MePage;
