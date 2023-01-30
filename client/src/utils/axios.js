import axios from "axios";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:8000/api/";

  // axios.defaults.baseURL = "http://localhost:5001/api/";

  // axios.defaults.baseURL = "http://192.168.100.26:5000/api/";
} else {
  // axios.defaults.baseURL = "http://http://localhost:5001/api/";

  axios.defaults.baseURL = "http://localhost:8000/api/";

  // axios.defaults.baseURL = "http://64.227.22.105/api/";
}

export default axios;
