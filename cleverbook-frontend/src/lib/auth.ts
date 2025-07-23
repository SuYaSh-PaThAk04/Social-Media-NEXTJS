import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: string;
  email?: string;
  iat?: number;
  exp?: number;
}

export function getUserIdFromToken(): string | null {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.id || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
