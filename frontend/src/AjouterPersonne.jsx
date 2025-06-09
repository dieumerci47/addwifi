import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./AjouterPersonne.css";
import UidContext from "./AppContent";

const AddUSER = () => {
  const Uid = useContext(UidContext);
  const [newUser, setNewUser] = useState({
    nom: "",
    telephone: "",
  });

  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);
  const URL = "https://addwifi.onrender.com";
  // const LOCAL = "http://localhost:5000";

  // Effet pour gérer la disparition automatique du toast
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // Disparaît après 3 secondes
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifier si tous les champs sont remplis
    if (!newUser.nom || !newUser.telephone) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    try {
      const DATAS = {
        nom: newUser.nom,
        telephone: newUser.telephone,
        admin: Uid,
      };

      await fetch(`${URL}/wifi/user/adduser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DATAS),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setError("");
          // Réinitialiser le formulaire
          setNewUser({
            nom: "",
            telephone: "",
          });

          setShowToast(true); // Afficher le toast après succès
        });

      // setData(result);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setError(err.message);
    } finally {
      // setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: name === "prix" ? Number(value) : value,
    }));
    setError(""); // Effacer l'erreur quand l'utilisateur commence à taper
  };

  return (
    <div className="form-container">
      <div className="header-container">
        <h2>Ajouter une Personne</h2>
        <Link to="/" className="back-button">
          Retour à la liste
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={newUser.nom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prix">Telephone:</label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            pattern="[0-9]{9}"
            placeholder="EX:06 606 66 66"
            value={newUser.telephone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Ajouter</button>
      </form>

      {showToast && (
        <div className="toast-container">
          <div className="toast success">
            <div className="toast-content">
              <i className="check-icon">✓</i>
              <div className="message">
                <span className="text text-1">Succès</span>
                <span className="text text-2">
                  Personne ajoutée avec succès!
                </span>
              </div>
            </div>
            <div className="progress"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUSER;
