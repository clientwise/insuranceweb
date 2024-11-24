import React from "react";
import Image from "next/image"; // Importing the Image component
import { MarketingContent } from "../../../types";
import { ArrowDownToLine, ExternalLink } from "lucide-react";

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
          <div className=" absolute bottom-0 left-0 w-full p-4">
            <div className="flex flex-row justify-end gap-2">
              <a className="text-sm font-light font-rubik text-black mr-2 ">
                <ArrowDownToLine />
              </a>
              <ExternalLink />
            </div>
          </div>
        </div>
        <div>
          <p className="text-textBase text-base leading-5 font-normal text-justify font-rubik mb-2">
            {blog.content_subheader}
          </p>
          <div className="flex flex-row justify-start items-center mb-2">
            <p className="text-black font-light text-xs font-rubik">
              Added on: 18 May 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
