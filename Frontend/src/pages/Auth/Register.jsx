import { useState } from "react";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // appel du useAuth
  const { register, loading } = useAuth();

  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des données
    if (name == "" || email == "" || password == "") {
      setError("Veuillez remplir tous les champs svp !");
      return;
    }

    // Formation d'un objet user
    const user = { name, email, password };

    // Inscription de l'utilisateur
    register(user)
  };

  return (
    <div className="flex items-center justify-center my-46">
      <div className="card  text-neutral-content border-2 border-warning/10 bg-warning/5 p-5 flex flex-col gap-6 w-[700px]">
       {/* Message d'erreur */}
        {error !== "" && <span className="alert alert-danger">{error}</span>}

        <div className="flex flex-col gap-3">
          <label>Nom</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Email"
          />
        </div>

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

        <button onClick={handleSubmit} className="btn btn-warning">
          Inscription
        </button>

        <span>
          Vous avez déjà un compte ?{" "}
          <a href="/" className="text-warning">
            Connectez-vous
          </a>
        </span>
      </div>
    </div>
  );
};

export default Register;
