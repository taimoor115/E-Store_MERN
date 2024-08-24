import { axios, axiosWithoutToken } from "..";

const getRequest = async (path) => {
  try {
    const response = await axios.get(path);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getRequestWithoutToken = async (path) => {
  try {
    const response = await axiosWithoutToken.get(path);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getRequest, getRequestWithoutToken };
