import React from "react";
import Image from "next/image";
import { MarketingContent } from "../../../types";
import { ArrowDownToLine, ExternalLink } from "lucide-react";

import Logo3 from "@/src/assets/video_placeholder.jpg";

interface Props {
  blog: MarketingContent;
  
  onImageClick: (content_file_url: string) => void;
}

const BlogCard = ({ blog, onImageClick }: Props) => {
  const handleImageClick = () => {
    if (blog?.content_file_url) {
      onImageClick(blog.content_file_url);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="text-zinc-800 relative mb-4 px-4 rounded-md w-full max-w-[350px]">
        <div className="relative mb-4 rounded-md border overflow-hidden h-[200px]">
          <Image
            src={blog.content_type=="Image"  ? blog.content_file_url : Logo3}
            alt={blog.content_header || "Blog image"}
            layout="fill"
            objectFit="cover"
            quality={75}
            priority
          />
          <div className="absolute bottom-0 left-0 w-full p-1">
            <div className="flex flex-row justify-end gap-2">
              <a
                onClick={handleImageClick}
                className="text-sm font-light font-rubik text-white mr-2 bg-stone-900 p-2 rounded-lg flex items-center justify-center opacity-60 cursor-pointer"
              >
                <ArrowDownToLine size={20} className="text-white" />
              </a>
              <a
                href={blog.content_file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light font-rubik text-white mr-2 bg-stone-900 p-2 rounded-lg flex items-center justify-center opacity-60 cursor-pointer"
              >
                <ExternalLink size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <p className="text-textBase text-base leading-5 font-normal text-justify font-rubik mb-2">
            {blog.content_subheader}
          </p>
          <div className="flex flex-row justify-start items-center mb-2">
            <p className="text-black font-light text-xs font-rubik">
      Content Type: {blog.content_type}
            </p>
          </div>

          <div className="flex flex-row justify-start items-center mb-2">
            <p className="text-black font-light text-xs font-rubik">
      Language: {blog.language}
            </p>
            <p className="text-black font-light text-xs font-rubik ml-1">
           Product: {blog.product_type}
            </p>
          </div>        </div>
      </div>
    </div>
  );
};

export default BlogCard;
