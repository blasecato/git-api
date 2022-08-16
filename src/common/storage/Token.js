import moment from "moment";

const jwtDecode = require("jwt-decode");

const key = "@tokenINSURANCE_MANAGER";
const timeKey = "@tokenInsuranceTime";

export const save = (token, where) => {
  try {
    localStorage.setItem(timeKey, moment().add(1, "week").toString());
    localStorage.setItem(where || key, token);
    return { success: "OK" };
  } catch (error) {
    return { error: "ERROR" };
  }
};

export const get = () => {
  try {
    const tokenTime = localStorage.getItem(timeKey);
    if (!tokenTime || moment().isSameOrAfter(moment(tokenTime))) {
      localStorage.removeItem(key);
      localStorage.removeItem(timeKey);
    }
    return localStorage.getItem(key) || "";
  } catch (error) {
    return { error: "ERROR" };
  }
};

export const remove = () => {
  return localStorage.removeItem(key);
};

export const isToken = () => {
  return localStorage.getItem(key) !== null;
};

export const decodeToken = () => {
  const token = localStorage.getItem(key);
  if (token) return jwtDecode(token);
  return "";
};
