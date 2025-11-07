import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction de modification des données de l'utilisateur
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Fonction de nettoyage des données de l'utilisateur
  const clearUser = () => {
    setUser(null);
  };

  // const register = async (data) => {
  //   // Lancement du changement
  //   setLoading(true);

  //   // Appel du service d'inscription
  //   await registerService(data)
  //     .then((res) => {
  //       // Stop le chagement
  //       setLoading(false);

  //       // Utilisateur inscrit avec succes
  //       if (res.data.success) {
  //         //Redirection sur la page de connexion
  //         navigate("/");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const login = async (data) => {
  //   // Lancement du changement
  //   setLoading(true);

  //   await loginService(data)
  //     .then((res) => {
  //       // Stop le chagement
  //       setLoading(false);

  //       // L'utilisateur connecté avec succès
  //       if (res.data.success) {
  //         // Stockage du token dans le localstorage
  //         localStorage.setItem("token", res.data.token);

  //         //Redirection sur la page de connexion
  //         navigate("/depenses");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  return (
    <AuthContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
