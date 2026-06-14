"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  TrendingUp,
  Trophy,
  Megaphone,
  Plus,
} from "lucide-react";
import { supabase } from "../../lib/supabase";


export default function ExplorePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("search");
  const [caption, setCaption] = useState("");
  const [postType, setPostType] = useState("default");
  const [media, setMedia] = useState<File | null>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [likedPosts, setLinkedPosts] = useState<string[]>([]);

  const tabs = [
    {
      id: "search",
      icon: Search,
      label: "Search",
    },
    {
      id: "trending",
      icon: TrendingUp,
      label: "Trending",
    },
    {
      id: "winners",
      icon: Trophy,
      label: "Winners",
    },
    {
      id: "announcements",
      icon: Megaphone,
      label: "Announcements",
    },
    {
      id: "upload",
      icon: Plus,
      label: "Upload",
    },
  ];

  async function loadPosts() {
      const { data, error } = await supabase
        .from("feed_posts")
        .select("*")
        .order("created_at", { ascending: false});

      if(!error && data) {
        setPosts(data);
      }
    }

  useEffect(() => {
    loadPosts()
  }, []);

  async function uploadPost() {
    if(!media){
      alert("Please select an image or video");
      return;
    }
    const { data: authData } = await supabase.auth.getUser();

    if(!authData.user){
      alert("please Login First");
      return;
    }

    const fileName = `${Date.now()}-${media.name}`;

    const { error: uploadError } = await supabase.storage
      .from("feed-media")
      .upload(fileName, media);
    if(uploadError) {
      alert(uploadError.message);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("feed-media")
      .getPublicUrl(fileName);

    const mediaUrl = publicData.publicUrl;

    const mediaType = media.type.startsWith("video")
      ? "video"
      : "image";

    const { error } = await supabase
      .from("feed_posts")
      .insert([
        {
          user_email: authData.user.email,
          caption,
          image_url: mediaUrl,
          media_type: mediaType,
          post_type: postType,
        },
      ]);

    if(error){
      alert(error.message);
      return;
    }
    alert("Post uploaded Successfully");

    setCaption("");
    setMedia(null);
    setPostType("default");
  }

  async function toggleLike(postId: string, currentLikes: number) {
    const { data: authData } = await supabase.auth.getUser();

    if (!authData.user) {
      alert("Please login first");
      return;
    }

    const userEmail = authData.user.email;

    const { data: existingLike } = await supabase
      .from("post_likes")
      .select("*")
      .eq("post_id", postId)
      .eq("user_email", userEmail)
      .maybeSingle();

    if (existingLike) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_email", userEmail);

      await supabase
        .from("feed_posts")
        .update({
          likes: Math.max(currentLikes - 1, 0),
        })
        .eq("id", postId);
    } else {
      await supabase
        .from("post_likes")
        .insert([
          {
            post_id: postId,
            user_email: userEmail,
          },
        ]);

      await supabase
        .from("feed_posts")
        .update({
          likes: currentLikes + 1,
        })
        .eq("id", postId);
    }

    loadPosts();
  }

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white px-6 py-32">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => router.back()}
          className="
            mb-8
            px-4
            py-2
            rounded-full
            border
            border-white/10
            bg-[#1a1a1a]
            hover:bg-[#242424]
            transition
          "
        >
          ← Back
        </button>

        <div className="flex md:justify-end justify-start gap-4 overflow-x-auto pb-3 w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  shrink-0
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-[#1a1a1a]
                  px-4
                  py-3
                  transition-all
                  duration-300
                  ${
                    active
                      ? "w-56 md:w-72 justify-start"
                      : "w-16 justify-center"
                  }
                `}
              >
                <Icon size={28} />

                <span
                  className={`
                    whitespace-nowrap
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                      active
                        ? "opacity-100"
                        : "opacity-0 w-0"
                    }
                  `}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
        <div className = "mt-12">
          {activeTab === "search" && (
            <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">
              <h2 className = "text-3xl font-bold mb-4">Explore</h2>
              {activeTab === "search" && (
                <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">
                  <h2 className = "text-3xl font-bold mb-6">Explore</h2>
                  <div className = "grid gap-6">
                    {posts.map((post) => (
                      <div key = {post.id} className = "bg-[#242424] border border-white/10 rounded-3xl overflow-hidden">
                        <div className = "p-5">
                          <p className = "font-semibold">{post.profile_name || post.user_email}</p>
                          <p className = "text-sm text-[#8a8a8a] mt-1">{new Date(post.created_at).toLocaleDateString()}</p>
                          <p className = "mt-4">{post.caption}</p>
                          <div className = "mt-4">
                            <button onClick = {() => toggleLike(post.id, post.likes || 0)} className = "text-white hover:scale-110 transition">❤️{post.likes|| 0}</button>
                            </div>
                          </div>
                          {post.media_type === "image" ? (
                            <img src = {post.image_url} alt = "" className = "w-full max-h-150 object-cover"/>
                          ): (
                            <video src = {post.image_url} controls className = "w-full"/>
                          )}
                          </div>
                    ))}
                    </div>
                    </div>
              )}
            </div>
          )}
          {activeTab === "trending" && (
            <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">Trending</div>
          )}
          {activeTab === "winners" && (
            <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">Winners</div>
          )}
          {activeTab === "announcements" && (
            <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">Announcements</div>
          )}
          {activeTab === "upload" && (
            <div className = "bg-[#1a1a1a] border border-white/10 rounded-3xl p-8">
              <h2 className = "text-3xl font-bold mb-6">Upload Post</h2>
              <textarea placeholder = "Write a caption..." value = {caption} onChange = {(e) => setCaption(e.target.value)} rows = {4} className = "w-full bg-[#242424] border border-white/10 rounded-2xl p-4 mb-4"/>
                <select value = {postType} onChange = {(e) => setPostType(e.target.value)} className = "w-full bg-[#242424] border border-white/10 rounded-2xl p-4 mb-4">
                  <option value = "default">Default Post</option>
                  <option value = "announcement">Announcement</option>
                  <option value = "winner">Winner</option>
                </select>
                <input type = "file" accept = "image/*,video/*" onChange = {(e) => {
                  if (e.target.files?.[0]){
                    setMedia(e.target.files[0]);
                  }
                }}
                className = "w-full bg-[#242424] border border-white/10 rounded-2xl p-4 mb-4"/>
                <button onClick = {uploadPost} className = "bg-white text-black px-6 py-3 rounded-full font-semibold">Upload</button>
                </div>
          )}
        </div>
      </div>
    </main>
  );
}