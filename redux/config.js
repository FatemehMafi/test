import axios from "axios";

export const request = axios.create({
  baseURL: "https://api.bitpin.ir",
  headers: {
    "Content-Type": "application/json",
  },
});
