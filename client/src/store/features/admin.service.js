import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequestWithoutToken } from "../../api/methods/get";
import { endPoints } from "../../utils/endPoints";
import { patchRequestWithoutToken } from "../../api/methods/patch";
import { deleteRequestWithoutToken } from "../../api/methods/delete";
import toast from "react-hot-toast";
import { postRequestWithoutToken } from "../../api/methods/post";

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ pageNo, limit = 3 }, { rejectWithValue }) => {
    try {
      const data = await getRequestWithoutToken(
        `products/getAllProducts?pageNo=${pageNo}&limit=${limit}`
      );

      console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await patchRequestWithoutToken(
        `${endPoints.editProduct}/${id}`,
        data
      );

      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteRequestWithoutToken(
        `products/deleteProduct/${id}`
      );
      console.log(response);

      toast.success(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "createProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await postRequestWithoutToken("/products", data);

      console.log(response);
      toast.success(response.message);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
