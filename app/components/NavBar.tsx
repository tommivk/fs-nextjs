"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <nav className="m-auto w-fit p-2 text-lg">
      <Link href="/">home</Link>
      {" | "}
      <Link href="/blogs">blogs</Link>
      {" | "}
      <Link href="/users">users</Link>
      {session ? (
        <>
          {" | "}
          <Link href="/blogs/new">create new</Link>
          {" | "}
          <Link href="/me">me</Link>
          {" | "}
          <em>{session.user?.name} logged in</em>{" "}
          <button
            onClick={() => signOut()}
            className="rounded-md  w-fit m-auto bg-indigo-500 px-2 mt-6"
          >
            logout
          </button>
        </>
      ) : (
        <>
          {" | "}
          <Link href="/login">login</Link>
          {" | "}
          <Link href="/register">register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
