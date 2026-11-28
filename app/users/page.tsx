import Link from "next/link";
import { getUsers } from "../services/users";

export const dynamic = "force-dynamic";

const Users = async () => {
  const users = await getUsers();

  return (
    <div className="m-auto w-fit p-3 mt-4">
      <h2 className="text-2xl mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <Link href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
