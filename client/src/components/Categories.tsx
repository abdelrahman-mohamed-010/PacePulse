import React from "react";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[80vh] gap-2.5 m-2.5 mt-8">
      <div className="flex flex-col lg:flex-1 gap-2.5">
        <div className="relative overflow-hidden h-60 lg:h-full">
          <img
            src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Sale"
            loading="lazy"
            className="w-full h-full object-cover rounded"
          />
          <button className="absolute inset-0 m-auto min-w-[100px] w-fit h-[50px] p-2.5 cursor-pointer border-none bg-white uppercase font-medium">
            <Link className="link" to="/sale">
              Sale
            </Link>
          </button>
        </div>
        <div className="relative overflow-hidden h-60 lg:h-full">
          <img
            src="https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Women"
            className="w-full h-full object-cover rounded"
            loading="lazy"
          />
          <button className="absolute inset-0 m-auto min-w-[100px] w-fit h-[50px] p-2.5 cursor-pointer border-none bg-white uppercase font-medium">
            <Link className="link" to="/women">
              Women
            </Link>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-1 gap-2.5">
        <div className="relative overflow-hidden h-60 lg:h-full">
          <img
            src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="New Season"
            loading="lazy"
            className="w-full h-full object-cover rounded"
          />
          <button className="absolute inset-0 m-auto min-w-[100px] w-fit h-[50px] p-2.5 cursor-pointer border-none bg-white uppercase font-medium">
            <Link className="Featured" to="/Trending">
              Trending
            </Link>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-[2] gap-2.5">
        <div className="relative overflow-hidden h-full">
          <div className="flex gap-2.5 h-full">
            <div className="relative overflow-hidden h-full w-1/2">
              <img
                src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600"
                loading="lazy"
                alt="Men"
                className="w-full h-full object-cover rounded"
              />
              <button className="absolute inset-0 m-auto min-w-[100px] w-fit h-[50px] p-2.5 cursor-pointer border-none bg-white uppercase font-medium">
                <Link className="link" to="/men">
                  Men
                </Link>
              </button>
            </div>
            <div className="relative overflow-hidden h-full w-1/2">
              <img
                src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
                loading="lazy"
                alt="Featured"
                className="w-full h-full object-cover rounded"
              />
              <button className="absolute inset-0 m-auto min-w-[100px] w-fit h-[50px] p-2.5 cursor-pointer border-none bg-white uppercase font-medium">
                <Link className="" to="/featured">
                  Featured
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
