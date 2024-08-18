// Filters.tsx
import { Disclosure } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import { SubCategory, Gendre, FilterState } from "../Fields/fields";

interface FiltersProps {
  gendres: Gendre[];
  subCategories: SubCategory[];
  filterState: FilterState;
  toggleGendreSelection: (gendreId: string) => void;
  handleCheckboxChange: (categoryId: number) => void;
}

const Filters: React.FC<FiltersProps> = ({
  gendres,
  subCategories,
  filterState,
  toggleGendreSelection,
  handleCheckboxChange,
}) => {
  return (
    <form className="hidden lg:block w-1/4">
      <h3 className="sr-only">Categories</h3>
      {/* gendre */}
      {gendres.length > 1 && (
        <Disclosure as="div" className="border-b border-gray-200 py-6">
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">Gendre</span>
                  <span className="ml-6 flex items-center">
                    <PlusIcon
                      aria-hidden="true"
                      className={`h-5 w-5 transform ${
                        open ? "-rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {gendres.map((gendre) => (
                    <div key={gendre.id} className="flex items-center">
                      <input
                        id={`gendre-${gendre.id}`}
                        type="checkbox"
                        checked={filterState.selectedGendres === gendre.id}
                        onChange={() => toggleGendreSelection(gendre.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`gendre-${gendre.id}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {gendre.title}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}

      {/* categories */}
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Categories</span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className={`h-5 w-5 transform ${
                      open ? "-rotate-180" : "rotate-0"
                    }`}
                  />
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {subCategories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      type="checkbox"
                      checked={filterState.selectedCategories.includes(
                        category.id
                      )}
                      onChange={() => handleCheckboxChange(category.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.attributes.title}
                    </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </form>
  );
};

export default Filters;
