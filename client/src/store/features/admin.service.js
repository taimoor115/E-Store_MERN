import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { deleteRequestWithoutToken } from "../../api/methods/delete";
import { getRequestWithoutToken } from "../../api/methods/get";
import { patchRequestWithoutToken } from "../../api/methods/patch";
import { postRequestWithoutToken } from "../../api/methods/post";
import { endPoints } from "../../utils/endPoints";
import { axios } from "../../api";

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ pageNo, limit = 3 } = {}, { rejectWithValue }) => {
    try {
      // const data = await getRequestWithoutToken(
      //   `products/getAllProducts?pageNo=${pageNo}&limit=${limit}`
      // );


      const response = await axios.get(
        `${endPoints.getAllUsers}?pageNo=${pageNo}&limit=${limit}`
      );



      console.log(response?.data);

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await patchRequestWithoutToken(`/products/${id}`, data);

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

export const getSingleUser = createAsyncThunk(
  "getSingleUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRequestWithoutToken(
        `/products/getProduct/${id}`
      );

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);