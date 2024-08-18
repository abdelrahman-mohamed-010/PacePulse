import React, { useState, useEffect, useCallback, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import debounce from "lodash/debounce";
import { Product } from "../Fields/fields";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const API_TOKEN = import.meta.env.VITE_API_URL_TOKEN;

type SearchBarProps = {
  className?: string;
  type: "mobile" | "webScreen";
};

const SearchBar: React.FC<SearchBarProps> = ({ className, type }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const fetchProducts = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `${API_URL}/products?filters[title][$contains]=${encodeURIComponent(
          searchTerm
        )}&populate=*&pagination[pageSize]=${3}`,
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );
      const data = await response.json();
      setResults(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

  useEffect(() => {
    if (query) {
      debouncedFetchProducts(query);
    } else {
      setResults([]);
    }
  }, [query, debouncedFetchProducts]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setQuery("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isMobile = type === "mobile";

  return (
    <div ref={searchBarRef} className={`relative ${className}`}>
      <div className={`relative`}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
          className={`block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
            isMobile ? "max-w-full" : "max-w-md"
          }`}
        />
        {query && (
          <button
            onClick={handleClear}
            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
              isMobile ? "text-sm" : "text-base"
            }`}
          >
            <CloseIcon />
          </button>
        )}
      </div>
      {query && results.length > 0 && (
        <div
          className={`${
            !isMobile && "absolute left-0 right-0"
          } mt-1 border border-gray-300 dark:border-gray-600 bg-gray-50 rounded-lg z-10 transition-opacity duration-400 ease-in-out ${
            results.length === 0 ? "opacity-0" : "opacity-100"
          }`}
        >
          {results.map((product) => (
            <Link
              to={`/product/${product.id}`}
              onClick={() => setQuery("")}
              key={product.id}
              className="flex items-center space-x-2 p-2 border-b border-gray-200"
            >
              <img
                src={`${
                  import.meta.env.VITE_API_UP_URL +
                  product.attributes.img.data.attributes.url
                }`}
                alt={product.attributes.title}
                className="w-16 h-16 object-cover rounded object-top"
              />

              <div>
                <h4 className="text-sm font-semibold">
                  {product.attributes.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ${product.attributes.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
