import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BE_URL + "api/v1",
  timeout: 30000,
  timeoutErrorMessage: "Server time out",
  headers: {
    "Content-Type": "application/json",
  },
});

httpRequest.interceptors.response.use((response) => {
  if (response.status === 200 || response.status === 201) {
    return response.data;
  } else {
    throw response.data;
  }
});
let headers = {
  "Content-Type": "application/json",
};

let getHeaders = (is_strict, form_data = false) => {
  if (is_strict) {
    let token = localStorage.getItem("auth_token");

    headers = {
      ...headers,
      headers: { ...headers.headers, authorization: "bearer " + token },
    };
  }
  if (form_data) {
    headers = {
      ...headers,
      headers: { ...headers.headers, "Content-Type": "multipart/form-data" },
    };
  }
  if (!form_data) {
    headers = {
      ...headers,
      headers: { ...headers.headers, "Content-Type": "application/json" },
    };
  }
};
export const postRequest = (
  url,
  data,
  is_strict = false,
  form_data = false
) => {
  getHeaders(is_strict, form_data);

  return httpRequest.post(url, data, headers);
};

export const getRequest = (url, is_strict = false) => {
  getHeaders(is_strict);
  return httpRequest.get(url, headers);
};

export const putRequest = (url, data, is_strict = false, form_data = false) => {
  getHeaders(is_strict, form_data);
  return httpRequest.put(url, data, headers);
};
export const deleteRequest = (url, is_strict = false) => {
  getHeaders(is_strict);
  return httpRequest.delete(url, headers);
};
