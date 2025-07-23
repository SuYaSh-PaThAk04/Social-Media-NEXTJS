"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

interface AuthCardProps {
  type: "login" | "signup";
  onSubmit: (data: FormData) => void;
}

export default function AuthCard({ type, onSubmit }: AuthCardProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Card className="w-[380px] bg-white/20 backdrop-blur-lg shadow-2xl border border-white/30">
        <CardHeader>
          <CardTitle className="text-center text-white text-2xl font-bold">
            {type === "login" ? "Welcome Back 👋" : "Create Your Account 🚀"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700 text-white">
              {type === "login" ? "Login" : "Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
