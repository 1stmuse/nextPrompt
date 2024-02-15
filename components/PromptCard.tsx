"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
interface IProps {
  // key
  post: any;
  hangleTagClick?: (data: any) => void;
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
}

const PromptCard = ({
  post,
  hangleTagClick,
  handleDelete,
  handleEdit,
}: IProps) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopy(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            className="rounded-full object-contain"
            src={post.creator?.image}
            alt="user_image"
            height={40}
            width={40}
          />
          <div className="flex flex-col">
            <h3 className="font-semiBold text-gray-900">
              {post.creator?.username}
            </h3>
            <p className="text-sm text-gray-500">{post?.creator?.email}</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copy === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy icon"
            height={12}
            width={12}
          />
        </div>
      </div>
      <p className="my-4 text-sm text-gray-700">{post.prompt}</p>
      <p
        onClick={() => hangleTagClick && hangleTagClick(post.tag)}
        className="text-sm blue_gradient cursor-pointer"
      >
        #{post.tag}
      </p>
      {session?.user?.id === post.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
