import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { deleteRequestWithoutToken } from "../../api/methods/delete";
import { getRequestWithoutToken } from "../../api/methods/get";
import { patchRequestWithoutToken } from "../../api/methods/patch";
import { postRequestWithoutToken } from "../../api/methods/post";
import { endPoints } from "../../utils/endPoints";
import { axios } from "../../api";
import Axios from "axios";

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

export const exportToExcel = createAsyncThunk(
  "excelExport",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/export/excel",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.xlsx");

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

      toast.success("File downloaded successfully...");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/getProducts`);
      console.log(response?.data);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);