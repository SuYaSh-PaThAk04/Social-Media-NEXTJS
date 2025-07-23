"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("https://social-media-nextjs.onrender.com/auth/signup", {
        username,
        email,
        password,
      });

      toast.success("Signup successful! Please login.");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <Card className="w-full max-w-md shadow-xl border bg-white animate-fade-in rounded-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-indigo-700">
            Create Account 🎉
          </CardTitle>
          <p className="text-center text-gray-500">Join CleverBook today</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Signing up...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-indigo-600 hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
