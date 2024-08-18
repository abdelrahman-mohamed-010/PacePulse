import React from "react";
import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/20/solid";
import { FilterState, Gendre, SubCategory } from "../Fields/fields";

interface MobileFilterDialogProps {
  open: boolean;
  onClose: (open: boolean) => void;
  gendres: Gendre[];
  subCategories: SubCategory[];
  filterState: FilterState;
  toggleGendreSelection: (id: string) => void;
  handleCheckboxChange: (id: number) => void;
}

const MobileFilterDialog: React.FC<MobileFilterDialogProps> = ({
  open,
  onClose,
  gendres,
  subCategories,
  filterState,
  toggleGendreSelection,
  handleCheckboxChange,
}) => {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      className="relative z-40 lg:hidden"
    >
      <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />
      <div className="fixed inset-0 z-40 flex">
        <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              onClick={() => onClose(false)}
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>

            {/* Genre Section */}
            {gendres.length > 1 && (
              <Disclosure
                as="div"
                className="border-b border-gray-200 py-6 px-4"
              >
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">Genre</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className={classNames(
                              open ? "-rotate-180" : "rotate-0",
                              "h-5 w-5 transform"
                            )}
                          />
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {gendres.map((gender) => (
                          <div key={gender.id} className="flex items-center">
                            <input
                              id={`genre-${gender.id}`}
                              type="checkbox"
                              checked={
                                filterState.selectedGendres === gender.id
                              } // Compare as strings
                              onChange={() => toggleGendreSelection(gender.id)}
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`genre-${gender.id}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {gender.title}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )}

            {/* Categories Section */}
            <Disclosure as="div" className="border-b border-gray-200 py-6 px-4">
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">
                        Categories
                      </span>
                      <span className="ml-6 flex items-center">
                        <PlusIcon
                          aria-hidden="true"
                          className={classNames(
                            open ? "-rotate-180" : "rotate-0",
                            "h-5 w-5 transform"
                          )}
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
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default MobileFilterDialog;
