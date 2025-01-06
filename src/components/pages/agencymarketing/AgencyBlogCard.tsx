import React from "react";
import Image from "next/image";
import { AgencyMarketingItemType } from "../../../types";
import { ArrowDownToLine, ExternalLink } from "lucide-react";
import DropdownComponent from "../../common/Dropdown";

interface Props {
  blog: AgencyMarketingItemType;
  onImageClick: (content_url: string) => void;
  onStatusChange: (
    status: string | number,
    blog: AgencyMarketingItemType
  ) => void;
}

const AgencyBlogCard = ({ blog, onImageClick, onStatusChange }: Props) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string | number>(
    blog.status ? blog.status : ""
  );

  const handleImageClick = () => {
    if (blog?.content_url) {
      onImageClick(blog.content_url);
    }
  };

  const handleStatusChange = (selectedKey: string | number) => {
    console.log(selectedKey, "Selected keyt in product dropdown");
    onStatusChange(selectedKey, blog);
    setSelectedStatus(selectedKey);
  };

  return (
    <div className="flex justify-center">
      <div className="text-zinc-800 relative mb-4 px-4 rounded-md w-full max-w-[350px]">
        <div className="relative mb-4 rounded-md border overflow-hidden h-[200px]">
          <Image
            src={blog.content_file_url}
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
                href={blog.content_url}
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
          <div>
            <p className="text-textBase text-base leading-5 font-normal text-justify font-rubik mb-2">
              {blog.content_subheader}
            </p>
            <div className="flex flex-row justify-items-center justify-between">
              <div className="flex flex-row justify-start items-center">
                <p className="text-black font-light text-xs font-rubik">
                  Added on: 18 May 2024
                </p>
              </div>
              <DropdownComponent
                data={[
                  { key: "active", value: "Active" },
                  { key: "inactive", value: "Inactive" },
                ]}
                initialSelectedKey={selectedStatus}
                onSelectionChange={handleStatusChange}
                placeholder="Status"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyBlogCard;
