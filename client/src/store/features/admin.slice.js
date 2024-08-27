import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  editProduct,
  exportToExcel,
  getAllProducts,
  getSingleUser,
} from "./admin.service";

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const initialState = {
  products: [],
  selectedProduct: {},
  status: STATUSES.IDLE,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {},
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

        console.log("Helo", state.products);

        console.log(action.payload, "Helo");
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
        console.log("Current products:", state.products);
        console.log("Action payload:", action.payload);
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
        state.products = action.payload.data;

        console.log(action.payload);

        // if (Array.isArray(state.products)) {
        //   state.products.push(action.payload.data);
        // } else {
        //   state.products = [action.payload.data];
        // }
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })

      .addCase(getSingleUser.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.selectedProduct = action.payload.data;
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.payload;
      })
      .addCase(exportToExcel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(exportToExcel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(exportToExcel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to export data";
      });
  },
});

export const { setPage } = productSlice.actions;

export default productSlice.reducer;
