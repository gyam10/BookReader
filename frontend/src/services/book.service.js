import API_ENDPOINTS from "../config/api.endpoints";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "./axios.service";

export const createBook = async (data) => {
  try {
    let formData = new FormData();
    if (data.image) {
      formData.append("image", data.image, data.image.name);
      delete data.image;
    }
    // console.log(Object.keys(data));

    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = await postRequest(
      API_ENDPOINTS.BOOK + "/addBook",
      formData,
      true,
      true
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateBook = async (data, id) => {
  try {
    let formData = new FormData();
    if (data.image && typeof data.image === "object") {
      formData.append("image", data.image, data.image.name);
      delete data.image;
    } else {
      delete data.image;
    }
    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });

    let response = await putRequest(
      API_ENDPOINTS.BOOK + "/" + id,
      formData,
      true,
      true
    );
    // console.log("test", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllBooks = async () => {
  try {
    let result = await getRequest(API_ENDPOINTS.BOOK, true);
    return result;
  } catch (error) {
    throw error;
  }
};
export const deleteBookById = async (id) => {
  try {
    const result = deleteRequest(API_ENDPOINTS.BOOK + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const result = getRequest(API_ENDPOINTS.BOOK + "/" + id, true);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBookBySlug = async (slug) => {
  try {
    //
    let result = await getRequest(API_ENDPOINTS.BOOK + "/byslug/" + slug, true);
    return result;
  } catch (error) {
    throw error;
  }
};
