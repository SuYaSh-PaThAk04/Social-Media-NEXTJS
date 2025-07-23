"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () => {
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to create a post");
        return;
      }

      await axios.post(
        "http://localhost:3000/posts/create",
        { title, description },
          {
         headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, 
  },
        }
      );

      toast.success("Post created successfully!");
      setTitle("");
      setDescription("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <Card className="w-full max-w-xl shadow-lg border bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-indigo-700">
            Create a New Post ✍️
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              onClick={handleCreatePost}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
