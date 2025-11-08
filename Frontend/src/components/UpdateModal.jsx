import { useEffect, useState } from "react";
import Input from "./Input";
import useDepense from "../hooks/useDepense";
import { useNavigate } from "react-router-dom";


const UpdateModal = ({ setOpenUpdateModal, idUpdate }) => {
  const { findDepense, updateDepense, depense } = useDepense();

  const navigate = useNavigate();

  // Recuperation de la depense à modifier lors du rendu du modal
  useEffect(() => {
    findDepense(idUpdate);
  }, []);

  // Dès que la depense est chargée, remplir le formulaire
  useEffect(() => {
    if (depense) {
      setMontant(depense.montant);
      setDescription(depense.description);
    }
  }, [depense]);

  // Les states de depense
  const [montant, setMontant] = useState();
  const [description, setDescription] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (montant == "" || description == "") {
      toast.error("Veuillez remplir tous les champs svp !");
      return;
    }

    // Formation d'un objet depense
    const depense = { montant, description };

    // Mise à jour d'une depense
    updateDepense(idUpdate, depense);

    setOpenUpdateModal(false);

    // Rafraichissement de la page
    navigate("/");
  };

  return (
    <div className="absolute top-50 left-[40%] z-50 bg-dark w-[400px]">
      <div className="card bg-primary text-primary-content w-96">
        <div className="card-body">
          <h3 className="font-bold text-lg">Modification d'une Depense</h3>
          <p className="py-4">Modifier une depense</p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <label>Montant</label>
                <Input
                  value={montant}
                  onChange={(e) => setMontant(e.target.value)}
                  type="number"
                  placeholder="Montant"
                  className="text-white"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label>Description</label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Description"
                />
              </div>

              <button className="btn btn-warning">Modifier</button>
            </div>
          </form>

          <button className="btn" onClick={() => setOpenUpdateModal((v) => !v)}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
