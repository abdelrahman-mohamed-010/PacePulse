import React, { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { FilterState, Gendre, SubCategory } from "../Fields/fields";
import MobileFilterDialog from "./MobileFilterDialog";
import ProductGrid from "./ProductGrid";
import Filters from "./Filters";

const sortOptions = [
  { name: "Most Popular", href: "" },
  { name: "Newest", href: "" },
  { name: "Price: Low to High", href: "" },
  { name: "Price: High to Low", href: "" },
];

const ProductShowcase: React.FC<{ type: string }> = ({ type }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [splitgrid, setSplitGrid] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategories: [],
    selectedGendres: "",
    selectedSort: "Most Popular",
  });

  const toggleGendreSelection = (gendreId: string) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedGendres: prevState.selectedGendres === gendreId ? "" : gendreId,
    }));
  };

  const handleCheckboxChange = (categoryId: number) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedCategories: prevState.selectedCategories.includes(categoryId)
        ? prevState.selectedCategories.filter((id) => id !== categoryId)
        : [...prevState.selectedCategories, categoryId],
    }));
  };

  // Fetch categories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/sub-categories?${
            type === "men"
              ? "filters[categories][id][$in]=1"
              : type === "women"
              ? "filters[categories][id][$in]=2"
              : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_URL_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setSubCategories(data.data);

        window.scroll(0, 0);

        const arrayOfObjects: SubCategory[] = data.data;
        const ids: number[] = arrayOfObjects.map((obj) => obj.id);
        const updatedSelectedCategories = filterState.selectedCategories.filter(
          (id) => ids.includes(id)
        );
        if (
          updatedSelectedCategories.length !==
          filterState.selectedCategories.length
        ) {
          setFilterState((prev) => ({
            ...prev,
            selectedCategories: updatedSelectedCategories,
          }));
        }
      } catch (err) {
        console.error("Caught an error:", err);
      }
    };
    fetchSubCategories();
  }, [type, filterState.selectedCategories]);

  let gendres: Gendre[] = [];
  if (type === "trending" || type === "featured" || type === "sale") {
    gendres = [
      { title: "men", id: "1" },
      { title: "women", id: "2" },
    ];
  }

  return (
    <div className="bg-white min-h-screen">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilterDialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          gendres={gendres}
          subCategories={subCategories}
          filterState={filterState}
          toggleGendreSelection={toggleGendreSelection}
          handleCheckboxChange={handleCheckboxChange}
        />
        <main className="mx-auto px-6 py-4 min-h-screen ">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 max-sm:pb-2">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 capitalize max-sm:text-xl">
              {type} products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        <div
                          className={classNames(
                            filterState.selectedSort === option.name
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm cursor-pointer"
                          )}
                          onClick={() =>
                            setFilterState((prev) => ({
                              ...prev,
                              selectedSort: option.name,
                            }))
                          }
                        >
                          {option.name}
                        </div>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
              <button
                type="button"
                className="ml-2 inline-flex items-center  bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 lg:hidden "
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Filters</span>
              </button>
              <button
                type="button"
                className="ml-2 inline-flex items-center  px-2.5 py-1.5 text-sm font-medium text-gray-700  ring-gray-900/10 lg:hidden "
                onClick={() => setSplitGrid(!splitgrid)}
              >
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Toggle Grid</span>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className=" flex gap-8 ">
              <Filters
                gendres={gendres}
                subCategories={subCategories}
                filterState={filterState}
                toggleGendreSelection={toggleGendreSelection}
                handleCheckboxChange={handleCheckboxChange}
              />
              <ProductGrid
                type={type}
                filterState={filterState}
                token={import.meta.env.VITE_API_URL_TOKEN}
                splitgrid={splitgrid}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default ProductShowcase;


