import axios from "axios";

export const registerService = async (data) => {
  try {
    return await axios.post("http://localhost:8000/api/register", data);
  } catch (error) {
    console.log(error);
  }
};

export const loginService = async (data) => {
  try {
    return await axios.post("http://localhost:8000/api/login", data);
  } catch (error) {
    console.log(error);
  }
};
