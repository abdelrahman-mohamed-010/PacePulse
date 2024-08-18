import React, { useState, useEffect, useMemo } from "react";
import ProductIt from "../components/Product";
import { Product, ProductGridProps } from "../Fields/fields";

// Simple cache implementation until converting fetching method to react query
const cache = new Map<string, Product[]>();

const ProductGrid: React.FC<ProductGridProps> = ({
  type,
  filterState,
  token,
  splitgrid,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const url = useMemo(() => {
    return (
      `${import.meta.env.VITE_API_URL}/products?populate=*` +
      (type === "women" || filterState.selectedGendres === "2"
        ? `&filters[categories][id][$eq]=2`
        : type === "men" || filterState.selectedGendres === "1"
        ? `&filters[categories][id][$eq]=1`
        : `&filters[categories][id][$eq]=1&filters[categories][id][$eq]=2`) +
      `${
        type === "sale"
          ? `&filters[onSale][$eq]=true`
          : `&filters[onSale][$eq]=false`
      }` +
      `${
        type === "trending" || type === "featured"
          ? `&filters[type][$eq]=${type}`
          : ""
      }` +
      `${
        filterState.selectedCategories.length > 0
          ? `&${filterState.selectedCategories
              .map((item) => `[filters][sub_categories][id][$eq]=${item}`)
              .join("&")}`
          : ""
      }` +
      `${
        filterState.selectedSort === "Price: Low to High"
          ? `&sort=${type === "sale" ? "salePrice" : "price"}:asc`
          : filterState.selectedSort === "Price: High to Low"
          ? `&sort=${type === "sale" ? "salePrice" : "price"}:desc`
          : filterState.selectedSort === "Newest"
          ? `&sort=createdAt:desc`
          : ""
      }`
    );
  }, [type, filterState]);

  useEffect(() => {
    const fetchProducts = async () => {
      // Simple cache implementation until converting fetching method to react query
      if (cache.has(url)) {
        setProducts(cache.get(url)!);
        return;
      }

      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data.data);
        cache.set(url, data.data);
      } catch (err) {
        console.error("Caught an error:", err);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, token]);

  return (
    <div className="w-full relative">
      <div
        className={`grid ${
          !splitgrid ? "grid-cols-2" : "grid-cols-1"
        } gap-x-6 gap-y-10 lg:grid-cols-4 xl:gap-x-8`}
      >
        {products.map((product) => (
          <ProductIt key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
