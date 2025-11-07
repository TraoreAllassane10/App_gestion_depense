import { useContext, useState } from "react";
import { registerService, loginService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { updateUser } = useContext(AuthContext);

  const register = async (data) => {
    // Lancement du changement
    setLoading(true);

    // Appel du service d'inscription
    await registerService(data)
      .then((res) => {
        // Stop le chagement
        setLoading(false);

        // Utilisateur inscrit avec succes
        if (res.data.success) {
          //Redirection sur la page de connexion
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };

  const login = async (data) => {
    // Lancement du changement
    setLoading(true);

    await loginService(data)
      .then((res) => {
        // Stop le chagement
        setLoading(false);

        // L'utilisateur connecté avec succès
        if (res.data.success) {
          // Stockage du token dans le localstorage
          localStorage.setItem("token", res.data.token);

          //Mise à jour de la variable user de authContext
          updateUser(res.data.data);

          //Redirection sur la page de connexion
          navigate("/depenses");
        }

        // La connexion a echoué
        if (!res.data.success) {
          setError("Email ou Mot de passe incorrect");
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = async () => {
    localStorage.removeItem("token");
    navigate("/")
  };

  return { register, login, logout, loading, error };
}
