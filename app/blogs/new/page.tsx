"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    values: { title: "", author: "", url: "" },
    error: "",
    success: false,
  });

  const { showNotification } = useNotification();
  const router = useRouter();
  useEffect(() => {
    if (state.success) {
      showNotification("Blog created!");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="flex justify-center">
      <div className="m-auto px-20 py-20 bg-slate-500 mt-20 rounded-2xl w-fit">
        <h2 className="text-2xl mb-4">Create a new Blog</h2>
        <form action={formAction}>
          <div>
            <label className="w-16 inline-block">
              Title
              <input
                className="bg-stone-200 rounded-sm mt-1 ml-2 text-slate-900"
                type="text"
                name="title"
                required
                defaultValue={state.values?.title}
              />
            </label>
          </div>

          <div>
            <label className="w-16 inline-block">
              Author
              <input
                className="bg-stone-200 rounded-sm mt-1 ml-2 text-slate-900"
                type="text"
                name="author"
                required
                defaultValue={state.values?.author}
              />
            </label>
          </div>

          <div>
            <label className="w-16 inline-block">
              URL
              <input
                className="bg-stone-200 rounded-sm mt-1 ml-2 text-slate-900"
                type="text"
                name="url"
                required
                defaultValue={state.values?.url}
              />
            </label>
          </div>

          <button
            className="rounded-md block w-fit m-auto bg-indigo-500 px-2 mt-6"
            type="submit"
            data-testid="create-blog-button"
          >
            Create
          </button>
          {state.error && <p className="text-red-700 mt-2">{state.error}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewBlog;
