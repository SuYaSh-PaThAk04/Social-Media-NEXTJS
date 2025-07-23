"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }


        const profileRes = await fetch("https://social-media-nextjs.onrender.com/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!profileRes.ok) throw new Error("Failed to fetch profile");

        const profileData = await profileRes.json();
        console.log("Profile Data:", profileData);
        setProfile(profileData);


        const postsRes = await fetch(
          `https://social-media-nextjs.onrender.com/posts/my-posts?userId=${profileData._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!postsRes.ok) throw new Error("Failed to fetch posts");

        const postsData = await postsRes.json();
        console.log("Posts Data:", postsData);
        setPosts(postsData.posts || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, []);

  if (loading) return <div>Loading profile...</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>Profile</h1>
      <p><strong>Name:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontSize: "24px" }}>My Posts</h2>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li
              key={post._id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <small>
                Created at: {new Date(post.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts yet.</p>
      )}
    </div>
  );
}
