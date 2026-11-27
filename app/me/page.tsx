import { redirect } from "next/navigation";
import { generateNewToken } from "../actions/users";
import { getCurrentUser } from "../services/session";

const MePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mt-20 flex justify-center">
      <div>
        <div>Token: {user.token}</div>

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
