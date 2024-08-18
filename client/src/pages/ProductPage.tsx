import React, { useState, useEffect } from "react";
import { Product } from "../Fields/fields";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";

const ProductPage: React.FC = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isProductVisible, setIsProductVisible] = useState<boolean>(false);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/${id}?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_URL_TOKEN}`,
            },
          }
        );

        const data = await response.json();
        setProduct(data.data);
        setSelectedImage(data.data.attributes.img.data.attributes.url);

        window.scrollTo(0, 0);

        setTimeout(() => {
          setIsProductVisible(true);
        }, 500);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAdd = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleRemove = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart({ product, quantity }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row relative min-h-screen">
      <div className="md:w-1/2 relative">
        {selectedImage && (
          <img
            src={import.meta.env.VITE_API_UP_URL + selectedImage}
            alt={"mainImg"}
            className={`w-full h-auto object-cover rounded-lg mb-4 transition-opacity duration-500 ${
              isProductVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
        <div className="flex space-x-4 overflow-x-auto">
          {product?.attributes.img && (
            <img
              src={`${import.meta.env.VITE_API_UP_URL}${
                product.attributes.img.data.attributes.url
              }`}
              alt={`${product.attributes.title}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                selectedImage === product.attributes.img.data.attributes.url
                  ? "border-2 border-gray-600 transition-all duration-100 ease-in"
                  : ""
              }`}
              onClick={() =>
                setSelectedImage(product.attributes.img.data.attributes.url)
              }
            />
          )}
          {product?.attributes.img2 && (
            <img
              src={`${import.meta.env.VITE_API_UP_URL}${
                product.attributes.img2.data.attributes.url
              }`}
              alt={`${product.attributes.title}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                selectedImage === product.attributes.img2.data.attributes.url
                  ? "border-2 border-gray-600 transition-all duration-100 ease-in"
                  : ""
              }`}
              onClick={() =>
                setSelectedImage(product.attributes.img2.data.attributes.url)
              }
            />
          )}
          {product?.attributes.img3 && (
            <img
              src={`${import.meta.env.VITE_API_UP_URL}${
                product.attributes.img3.data.attributes.url
              }`}
              alt={`${product.attributes.title}`}
              className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                selectedImage === product.attributes.img3.data.attributes.url
                  ? "border-2 border-gray-600 transition-all duration-100 ease-in"
                  : ""
              }`}
              onClick={() =>
                setSelectedImage(product.attributes.img3.data.attributes.url)
              }
            />
          )}
        </div>
      </div>
      <div
        className={`md:w-1/2 md:pl-8 mt-4 md:mt-0 transition-opacity duration-500 ${
          isProductVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl font-bold mb-2">{product?.attributes.title}</h1>
        <p className="text-lg text-gray-700 mb-4">
          {product?.attributes.onSale ? (
            <>
              <span className="line-through text-gray-500 mr-2">
                ${product?.attributes.price.toFixed(2)}
              </span>
              <span className="text-red-500">
                ${product?.attributes.salePrice.toFixed(2)}
              </span>
            </>
          ) : (
            <>${product?.attributes.price.toFixed(2)}</>
          )}
        </p>
        <p className="text-sm text-gray-600 mb-6">{product?.attributes.desc}</p>
        <div className="flex items-center mb-4">
          <button className="px-3 font-bold text-xl" onClick={handleRemove}>
            -
          </button>
          <span className="mx-4 font-bold">{quantity}</span>
          <button className="px-3 font-bold text-xl" onClick={handleAdd}>
            +
          </button>
        </div>
        <button
          className="px-4 py-2 bg-gray-800 font-bold text-white rounded-md"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
