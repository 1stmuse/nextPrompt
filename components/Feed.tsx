"use client";

import { useState, useEffect, FormEvent } from "react";

import PromptCard from "./PromptCard";

interface PromptList {
  data: any[];
  hangleTagClick: (data: any) => void;
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
}

const PromptCardList = ({
  data,
  hangleTagClick,
  handleDelete,
  handleEdit,
}: PromptList) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((item: any) => (
        <PromptCard
          key={item.id}
          post={item}
          hangleTagClick={() => hangleTagClick(item)}
          handleEdit={() => handleEdit(item)}
          handleDelete={() => handleDelete(item)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const feetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
      console.log(data, "the data reponse");
    };

    feetchPost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={post}
        hangleTagClick={() => {}}
        handleDelete={() => {}}
        handleEdit={() => {}}
      />
    </section>
  );
};

export default Feed;
