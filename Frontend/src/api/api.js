import axios from "axios";

// console.log(process.env.baseURL);

const api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
