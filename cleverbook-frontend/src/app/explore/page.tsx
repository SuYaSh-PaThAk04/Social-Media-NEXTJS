"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Post {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  author: {
    username: string;
    email: string;
  };
}

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in to view posts");
          return;
        }

        const profileRes = await axios.get("https://social-media-nextjs.onrender.com/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userId = profileRes.data._id;

        const res = await axios.get(
          `https://social-media-nextjs.onrender.com/posts/following?userId=${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPosts(res.data.posts);
      } catch (err) {
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts from followed users yet.</p>
      ) : (
        posts.map((post) => (
          <Card key={post._id} className="bg-white rounded-xl shadow-md border p-4">
   
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback>
                  {post.author?.username ? post.author.username[0].toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-800">{post.author?.username || "Unknown"}</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>
              <p className="text-gray-700">{post.description}</p>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
