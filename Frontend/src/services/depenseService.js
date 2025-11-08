import axios from "axios";

export const getDepenses = async () => {
  try {
    // Le token de l'utilisateur connecté
    const token = localStorage.getItem("token");

    return await axios.get("http://localhost:8000/api/depenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDepense = async (id) => {
  try {
    // Le token de l'utilisateur connecté
    const token = localStorage.getItem("token");

    return (
      token &&
      (await axios.get(`http://localhost:8000/api/depenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export const newDepense = async (data) => {
  try {
    // Le token de l'utilisateur connecté
    const token = localStorage.getItem("token");

    return (
      token &&
      (await axios.post(`http://localhost:8000/api/depenses`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export const updateOneDepense = async (id, data) => {
  try {
    // Le token de l'utilisateur connecté
    const token = localStorage.getItem("token");

    return (
      token &&
      (await axios.put(`http://localhost:8000/api/depenses/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
    );
  } catch (error) {
    console.log(error);
  }
};

export const destroyDepense = async (id) => {
  try {
    // Le token de l'utilisateur connecté
    const token = localStorage.getItem("token");

    return (
      token &&
      (await axios.delete(`http://localhost:8000/api/depenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }))
    );
  } catch (error) {
    console.log(error);
  }
};
