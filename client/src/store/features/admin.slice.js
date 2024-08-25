import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "./admin.service";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  products: [],
  status: STATUSES.IDLE,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
      })
      .addCase(editProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.products = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      });
  },
});

export const { setPage } = productSlice.actions;

export default productSlice.reducer;
