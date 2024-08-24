import { axios, axiosWithoutToken } from "..";

const deleteRequest = async (path, data) => {
  try {
    const response = await axios.delete(path, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteRequestWithoutToken = async (path, data) => {
  try {
    const response = await axiosWithoutToken.delete(path, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { deleteRequest, deleteRequestWithoutToken };
