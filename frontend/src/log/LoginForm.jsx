import { useState } from "react";
import "./FormConnexion.css";
import { URL } from "../Tool";
import { supabase } from "./../supabase/supabase";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const URL = "https://addwifi.onrender.com";
  // const LOCAL = "http://localhost:5000";

  const handleSubmite = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(true);
    } else {
      window.location.href = "/";
    }
    /*   let Users = await supabase.auth.getUser();
    console.log(Users);
    console.log(Users.data.user); */
  };
  return (
    <form className="form-container" onSubmit={handleSubmite}>
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
