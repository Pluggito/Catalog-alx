import { useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "../types/product";
import { ProductCard } from "../components/ProductCard";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import { 
  setSearchQuery, 
  setSelectedCategory, 
  incrementPage,
  setCurrentPage 
} from "../redux/productSlice";

const Collections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems: Product[] = useSelector((state: any) => state.products.filteredItems);
  const searchQuery: string = useSelector((state: any) => state.products.searchQuery);
  const selectedCategory: string | null = useSelector((state: any) => state.products.selectedCategory);
  const allProducts: Product[] = useSelector((state: any) => state.products.items);
  const currentPage: number = useSelector((state: any) => state.products.currentPage);
  const itemsPerPage: number = useSelector((state: any) => state.products.itemsPerPage);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(allProducts.map((p) => p.category)));
  }, [allProducts]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredItems.slice(0, endIdx);
  }, [filteredItems, currentPage, itemsPerPage]);

  // Reset scroll position when filters change
  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchQuery, selectedCategory]);

  // Infinite scroll handler
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - (scrollTop + clientHeight) < 200 && currentPage < totalPages) {
        dispatch(incrementPage());
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentPage, totalPages, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleCategoryClick = (category: string | null) => {
    dispatch(setSelectedCategory(category === selectedCategory ? null : category));
  };

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="px-4 py-2">
      <header className="text-center text-3xl py-4">
        <Title text1={"ALL "} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700 mt-2">
          Browse our complete collection of products. Use filters to find exactly what you're looking for.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 bg-gray-50 p-4 rounded-lg h-fit">
          <h3 className="font-semibold mb-4 text-lg">Filters</h3>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Categories */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Category</label>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`block w-full text-left px-3 py-2 rounded text-sm mb-2 ${
                selectedCategory === null ? "bg-black text-white" : "bg-white hover:bg-gray-100"
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`block w-full text-left px-3 py-2 rounded text-sm mb-2 ${
                  selectedCategory === cat ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Price Range - Commented out but structure preserved */}
          {/*<div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                placeholder="Min"
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                placeholder="Max"
                className="flex-1 border rounded px-2 py-1 text-sm"
              />
            </div>
            <button
              onClick={handlePriceChange}
              className="w-full bg-black text-white px-3 py-2 rounded text-sm hover:bg-teal-700"
            >
              Apply
            </button>
            <p className="text-xs text-gray-600 mt-2">
              ${minPrice} - ${maxPrice}
            </p>
          </div>*/}
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 flex flex-col">
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)] pr-2">
            {paginatedItems.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No products found matching your filters.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
                {paginatedItems.map((p) => (
                  <ProductCard key={p.id} product={p} onClick={handleProductClick} />
                ))}
              </div>
            )}
            {currentPage < totalPages && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-600">Scroll for more...</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center items-center gap-2">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Prev
              </button>
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded ${
                      currentPage === page ? "bg-black text-white" : "border hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
              <span className="text-sm text-gray-600 ml-2">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collections;