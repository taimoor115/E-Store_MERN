import { axios, axiosWithoutToken } from "..";

const postRequest = async (path, data) => {
  try {
    const response = await axios.post(path, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const postRequestWithoutToken = async (path, data) => {
  try {
    const response = await axiosWithoutToken.post(path, data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { postRequest, postRequestWithoutToken };
