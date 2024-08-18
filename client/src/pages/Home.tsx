import React from "react";
import Header from "../components/Header";
import Categories from "../components/Categories";
import NewSettler from "../components/NewSettler";
import FeaturedProducts from "../components/FeaturedProducts";


const Home: React.FC = () => {
  return (
    <div className="mt-3a">
      <Header />
      <FeaturedProducts type="Featured" />
      <Categories />
      <FeaturedProducts type="Trending" />
      <NewSettler />
    </div>
  );
};

export default Home;
