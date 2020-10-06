import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_CRM_DB_API_URL;
axios.interceptors.response.use(null, err => {
  const expectedError =
    err.response && err.response.status >= 400 && err.response.status < 500;
  if (!expectedError) {
    toast.error("Un expected error occurred");
  } else if (err.response.status === 401) {
    toast.info("Login needed to do this action");
  } else if (err.response.status === 400) {
  }
  toast.error(err.response.data);

  console.log("came");
  return Promise.reject(err);
});

export function setJwt(jwt) {
  if (jwt) axios.defaults.headers.common["x-auth-token"] = jwt;
}
