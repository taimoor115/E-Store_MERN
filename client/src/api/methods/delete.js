import { axios, axiosWithoutToken } from "..";

const deleteRequest = async (path) => {
  try {
    const response = await axios.delete(path);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteRequestWithoutToken = async (path) => {
  try {
    const response = await axiosWithoutToken.delete(path);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { deleteRequest, deleteRequestWithoutToken };
