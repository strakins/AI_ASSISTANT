"use client";
import { FaCopy, FaClipboardCheck } from 'react-icons/fa';
// import { HiDocumentCheck } from 'react-icons/hi';
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";


const PromptCard = ({ post, handleTagCLick, handleEdit, handleDelete }) => {

  const {data : session} = useSession();
  const [copied, setCopied ] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  console.log(post.creator)
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
           />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-slate-800">
              {post.creator.username}
            </h3>
            <p className="font-inter text-xs text-slate-900">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn text-md" onClick={handleCopy} >
          {copied ? < FaClipboardCheck /> : < FaCopy />}
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-slate-900'>{post.prompt}</p>
      <p 
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleCLick && handleTagCLick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='w-full flex-center gap-4 mt-4 border-t pt-3'>
          <p
            className='font-inter text-sm  green_gradient cursor-pointer'
            onClick={handleEdit}
          >Edit</p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard