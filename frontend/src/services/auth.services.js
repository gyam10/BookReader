import API_ENDPOINTS from "../config/api.endpoints";
import { postRequest, getRequest } from "./axios.service";

export const loginUser = async (data) => {
  try {
    // console.log(data);
    let login_response = await postRequest(API_ENDPOINTS.LOGIN_URL, data);
    // console.log(login_response);
    if (login_response.result.access_token) {
      localStorage.setItem("auth_token", login_response.result.access_token);
      let user_info = {
        name: login_response.result.user.name,
        email: login_response.result.user.email,
        _id: login_response.result.user._id,
        role: login_response.result.user.role,
      };
      localStorage.setItem("auth_user", JSON.stringify(user_info));

      return login_response;
    } else {
      return login_response;
    }
  } catch (err) {
    throw err.response.data.msg;
  }
};

export const registerUser = async (data) => {
  try {
    let form_data = new FormData();
    if (data.image) {
      form_data.append("image", data.image, data.image.name);
      delete data.image;
    }

    Object.keys(data).forEach((item) => {
      form_data.append(item, data[item]);
    });

    let response = await postRequest(
      API_ENDPOINTS.REGISTER_URL,
      form_data,
      false,
      true
    );
    console.log("test", response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getVerified = async () => {
  try {
    let response = await getRequest(API_ENDPOINTS.VERIFY_USER, true);
    return response;
  } catch (error) {
    throw error;
  }
};
