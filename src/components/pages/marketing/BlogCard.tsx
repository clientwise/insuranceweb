import React from "react";
import { Article } from "../../../types";
import { Colors } from "../../../assets/colors";

interface Props {
  blog: Article;
}
/* eslint-disable */
const BlogCard = ({ blog }: Props) => {
  return (
    <div className="flex justify-center ">
      <div className="text-zinc-800 relative mb-4 px rounded-md w-[100%] ">
        <div
          style={{ width: "100%", height: "200px" }}
          className="mb-4 rounded-md overflow-hidden"
        >
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-row justify-start items-center px-2 mb-2">
          <p className="text-black font-light text-sm font-rubik">
            {blog?.author}
          </p>
          <p className="text-black font-light text-xs font-rubik ml-4">
            {blog?.createdAt}
          </p>
        </div>
        <p className="text-black px-2 text-xl font-rubik font-medium mb-2">
          <p>{blog?.title}</p>
        </p>
        <p className="text-black text-base px-2 leading-5 font-light text-justify font-rubik w-[80%]">
          <p>{blog?.description}</p>
        </p>
        <p
          style={{ offsetPosition: "normal", color: Colors.textLink }}
          className="px-2 mt-2 underline font-rubik font-normal text-base"
        >
          Read more
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
