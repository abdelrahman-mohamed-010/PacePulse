import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { totalQuantity } = useSelector((state: RootState) => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <div className="mx-auto px-6 py-4 flex flex-wrap items-center justify-between p-4">
      <Link to="/" className="text-2xl font-semibold text-[#3c3c3b]">
        PacePulse
      </Link>

      <SearchBar className="hidden md:block w-96" type="webScreen" />

      <div className="flex items-center gap-2 lg:gap-6">
        {/* Cart Button */}
        <Link
          to="/cart"
          className="text-gray-700 hover:text-gray-600 dark:hover:text-blue-500 relative"
          onClick={closeMenu}
        >
          <ShoppingCartIcon />
          <span className=" absolute bottom-[-10px] left-[-16px] font-bold">
            {totalQuantity}
          </span>
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>

      <div
        className={`${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 ease-in-out w-full`}
        id="navbar-default"
      >
        <div className="p-4">
          <SearchBar className="mb-4 md:hidden" type="mobile" />

          {/* Menu */}
          <ul className="flex flex-col font-medium border border-gray-100 rounded-lg bg-gray-50">
            <li>
              <Link
                to="/men"
                onClick={closeMenu}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-gray-600"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                to="/women"
                onClick={closeMenu}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-gray-600"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                to="/sale"
                onClick={closeMenu}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 hover:text-gray-600"
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
