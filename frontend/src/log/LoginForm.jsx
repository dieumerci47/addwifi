import { useState } from "react";
import "./FormConnexion.css";
import { useDispatch } from "react-redux";
import { login } from "../../action/AuthAction";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    dispatch(login(email, password))
      .then(() => {
        navigate("/");
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
