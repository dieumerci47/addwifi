import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AjouterPersonne.css";

const AddUSER = () => {
  const [newUser, setNewUser] = useState({
    nom: "",
    prix: "",
    mois: "",
    annee: "",
  });

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [emailAdmin, setEmailAdmin] = useState("");
  const [pwdAdmin, setPwdAdmin] = useState("");

  const [error, setError] = useState("");

  const [showToast, setShowToast] = useState(false);

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

  // Données de l'administrateur
  const DATA = {
    email: emailAdmin,
    password: pwdAdmin,
  };

  // Obtenir le mois actuel
  const currentDate = new Date();
  const currentMth = currentDate.getMonth();

  // Créer un tableau de mois disponibles jusqu'au mois actuel
  const availableMonths = Array.from({ length: currentMth + 1 }, (_, index) => {
    const date = new Date(2024, index);
    return new Intl.DateTimeFormat("fr-FR", { month: "long" })
      .format(date)
      .toUpperCase();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Vérifier si tous les champs sont remplis
    if (!newUser.nom || !newUser.prix || !newUser.mois || !newUser.annee) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    setShowAdminModal(true);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    // Vérifier les identifiants admin
    if (!emailAdmin || !pwdAdmin) {
      setError("Veuillez remplir tous les champs administrateur");
      return;
    }
    try {
      const response = await fetch("https://addwifi.onrender.com/wifi/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DATA),
      });
      if (!response.ok) {
        if (response.status == 403) {
          setError("Admin non trouvé");
        }
        // setError("Identifiant admnistrateur incorrect");
        throw new Error(
          `HTTP error! statu: ${response.status} :${response.err}`
        );
      }
      const DATAS = {
        nom: newUser.nom,
        prix: newUser.prix,
        mois: newUser.mois.toLowerCase(),
        annee: newUser.annee,
      };
      const result = await response.json();
      if (result) {
        await fetch("https://addwifi.onrender.com/wifi/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(DATAS),
        });
        // Ici vous pourrez ajouter la logique pour sauvegarder les données
        console.log("Nouvelle personne :", newUser);
        setShowAdminModal(false);
        setError("");
        // Réinitialiser le formulaire
        setNewUser({
          nom: "",
          prix: "",
          mois: "",
          annee: "",
        });
        setEmailAdmin("");
        setPwdAdmin("");
        setShowToast(true); // Afficher le toast après succès
      } else {
        setError("Identifiants administrateur incorrects");
      }
      // setData(result);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setError("Identifiants administrateur incorrects");
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
          <label htmlFor="prix">Prix:</label>
          <input
            type="number"
            id="prix"
            name="prix"
            value={newUser.prix}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mois">Mois:</label>
          <select
            id="mois"
            name="mois"
            value={newUser.mois}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un mois</option>
            {availableMonths.map((mois) => (
              <option key={mois} value={mois}>
                {mois}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="annee">Année:</label>
          <select
            id="annee"
            name="annee"
            value={newUser.annee}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une année</option>
            {[2025].map((annee) => (
              <option key={annee} value={annee}>
                {annee}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Ajouter</button>
      </form>

      {showAdminModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmation Administrateur</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAdminSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nom d&apos;utilisateur:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={emailAdmin}
                  onChange={(e) => {
                    setEmailAdmin(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={pwdAdmin}
                  onChange={(e) => {
                    setPwdAdmin(e.target.value);
                    setError("");
                  }}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit">Confirmer</button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminModal(false);
                    setError("");
                    setEmailAdmin("");
                    setPwdAdmin("");
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
