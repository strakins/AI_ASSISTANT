"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {

  const { data:session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className='w-full flex-between mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image 
          src='/assets/images/strakins_logo0.png' 
          width={35}
          height={35}
          className='pbject-contain'
        />
        <p className='logo_text'>StrakinsAI</p>
      </Link>

      {/* Desktop Navs */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn' >Create Post</Link>

            <button 
              type='button' 
              onClick={signOut} 
              className='outline_btn'>
                Sign Out
            </button>

            <Link href='/profile'>
              <Image 
                src={session?.user.image}
                className='rounded-full'
                width={37} 
                height={37} 
                alt='profile' />
            </Link>

          </div>
        ): (
          <>
           {providers && 
             Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
            ))}
          </>
        )}
      </div>

    {/* Mobile Navs */}
    <div className='sm:hidden flex relative'>
      {session?.user ? (
        <div className='flex'>
          <Image 
            // src='/assets/images/logo.svg'
            src={session?.user.image}
            className='rounded-full'
            width={30} 
            height={30} 
            alt='profile' 
            onClick={() => setToggleDropDown((prev) => !prev)}  
          />

          {toggleDropDown && 
            <div className='dropdown'>
              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                My Profile
              </Link>
              <Link
                href='/create-prompt'
                className='dropdown_link'
                onClick={() => setToggleDropDown(false)}
              >
                Create Prompt
              </Link>
              <button 
                type='button'
                onClick={() => {
                  setToggleDropDown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'
              >
                Sign Out
              </button>
            </div>
          }   
        </div>
      ) : (
        <>
          {providers && 
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='black_btn'
              >
                Sign In
              </button>
          ))}
        </>
      )}
    </div>
    </nav>
  )
}

export default Navbar