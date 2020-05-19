import axios from "axios";

const Axios = axios.create({
  baseURL: "https://www.boredapi.com/api",
});

export default Axios;
