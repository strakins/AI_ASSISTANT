"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const UserProfile = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  
  const router = useRouter();
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data)
    }

    if(session?.user.id) fetchPosts();
  }, [])


  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {

  };


  return (
    <Profile 
      name="My"
      desc="Welcome to your Personalized Profile Page"
      data={posts}
      handleEdit={handleEdit}
      handdleDelete={handleDelete}
    />
  )
}

export default UserProfile;