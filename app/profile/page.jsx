"use client"

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from "@components/profile";

const Profile = () => {

  const handleEdit = () => {

  };

  const handleDelete = async () => {

  };


  return (
    <Profile 
      name="My"
      desc="Welcome to your Personalized Profile Page"
      data={[]}
      handleEdit={handleEdit}
      handdleDelete={handleDelete}
    />
  )
}

export default Profile