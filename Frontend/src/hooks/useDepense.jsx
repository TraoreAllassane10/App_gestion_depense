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
  const [depense, setDepense] = useState([]);

  const [pagination, setPagination] = useState(null)


  const allDepenses = async (page=1) => {
    // Lancement du chargement
    setLoading(true);

    await getDepenses(page)
      .then((res) => {
        // Stop le chargement
        setLoading(false);

        // Si la recuperation passe avec succès
        if (res.data.success) {
          console.log(res.data)
          setDepenses(res.data.data);

          setPagination(res.data.pagination)
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)
      });
  };

  const findDepense = async (id) => {
    // Lancement du chargement
    setLoading(true);

    await getDepense(id)
      .then((res) => {
        // Stop le chargement
        setLoading(false);

        // Si la recuperation passe avec succès
        if (res.data.success) {
          console.log(res.data.data)
          setDepense(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createDepense = async (data) => {
    // Lancement du chargement
    setLoading(true);

    await newDepense(data)
      .then((res) => {
        // L'enregistrement s'est bien passé
        if (res.data.success) {

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

  const updateDepense = async (id, data) => {
    // Lancement du chargement
    setLoading(true);

    await updateOneDepense(id, data)
      .then((res) => {
        // L'enregistrement s'est bien passé
        if (res.data.success) {

          toast.success("Depense Modifiée avec succès");
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

  const deleteDepense = async (id) => {
    // Lancement du chargement
    setLoading(true);

    await destroyDepense(id)
      .then((res) => {
        // L'enregistrement s'est bien passé
        if (res.data.success) {
         
          toast.success("Depense supprimé avec succès");

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

  return {
    allDepenses,
    findDepense,
    createDepense,
    updateDepense,
    deleteDepense,
    depenses,
    loading,
    depense,
    pagination
  };
}
