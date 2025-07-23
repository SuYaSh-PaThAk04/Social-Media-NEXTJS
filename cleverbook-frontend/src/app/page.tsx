"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function HomePage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in first");
          return;
        }

        const res = await axios.get("http://localhost:3000/users/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profileRes = await axios.get("http://localhost:3000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const followingIds = new Set(profileRes.data.following || []);
        setFollowedUsers(new Set(Array.from(followingIds) as string[]));
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users", err);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleFollow = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/users/follow/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFollowedUsers((prev) => new Set(prev).add(id));
      toast.success("Followed successfully!");
    } catch (err) {
      toast.error("Failed to follow user");
    }
  };

  const handleUnfollow = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:3000/users/unfollow/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFollowedUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
      toast.success("Unfollowed successfully!");
    } catch (err) {
      toast.error("Failed to unfollow user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        users.map((user) => {
          const isFollowed = followedUsers.has(user._id);
          return (
            <Card key={user._id} className="shadow-lg border rounded-xl p-4">
              <CardHeader>
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => handleFollow(user._id)}
                    disabled={isFollowed}
                  >
                    {isFollowed ? "Following" : "Follow"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleUnfollow(user._id)}
                    disabled={!isFollowed}
                  >
                    Unfollow
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
}
