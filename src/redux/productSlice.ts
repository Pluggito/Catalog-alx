import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/product";
import productsData from "../data/products.json";

interface ProductState{
    items: Product[];
    filteredItems: Product[]
    searchQuery: string;
}

const initialState: ProductState ={
    items: productsData as Product[],
    filteredItems: productsData as Product[],
    searchQuery: "",
}

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setSearchQuery(state, action: PayloadAction<string>){
            state.searchQuery = action.payload;

            if(action.payload.trim()=== ""){
                state.filteredItems = state.items;
            }else{
                const query = action.payload.toLowerCase();
                state.filteredItems = state.items.filter((product) => product.name.toLowerCase().includes(query))
            }
        }
    }
})


export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer
