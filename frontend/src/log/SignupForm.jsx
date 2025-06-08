import { useState } from "react";
import LoginForm from "./LoginForm";
import "./FormConnexion.css";

const SignupForm = () => {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  //const URL = "https://addwifi.onrender.com";
  const LOCAL = "http://localhost:5000";
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'inscription ici
    const admin = { nom, email, password };
    fetch(`${LOCAL}/wifi/login/signup`, {
      method: "POST",
      body: JSON.stringify(admin),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFormSubmit(true);
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
          <div className="form-group">
            <label>Nom:</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      )}
    </>
  );
};

export default SignupForm;
