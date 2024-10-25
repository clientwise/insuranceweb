import React from "react";
import BlogCard from "./BlogCard";

export type Article = {
  author: string;
  content: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  metadata: string;
  slug: string;
  title: string;
  updatedAt: string;
};

const dummyBlogs: Article[] = [
  {
    author: "Jane Doe",
    content: "This is a sample blog content.",
    createdAt: "2023-10-01T12:00:00Z",
    description: "A brief description of the first blog.",
    id: "1",
    image:
      "https://thecontentpanel.com/wp-content/uploads/2020/05/finance-plan-img-feat-1024x576.jpg",
    metadata: "Sample metadata",
    slug: "sample-blog-1",
    title: "Sample Blog 1",
    updatedAt: "2023-10-02T12:00:00Z",
  },
  {
    author: "John Smith",
    content: "This is another sample blog content.",
    createdAt: "2023-10-05T12:00:00Z",
    description: "A brief description of the second blog.",
    id: "2",
    image:
      "https://www.niveshninja.com/wp-content/uploads/2023/12/personal-finance-blogs-india.jpeg",
    metadata: "Sample metadata",
    slug: "sample-blog-2",
    title: "Sample Blog 2",
    updatedAt: "2023-10-06T12:00:00Z",
  },
  {
    author: "Alice Johnson",
    content: "Yet another sample blog content.",
    createdAt: "2023-10-10T12:00:00Z",
    description: "A brief description of the third blog.",
    id: "3",
    image:
      "https://s3-us-west-2.amazonaws.com/thinksaveretire.com/content/images/2020/05/Computer-2.jpg",
    metadata: "Sample metadata",
    slug: "sample-blog-3",
    title: "Sample Blog 3",
    updatedAt: "2023-10-11T12:00:00Z",
  },
  {
    author: "Mark Brown",
    content: "Exploring the world of personal finance.",
    createdAt: "2023-10-12T12:00:00Z",
    description: "An insightful look into personal finance.",
    id: "4",
    image:
      "https://www.careinsurance.com/upload_master/media/posts/June2020/jdgXCv2d9fBDcQALSNYW.jpg",
    metadata: "Sample metadata",
    slug: "sample-blog-4",
    title: "Sample Blog 4",
    updatedAt: "2023-10-13T12:00:00Z",
  },
  {
    author: "Emma Wilson",
    content: "Tips for budgeting effectively.",
    createdAt: "2023-10-15T12:00:00Z",
    description: "Budgeting tips for financial success.",
    id: "5",
    image:
      "https://www.paisabazaar.com/wp-content/uploads/2018/08/Gold-Investments.jpg",
    metadata: "Sample metadata",
    slug: "sample-blog-5",
    title: "Sample Blog 5",
    updatedAt: "2023-10-16T12:00:00Z",
  },
  {
    author: "Liam Johnson",
    content: "Investing for beginners.",
    createdAt: "2023-10-18T12:00:00Z",
    description: "A beginner's guide to investing.",
    id: "6",
    image:
      "https://cdn.corporatefinanceinstitute.com/assets/investment-value.jpeg",
    metadata: "Sample metadata",
    slug: "sample-blog-6",
    title: "Sample Blog 6",
    updatedAt: "2023-10-19T12:00:00Z",
  },
  {
    author: "Sophia Martinez",
    content: "Understanding credit scores.",
    createdAt: "2023-10-20T12:00:00Z",
    description: "All about credit scores and how to improve them.",
    id: "7",
    image:
      "https://www.lumina.com.ph/assets/news-and-blogs-photos/Investment-vs-Savings-Which-One-Has-a-Better-Return/Investment-vs.-Savings-Which-One-Has-a-Better-Return_.webp",
    metadata: "Sample metadata",
    slug: "sample-blog-7",
    title: "Sample Blog 7",
    updatedAt: "2023-10-21T12:00:00Z",
  },
  {
    author: "Noah Davis",
    content: "Retirement planning strategies.",
    createdAt: "2023-10-22T12:00:00Z",
    description: "Effective strategies for planning your retirement.",
    id: "8",
    image:
      "https://cdn-scripbox-wordpress.scripbox.com/wp-content/uploads/2021/06/investment-vector.png",
    metadata: "Sample metadata",
    slug: "sample-blog-8",
    title: "Sample Blog 8",
    updatedAt: "2023-10-23T12:00:00Z",
  },
  {
    author: "Olivia Garcia",
    content: "How to save for a house.",
    createdAt: "2023-10-24T12:00:00Z",
    description: "Practical tips for saving to buy a home.",
    id: "9",
    image:
      "https://www.tataaia.com/content/dam/tataaialifeinsurancecompanylimited/blogs/investment-planning/5-important-steps-of-the-investment-process/Investment-Process-Desktop.jpg",
    metadata: "Sample metadata",
    slug: "sample-blog-9",
    title: "Sample Blog 9",
    updatedAt: "2023-10-25T12:00:00Z",
  },
  {
    author: "Ava Rodriguez",
    content: "Managing debt effectively.",
    createdAt: "2023-10-26T12:00:00Z",
    description: "Strategies for managing and reducing debt.",
    id: "10",
    image:
      "https://cms-aws-s3-images-bucket-prod.s3.ap-south-1.amazonaws.com/Artboard_4_24_1a7e282598.jpg",
    metadata: "Sample metadata",
    slug: "sample-blog-10",
    title: "Sample Blog 10",
    updatedAt: "2023-10-27T12:00:00Z",
  },
  {
    author: "Elijah Wilson",
    content: "Tax tips for freelancers.",
    createdAt: "2023-10-28T12:00:00Z",
    description: "Essential tax tips for self-employed individuals.",
    id: "11",
    image:
      "https://media.istockphoto.com/id/1453953453/photo/strategy-of-diversified-investment.jpg?s=612x612&w=0&k=20&c=GdKGA5EuK0QfKm76ExjkK64iPZLuTUOyIDQlXs-ZRQM=",
    metadata: "Sample metadata",
    slug: "sample-blog-11",
    title: "Sample Blog 11",
    updatedAt: "2023-10-29T12:00:00Z",
  },
  {
    author: "Isabella Lee",
    content: "Financial planning for families.",
    createdAt: "2023-10-30T12:00:00Z",
    description: "How to plan financially for your family's future.",
    id: "12",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeTwBDN3u8fmwvte1KE0BKoLKM_Boa_rm4bAKWXus1H0eA92zih1igMrbTyF5KRdOObY&usqp=CAU",
    metadata: "Sample metadata",
    slug: "sample-blog-12",
    title: "Sample Blog 12",
    updatedAt: "2023-10-31T12:00:00Z",
  },
];

const PromotionalItems = () => {
  const [blogs, setBlogs] = React.useState<Article[]>(dummyBlogs); // Initialize state with dummy data

  return (
    <div>
      <div className=" grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {blogs?.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default PromotionalItems;
