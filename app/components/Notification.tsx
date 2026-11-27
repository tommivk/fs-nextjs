"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      data-testid="notification"
      className={`z-100 px-4 py-2.5 rounded-lg text-white w-fit absolute bottom-5 right-5 ${
        type === "success" ? "bg-[#3fdc23]" : "bg-[#e31d1c]"
      }`}
    >
      {message}
    </div>
  );
}
