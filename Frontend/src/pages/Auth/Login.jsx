import { useContext, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/Input";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorValidation, setErrorValidation] = useState("");

  // appel du useAuth
  const { login, loading, error } = useAuth();


  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des données
    if ( email == "" || password == "") {
      setErrorValidation("Veuillez remplir tous les champs svp !");
      return;
    }

    // Formation d'un objet user
    const user = { email, password };

    // Connexion de l'utilisateur
    login(user)
  };

  return (
    <div className="flex items-center justify-center my-46">
      <div className="card text-neutral-content border-2 border-warning/10 bg-warning/5 p-5 flex flex-col gap-6 w-[700px]">

        {/* Message d'erreur de validation*/}
        {errorValidation !== "" && <span className="alert alert-danger">{errorValidation}</span>}

         {/* Message d'erreur de l'authentification*/}
        {error !== "" && <span className="alert alert-danger">{error}</span>}

        <div className="flex flex-col gap-3">
          <label>Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col gap-3">
          <label>Mot de passe</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="mot de passe"
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-warning">Connexion</button>

        <span>
          Vous n'avez pas de compte ?{" "}
          <a href="/register" className="text-warning">
            Inscrivez-vous
          </a>
        </span>
      </div>
    </div>
  );
}

export default Login;
