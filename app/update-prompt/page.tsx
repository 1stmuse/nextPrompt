"use client";

import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

export type POST = {
  prompt: string;
  tag: string;
};

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, SetPost] = useState<POST>({
    prompt: "",
    tag: "",
  });
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    console.log(post, "the post befire anything");

    if (!promptId) return alert("Missing Prompt ID");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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

  useEffect(() => {
    const getPromotDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      SetPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromotDetails();
    }
  }, [promptId]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={SetPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
