import { redirect } from "next/navigation";
import { generateNewToken } from "../actions/users";
import { getCurrentUser } from "../services/session";
import { getUsersReadingList } from "../services/blogs";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const readingList = await getUsersReadingList();

  return (
    <div className="mt-20 flex-col m-auto w-fit justify-center">
      <div>
        <div>Token: {user.token}</div>

        <form action={generateNewToken}>
          <button type="submit" className="rounded-md  bg-indigo-500 px-2 ">
            Generate new token
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl mt-6">Reading list</h2>
        {readingList.map((blog) => (
          <div>
            <p>{blog.blogId}</p>
            <p>{blog.read}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MePage;
