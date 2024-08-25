import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/admin.slice";

const store = configureStore({
  reducer: {
    products: productSlice,
  },
});

export default store;
