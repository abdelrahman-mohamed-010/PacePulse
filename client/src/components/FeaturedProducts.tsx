import React, { useEffect, useState } from "react";
import { Product } from "../Fields/fields";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import FeaturesProduct from "./FeaturesProduct";
const FeaturedProducts: React.FC<{ type: string }> = ({ type }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/products?populate=*&filters[type][$eq]=${type.toLowerCase()}&pagination[limit]=4`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_URL_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchFeaturedProducts();
  }, [type]);



  return (
    <div className="mx-auto px-6 py-4 mt-8">
      <div className=" mb-6 flex justify-between text-lg font-semibold tracking-wide items-center">
        <div className="font-bold text-3xl ">{type} products</div>
        <Link
          to={`/${
            type === "Featured" ? "featured" : "trending"
          }`}
          className=" cursor-pointer hover:mr-3 transition-all duration-150 max-md:hidden"
        >
          See everything
          <ArrowForwardIcon fontSize="medium" className=" ml-2" />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {products &&
          products.map((product) => (
            <FeaturesProduct product={product} key={product.id} />
          ))}
      </div>
      <Link
        to={`/${type === "Featured" ? "featured" : "trending"}`}
        className=" cursor-pointer hover:mr-3 transition-all duration-150 md:hidden mt-8 w-full text-end block"
      >
        See everything
        <ArrowForwardIcon fontSize="medium" className=" ml-2" />
      </Link>
    </div>
  );
};

export default FeaturedProducts;
