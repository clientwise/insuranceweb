"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProductDetailsPageProps {
    productId: string;
    agencyId: string;
  }
export default function ProductDetailsPage() {
  const router = useRouter();
  const productId = router.query.productId; 
  const agencyId = router.query.agencyId; // Assuming you also have agencyId in the route

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://staging.api.mypolicymate.in/api/products-detail/${productId}/${agencyId}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error); 
      } finally {
        setIsLoading(false);
      }
    };

    if (productId && agencyId) { 
      fetchProductDetails();
    }
  }, [productId, agencyId]); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Product Details</h1>
      {/* Render product details here using the 'product' state */}
      <p>Product ID: {product.id}</p> 
      {/* ... other product details */}
    </div>
  );
}