import React from "react";
import Image from "next/image"; // Importing the Image component
import { MarketingContent } from "../../../types";
import { Colors } from "../../../assets/colors";

interface Props {
  blog: MarketingContent;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <div className="flex justify-center">
      <div className="text-zinc-800 relative mb-4 px-4 rounded-md w-full max-w-[350px]">
        <div className="relative mb-4 rounded-md border overflow-hidden h-[200px]">
          <Image
            src={blog.content_url}
            alt={blog.content_header}
            layout="fill"
            objectFit="cover"
            quality={75}
            priority
          />
        </div>
        <div className="px-2">
          <p className="text-tableHeaderColor text-xl font-rubik font-medium mb-2">
            {blog.content_header}
          </p>
          <p className="text-black text-base leading-5 font-light text-justify font-rubik mb-4">
            {blog.content_subheader}
          </p>
          <div className="flex flex-row justify-start items-center mb-2">
            <p className="text-black font-light text-sm font-rubik">
              {blog.content_category}
            </p>
            <p className="text-black font-light text-xs font-rubik ml-4">
              {blog.language}
            </p>
          </div>

          <p
            style={{ color: Colors.textLink }}
            className="underline text-base font-rubik font-normal cursor-pointer"
          >
            Read more
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
