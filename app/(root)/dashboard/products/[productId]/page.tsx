"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = params.productId as string;
  const agencyId = params.agencyId as string;

  const [product, setProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId && agencyId) { // Check if productId and agencyId are available
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `https://staging.api.mypolicymate.in/api/products-detail/${productId}/2`,
            {
              headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0`, 
              },
            }
          );
          console.log(response,"response");
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setProduct(data);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchProductDetails(); // Call the function immediately
  }, [productId, agencyId, "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZ2VuY3lfaWQiOjIsImFnZW5jeV9uYW1lIjoiIiwiZW1haWwiOiJnZXRjbGllbnR3aXNlQGdtYWlsLmNvbSIsImV4cCI6MTczNzkwOTczMywiaWQiOjE0LCJtb2JpbGUiOiIiLCJuYW1lIjoiIn0.XeM84bJ63ljbASCOdEnvSquiO13Qojp4WrJa1sTQnh0"]); // Include yourAuthToken in the dependency array

  if (isLoading) return <div>Loang...</div>;

  return (
    <div>
      {/* ... your JSX ... */}
    </div>
  );
}