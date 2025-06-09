import { useState } from "react";
import LoginForm from "./LoginForm";
import "./FormConnexion.css";

const SignupForm = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = "https://addwifi.onrender.com";
  // const LOCAL = "http://localhost:5000";
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const admin = { nom, email, password };
    fetch(`${URL}/wifi/login/signup`, {
      method: "POST",
      body: JSON.stringify(admin),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data) {
          if (data.keyValue.email) {
            throw new Error("Email déjà utilisé");
          } else {
            throw new Error(data || "Erreur d'inscription");
          }
        }
        setFormSubmit(true);
      })
      .catch((err) => {
        setError(err.message || "Erreur d'inscription");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {formSubmit ? (
        <>
          <LoginForm />
          <span></span>
          <p>Enregistrement réussi. Connectez-vous</p>
        </>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-title">Créer un compte</div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label>Nom:</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "En cours..." : "Créer un compte"}
          </button>
        </form>
      )}
    </>
  );
};

export default SignupForm;
