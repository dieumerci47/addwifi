import { useState } from "react";
import "./FormConnexion.css";
import { URL } from "../Tool";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const URL = "https://addwifi.onrender.com";
  // const LOCAL = "http://localhost:5000";
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const admin = { email, password };
    fetch(`${URL}/wifi/login/signin`, {
      method: "POST",
      body: JSON.stringify(admin),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.errors || data.error) {
          // Gestion de différents formats d'erreur
          if (data && data.errors) {
            throw new Error(
              typeof data.errors === "string"
                ? data.errors
                : JSON.stringify(data.errors)
            );
          } else if (data && data.error) {
            throw new Error(
              typeof data.error === "string"
                ? data.error
                : JSON.stringify(data.error)
            );
          } else if (data && data.message) {
            throw new Error(data.message);
          } else {
            throw new Error("Erreur de connexion");
          }
        } else {
          window.location.href = "/";
          console.log(data);
        }
      })
      .catch((err) => {
        setError(err.message || "Erreur de connexion");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-title">Connexion</div>
      {error && <div className="error-message">{error}</div>}
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
        {loading ? "En cours..." : "Se connecter"}
      </button>
    </form>
  );
};

export default LoginForm;
