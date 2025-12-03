// src/redux/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
