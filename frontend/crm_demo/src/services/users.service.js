import axios from "axios";
import authService from "./auth.service";
import { setJwt } from "./http.service";
setJwt(authService.getJwt());

export async function register(user) {
  try {
    const response = await axios.post("/users", user);
    authService.loginWithJwt(response.headers["x-auth-token"]);
  } catch (error) {
    throw new Error(error.response.data);
  }
}
function getUser(userId) {
  return axios.get(`/users/${userId}`);
}
function addUser(user) {
  return axios.post(`/users/`, user);
}
function updateUser(userId, payload) {
  return axios.put(`/users/${userId}`, payload);
}
function deleteUser(userId) {
  return axios.delete(`/users/${userId}`);
}
function getUsers() {
  return axios.get(`/users`, {
    headers: {
      "x-auth-token": localStorage.getItem("currentUser"),
    },
  });
}

export default {
  register,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUser,
};
