import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import useDepense from "../hooks/useDepense";
import Input from "../components/Input";
import { toast } from "react-hot-toast";

const Depense = () => {
  // const { user } = useContext(AuthContext);

  // Les states de depense
  const [montant, setMontant] = useState("");
  const [description, setDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const { logout } = useAuth();
  const { allDepenses,createDepense, depenses, loading } = useDepense();

  useEffect(() => {
    allDepenses();
  }, []);

  // creation d'une depense
  const handleSubmit = (e) => {
    e.preventDefault();

    if (montant == "" || description == "") {
      toast.error("Veuillez remplir tous les champs svp !");
      return;
    }

    // Formation d'un objet depense
    const newDepense = { montant, description };

    // Enregistrement d'une depense
    createDepense(newDepense);

    setOpenModal(false)
  };

  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="flex justify-end">
        <button onClick={logout} className="btn btn-warning my-4">
          Deconnexion
        </button>
      </div>

      {/* Modal d'enregistrement */}
      {openModal && (
        <div className="absolute top-50 left-[40%] z-50 bg-dark w-[400px]">
          <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
              <h3 className="font-bold text-lg">Nouvelle Depense</h3>
              <p className="py-4">Ajouter une nouvelle depense</p>

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

                  <button className="btn btn-warning">Enregistrer</button>
                </div>
              </form>

              <button className="btn" onClick={() => setOpenModal(v => !v)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="card  text-neutral-content border-2 border-warning/10 bg-warning/5 p-5">
        <button
          className="btn btn-warning w-full mb-6"
          onClick={(v) => setOpenModal((v) => !v)}
        >
          Ajouter une depense
        </button>

        <table className="table w-fll">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Decription</th>
              <th>Montant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {depenses.map((depense) => (
              <tr key={depense.id}>
                <th>{depense.id}</th>
                <td>{depense.date}</td>
                <td>{depense.description}</td>
                <td className="text-success font-bold">
                  {depense.montant.toLocaleString("XOF")} fcfa
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-info">Modifier</button>
                  <button className="btn btn-error">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Depense;
