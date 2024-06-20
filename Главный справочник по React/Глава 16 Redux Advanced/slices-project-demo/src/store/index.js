import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./main-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
    reducer: {
        main: mainSlice.reducer,
        cart: cartSlice.reducer

    }
})

export default store;