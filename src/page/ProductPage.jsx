import { PlusIcon } from "@heroicons/react/20/solid";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SearchInput from "../components/SearchInput";
import { useCategories, useProducts } from "../shared/hooks";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const {
    isPending: isProductsPending,
    error: productsError,
    data: productList,
  } = useProducts(search, category);

  const { data: categoryList } = useCategories();

  const modifiedCatecoryList = !!categoryList?.length
    ? ["All", ...categoryList].slice(0, 10)
    : [];

  const handleCategoryChange = (option) => {
    const newParams = new URLSearchParams(searchParams);
    if (option === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", option);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (searchValue) => {
    const newParams = new URLSearchParams(searchParams);
    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  const renderProducts = () => {
    if (isProductsPending) {
      return <div>Loading...</div>;
    } else if (productsError) {
      return <div>Error: {error.message}</div>;
    } else {
      return productList?.products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ));
    }
  };

  return (
    <div className="bg-white">
      <div>
        <main className="px-4 lg:px-8">
          <div className="border-b border-gray-200 pt-24 pb-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>
            <div className="w-xs">
              <SearchInput
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
            <aside>
              <h2 className="sr-only">Filters</h2>

              <button
                type="button"
                // onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex items-center lg:hidden"
              >
                <span className="text-sm font-medium text-gray-700">
                  Filters
                </span>
                <PlusIcon
                  aria-hidden="true"
                  className="ml-1 size-5 shrink-0 text-gray-400"
                />
              </button>

              <div className="hidden lg:block">
                <form className="divide-y divide-gray-200">
                  <div className="py-10 first:pt-0 last:pb-0">
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">
                        Categories
                      </legend>
                      <div className="space-y-3 pt-6">
                        {modifiedCatecoryList?.map((option, optionIdx) => (
                          <div
                            key={option}
                            className="flex gap-3"
                            onClick={() => handleCategoryChange(option)}
                          >
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  defaultValue={option}
                                  id={`${option}-${optionIdx}`}
                                  name={option}
                                  checked={
                                    (category === "" ? "All" : category) ===
                                    option
                                  }
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`${option}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </form>
              </div>
            </aside>

            <section
              aria-labelledby="product-heading"
              className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
            >
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                {renderProducts()}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
