"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { useNotifications } from "@/context/notificationContext";

export default function NotificationBell() {
  const { notifications, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-gray-200 transition"
        aria-label="Notifications"
      >
        <Bell size={24} />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 shadow-lg rounded-lg p-3 max-h-60 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">No new notifications</p>
          ) : (
            <>
              <button
                className="text-blue-500 text-xs mb-2 underline"
                onClick={clearNotifications}
              >
                Clear All
              </button>
              {notifications.map((notif: string, idx: number) => (
                <div key={idx} className="p-2 border-b last:border-none">
                  {notif}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
