import axios from "axios";
import Path from "./BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STRING from "../Constants/STRINGS";

export const comnGet = async (url, apiToken) => {
  let myUrl = Path.API_PATH + url;
  const config = {
    headers: { Authorization: `Bearer ${apiToken}` },
  };
  console.log(myUrl);
  return axios
    .get(myUrl, config)
    .then((res) => res)
    .catch((err) => err);
};

export const comnPost = async (url, data) => {
  const myUrl = Path.API_PATH + url;
  const token = await AsyncStorage.getItem(STRING.STORAGE.ACCESS_TOKEN);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  console.log(myUrl);
  return axios
    .post(myUrl, data, config)
    .then((res) => res)
    .catch((err) => err);
};

export const comnPut = async (url, data) => {
  const myUrl = Path.API_PATH + url;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(STRING.STORAGE.API_TOKEN)}` },
  };
  console.log(myUrl);
  return axios
    .put(myUrl, data, config)
    .then((res) => res)
    .catch((err) => err);
};

export const ComnDel = async (url, data) => {
  const myUrl = Path.API_PATH + url;
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem(STRING.STORAGE.API_TOKEN)}` },
  };
  console.log(myUrl);
  return axios
    .delete(myUrl, data, config)
    .then((res) => res)
    .catch((err) => err);
};

export const login = async () => {
  let data = {
    email: "test@gmail.com",
    password: "Test@123",
  };
  console.log(myUrl);
  return axios
    .post("/auth/login", data)
    .then((res) => {
      return res.data.access_token;
    })
    .catch((err) => err);
};
