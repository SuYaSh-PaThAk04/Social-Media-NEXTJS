import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (): Socket | null => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.warn("⏳ No userId found in localStorage. Skipping socket initialization.");
    return null;
  }

  if (!socket) {
    socket = io("http://localhost:5000", {
      transports: ["websocket"],
      query: { userId },
    });

    socket.on("connect", () => {
      console.log(`✅ Socket connected: ${socket?.id}`);
    });

    socket.on("disconnect", () => {
      console.warn(`❌ Socket disconnected: ${socket?.id}`);
    });
  }

  return socket;
};

export const getSocket = (): Socket | null => socket;
