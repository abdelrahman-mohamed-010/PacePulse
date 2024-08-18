import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Product } from "../Fields/fields";

const ProductIt: React.FC<{ product: Product }> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link
      className="group relative cursor-pointer"
      to={`/product/${product.id}`}
    >
      <div
        className={`relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          alt={""}
          src={`${
            import.meta.env.VITE_API_UP_URL +
            product.attributes.img.data.attributes.url
          }`}
          className={`h-full w-full object-cover object-top lg:h-full lg:w-full opacity-100 group-hover:opacity-0 ${
            imageLoaded ? "" : "hidden"
          }`}
          onLoad={handleImageLoad}
        />
        <img
          alt={""}
          src={
            import.meta.env.VITE_API_UP_URL +
            product.attributes.img2.data.attributes.url
          }
          className={`h-full w-full object-cover object-top lg:h-full lg:w-full absolute top-0 opacity-0 group-hover:opacity-100 ${
            imageLoaded ? "" : "hidden"
          }`}
        />
        {product.attributes.type === "featured" ? (
          <div className="absolute p-1 pb-[6px] top-0 right-0 m-1 text-white bg-rose-600 z-10 rounded font-medium text-xs opacity-0 group-hover:opacity-100 tracking-wide">
            featured
          </div>
        ) : product.attributes.type === "trending" ? (
          <div className="absolute p-1 pb-[5px] top-0 right-0 m-1 text-white bg-rose-600 z-10 rounded font-medium text-xs opacity-0 group-hover:opacity-100 tracking-wide">
            trending
          </div>
        ) : (
          ""
        )}
      </div>
      {imageLoaded && isVisible && (
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700 mr-2 max-sm:text-xs">
              {product.attributes.title}
            </h3>
          </div>
          <div className="flex items-center align-middle">
            {product.attributes.onSale ? (
              <>
                <p className="text-xs font-medium text-red-600 line-through mr-1">
                  ${product.attributes.price.toFixed(2)}
                </p>
                <p className="text-xs font-bold text-gray-900">
                  ${product.attributes.salePrice.toFixed(2)}
                </p>
              </>
            ) : (
              <p className="text-xs font-bold text-gray-900">
                ${product.attributes.price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProductIt;
