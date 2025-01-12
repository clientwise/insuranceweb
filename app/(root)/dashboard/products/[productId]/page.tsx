"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import router from "next/router";

export default function ProductPage() {

 
  
  const params = useParams();
  const productId = params.productId as string;
  const agency_id = localStorage.getItem("agency_id");
  const authToken = localStorage.getItem("authToken");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(authToken){
      if(authToken==null){

      router.replace("/");}
    }
    const fetchProductDetails = async () => {
      if (productId && agency_id) {
        // Check if productId and agencyId are available
        setIsLoading(true);

        try {
          const response = await fetch(
            `https://staging.api.mypolicymate.in/api/products-detail/${agency_id}/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`, // Add the Authorization header
              },
            }
          );
          console.log(response, "response on product detail");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setProduct(data.products[0]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProductDetails(); // Call the function immediately
  }, [productId, agency_id, authToken]); // Include yourAuthToken in the dependency array

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div
          className="flex justify-between items-center"
          style={{ width: "100%" }}
        >
          {" "}
          {/* Add flex container */}
          <div>
            <p className="text-2xl font-normal font-rubik text-black ">
              {product.insurer_name}- {product.name}
            </p>
            <span>
              <div className="flex">
                <p className="text-sm font-base font-rubik text-black mt-2">
                  {product.category}
                </p>
                <p className="text-sm font-base font-rubik text-black mt-2 ml-4">
                  {" "}
                  {/* Add margin-left */}
                  Product ID: {product.product_id}
                </p>
              </div>

              <span className="text-sm font-base font-rubik text-black mt-2">
                Start Date : {product.policy_state_date}
              </span>
            </span>
          </div>
          <div
            style={{
              backgroundImage:
                "linear-gradient(to right, #683FDB 0%, #A05AD8 100%)",
              width: "15%",
              color: "white",
              textAlign: "center",
              borderRadius: "10px",
            }}
          >
            <h1 className="text-lg font-base font-rubik text-white mt-2 ">
              91.5%
            </h1>
            <p className="text-sm font-base font-rubik text-white mb-2">
              Settlement Ratio
            </p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-green-500 font-bold text-xl">
          <p className="text-lg font-normal font-rubik text-black  mt-2 mb-2">
            About this Policy
          </p>

          <p className="text-sm font-normal font-rubik text-black">
            {" "}
            {product.description}
          </p>
        </div>
      </div>

      <div className="mb-6"></div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-normal font-rubik text-black  mt-2 mb-2">
            Policy Sales Brochure
          </h2>

          <a
            href={product.policy_sales_brochure}
            className="text-blue-500 mb-3"
          >
            Link
          </a>
          <h2 className="text-lg font-normal font-rubik text-black  mt-2 mb-2">
            Network Hospital
          </h2>
          <a href={"/dashboard"} className="text-blue-500 mb-3">
            Link
          </a>
        </div>
        <div>
          <h2 className="text-lg font-normal font-rubik text-black  mt-2 mb-2">
            Policy Wording
          </h2>
          <a href={product.policy_document} className="text-blue-500 mb-3">
            Link
          </a>
          <h2 className="text-lg font-normal font-rubik text-black  mt-2 mb-2">
            Cooling Period
          </h2>
          <a href={"/dashboard"} className="text-blue-500 mb-3">
            Link
          </a>
        </div>
        <div>
          <h2 className="text-lg font-normal font-rubik text-black  mt-2 mb-2">
            Claim Form
          </h2>
          <a href={"/dashboard"} className="text-blue-500 mb-3">
            Link
          </a>
          <div></div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-base  font-rubik text-black mt-2 mb-2">
          Policy Pros
        </h2>
        <p className="text-sm font-normal font-rubik text-black">
          hi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2 className="text-lg font-base  font-rubik text-black mt-2 mb-2">
          Policy Cons
        </h2>
        <p className="text-sm font-normal font-rubik text-black">
          Hi Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
