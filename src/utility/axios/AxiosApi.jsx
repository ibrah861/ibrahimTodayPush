// Axios
import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default auth;
