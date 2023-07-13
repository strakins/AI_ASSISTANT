"use client"

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [posts, setPosts] = useState([]);

  const filterPrompts = (searchtext) => {
    const content = new RegExp(searchtext, "i");
    return posts.filter(
      (item) => 
        content.test(item.creator.username) || content.test(item.tag) || content.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);


    setSearchTimeout(
      setTimeout(() => {
        const searchOutput = filterPrompts(e.target.value);
        setSearchResults(searchOutput);
      }, 1000)
    );
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data)
    }

    fetchPosts();
  }, [])

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  };

  return (
    <section className="mt-5">
      <form className="relative w-full flex-center">
        <input 
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
        />
      </form>

      {
        searchText ? 
        <PromptCardList 
          data={searchResults}
          handleTagClick={handleTagClick}
        /> 
        :
        <PromptCardList 
          data={posts}
          handleTagClick={handleTagClick}
        />
      }
    </section>
  )
}

export default Feed