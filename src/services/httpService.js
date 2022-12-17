import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logger from "../services/logService";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    (error.response.status >= 400 || error.response.status < 500);
  if (!expectedError) {
    logger.log(error);
    toast("An unexpected error has been accrued");
  }
  return Promise.reject(error);
});

const defaultMethods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default defaultMethods;
