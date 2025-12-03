import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import productsData from "../data/products.json";

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  searchQuery: string;
  selectedCategory: string | null;
  priceRange: { min: number; max: number };
  currentPage: number;
  itemsPerPage: number;
}

const initialState: ProductState = {
  items: productsData as Product[],
  filteredItems: productsData as Product[],
  searchQuery: "",
  selectedCategory: null,
  priceRange: { min: 0, max: 1000000 },
  currentPage: 1,
  itemsPerPage: 6,
};

const applyFilters = (state: ProductState) => {
  let filtered = [...state.items];

  // Apply category filter
  if (state.selectedCategory !== null && state.selectedCategory !== "") {
    filtered = filtered.filter((p) => p.category === state.selectedCategory);
  }

  // Apply search filter
  const query = state.searchQuery.toLowerCase().trim();
  if (query !== "") {
    filtered = filtered.filter((p) => 
      p.name.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query)
    );
  }

  // Apply price range filter
  filtered = filtered.filter((p) => {
    const price = Number(p.price);
    return price >= state.priceRange.min && price <= state.priceRange.max;
  });

  state.filteredItems = filtered;
  state.currentPage = 1;
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      applyFilters(state);
    },

    setSelectedCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },

    setPriceRange(state, action: PayloadAction<{ min: number; max: number }>) {
      state.priceRange = action.payload;
      applyFilters(state);
    },

    incrementPage(state) {
      const totalPages = Math.ceil(
        state.filteredItems.length / state.itemsPerPage
      );

      if (state.currentPage < totalPages) {
        state.currentPage += 1;
      }
    },

    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  incrementPage,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;