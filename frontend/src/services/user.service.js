import API_ENDPOINTS from "../config/api.endpoints";
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from "./axios.service";

export const createUser = async (data) => {
  try {
    console.log("Data:", data);
    let formData = new FormData();
    if (data.image) {
      formData.append("image", data.image, data.image.name);
      delete data.image;
      if (data.role) {
        data.role = data.role.value;
      }
    }
    // console.log(Object.keys(data));

    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = await postRequest(
      API_ENDPOINTS.REGISTER_URL,
      formData,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async (role) => {
  try {
    let result = await getRequest(API_ENDPOINTS.USER, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (id) => {
  try {
    //
    let result = await deleteRequest(API_ENDPOINTS.USER + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    //
    let result = await getRequest(API_ENDPOINTS.USER + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (data, id) => {
  try {
    console.log(data);
    let formData = new FormData();
    if (data.image && typeof data.image === "object") {
      formData.append("image", data.image, data.image.name);
      delete data.image;

      if (data.role) {
        data.role = data.role.map((item) => item.value);
      }
    } else {
      delete data.image;
    }
    delete data.role_id;

    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = await putRequest(
      API_ENDPOINTS.USER + "/" + id,
      formData,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};
