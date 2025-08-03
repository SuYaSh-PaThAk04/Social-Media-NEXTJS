"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { initSocket, getSocket } from "@/lib/socket";

type NotificationContextType = {
  notifications: string[];
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return; 
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.warn("⏳ No userId yet. Will retry when user logs in...");
      return;
    }

    const socket = initSocket();
    if (!socket) {
      console.error(" Socket not initialized.");
      return;
    }


    socket.on("notification", (data: { message: string }) => {
      console.log("📩 Notification received:", data);
      setNotifications((prev) => [data.message, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const clearNotifications = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, clearNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used inside NotificationProvider");
  return context;
};
