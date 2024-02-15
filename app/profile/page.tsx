"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileComp from "@components/Profile";

const Profile = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState([]);
  const router = useRouter();

  const handleEdit = (data: any) => {
    router.push(`/update-prompt?id=${data._id}`);
  };

  const handleDelete = async (data: any) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${data._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const filteredPost = post.filter((p) => p._id !== data?._id);
          setPost(filteredPost);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const feetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/post`);
      const data = await response.json();
      setPost(data);
      // console.log(data, "the data reponse from profile");
    };

    if (session?.user?.id) {
      feetchPost();
    }
  }, []);

  return (
    <ProfileComp
      name="My"
      desc="Welcome to your personalized profile page"
      data={post}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
