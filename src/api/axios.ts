import axios from "axios";

const axiosJWT = axios.create({
    baseURL: "https://api.otixx.online",
  });
  
  export default axiosJWT;