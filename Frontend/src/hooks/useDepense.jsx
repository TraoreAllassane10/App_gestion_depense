import { useState } from "react";
import {
  getDepenses,
  getDepense,
  newDepense,
  updateOneDepense,
  destroyDepense,
} from "../services/depenseService";
import toast from "react-hot-toast";

export default function useDepense() {
  const [depenses, setDepenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const allDepenses = async () => {
    // Lancement du chargement
    setLoading(true);

    await getDepenses()
      .then((res) => {
        // Stop le chargement
        setLoading(false);

        // Si la recuperation passe avec succès
        if (res.data.success) {
          setDepenses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const findDepense = (id) => {};

  const createDepense = async (data) => {
    // Lancement du chargement
    setLoading(true);

    await newDepense(data)
      .then((res) => {
        // L'enregistrement s'est bien passé
        if (res.data.success) {
          console.log(res.data);
          toast.success("Depense enregistrée avec succès");
        }

        if (!res.data.success) {
          toast.error(res.data.errors);
        }

        // Stop le chargement
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);

        toast.error("Erreur survenu au niveau du serveur");

        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  const updateDepense = (id, data) => {};

  const deleteDepense = (id) => {};

  return {
    allDepenses,
    findDepense,
    createDepense,
    updateDepense,
    deleteDepense,
    depenses,
    loading,
  };
}
