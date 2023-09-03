import axios from "axios";
import Path from "./BaseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import STRING from "../Constants/STRINGS";
import NetInfo from '@react-native-community/netinfo';
import ComingSoon from "../../Components/Common/ComingSoon";

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

export const isOffline = async () => {
  const state = await NetInfo.fetch();
  return !state.isConnected
};

export const saveToStorage = async (name, data) => {
  return await AsyncStorage.setItem(name, data)
}

export const getFromStorage = async (name) => {
  return await AsyncStorage.getItem(name)
}

export const removeFromStorage = async (name) => {
  return await AsyncStorage.removeItem(name)
}

export const dataSync = async (name, callBack) => {
  if (await isOffline()) {
    console.log('name, ', await getFromStorage(name));
    if (await getFromStorage(name)) {
      return await getFromStorage(name)
    } else {
      return await isOffline()
    }
  } else {
    callBack()
  }
}