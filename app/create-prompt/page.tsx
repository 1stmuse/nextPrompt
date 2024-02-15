"use client";

import { FormEvent, FormEventHandler, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

export type POST = {
  prompt: string;
  tag: string;
};

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, SetPost] = useState<POST>({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();
  const router = useRouter();

  const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(post, "the post befire anything");

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={SetPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
