import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";
import useAuth from "../hooks/useAuth";
import useDepense from "../hooks/useDepense";
import Input from "../components/Input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../components/UpdateModal";

const Depense = () => {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Les states de depense
  const [montant, setMontant] = useState("");
  const [description, setDescription] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  // L'id de la depense à modifier
  const [idUpdate, setIdUpdate] = useState(0);

  // Controle de la page
  const [currentPage, setCurrentPage] = useState(1);

  const { logout } = useAuth();
  const {
    allDepenses,
    createDepense,
    deleteDepense,
    depenses,
    loading,
    pagination,
  } = useDepense();

  useEffect(() => {
    allDepenses(currentPage);
  }, [currentPage]);

  // Fonction de changement de page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

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

    setOpenModal(false);

    // Rafraichissement de la page
    navigate("/");
  };

  // Suppression d'une depense
  const handleDelete = (id) => {
    // Supprime la depense
    deleteDepense(id);

    // Rafraichissement de la page
    navigate("/");
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

              <button className="btn" onClick={() => setOpenModal((v) => !v)}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification */}
      {openUpdateModal && (
        <UpdateModal
          idUpdate={idUpdate}
          setOpenUpdateModal={setOpenUpdateModal}
        />
      )}

      {/* Affichage des depenses */}
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
                  <button
                    className="btn btn-info"
                    onClick={(v) => {
                      setOpenUpdateModal((v) => !v);
                      setIdUpdate(depense.id);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(depense.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-sm"
          >
            Précédent
          </button>

          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
            (page) => (
              <button
                onClick={() => handlePageChange(page)}
               key={page}
                className={`btn btn-sm ${page === currentPage ? "btn-warning" : ""}`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.last_page}
            className="btn btn-sm"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default Depense;
