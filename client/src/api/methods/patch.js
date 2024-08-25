import { axios, axiosWithoutToken } from "..";

const patchRequest = async (path, data) => {
  try {
    const response = await axios.patch(path, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const patchRequestWithoutToken = async (path, data) => {
  try {
    const response = await axiosWithoutToken.patch(path, data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { patchRequest, patchRequestWithoutToken };
