"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/profile";

const UserProfile = () => {

  const { data: session } = useSession();
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data)
    }

    if(session?.user.id) fetchPosts();
  }, [])


  const handleEdit = () => {
    
  };

  const handleDelete = async () => {

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