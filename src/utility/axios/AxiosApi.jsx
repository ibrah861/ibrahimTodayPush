// Axios
import axios from "axios";

const auth = axios.create({
  baseURL: "https://backendcodes-itk4.onrender.com/api",
});

export default auth;
