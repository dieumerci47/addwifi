import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./AjouterPersonne.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../action/UsersAction";
const Paiement = () => {
  const Uid = useSelector((state) => state.OneAdminReducer._id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  let USERS = useSelector((state) => state.UsersReducer);
  let users;
  USERS.length > 0
    ? (users = USERS.filter((user) => user.admin === Uid))
    : (users = []);

  const [newUser, setNewUser] = useState({
    userId: "",
    nom: "",
    prix: "",
    mois: "",
    annee: "",
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

  // Obtenir le mois actuel
  const currentDate = new Date();
  const currentMth = currentDate.getMonth();

  // Créer un tableau de mois disponibles jusqu'au mois actuel
  const availableMonths = Array.from({ length: currentMth + 2 }, (_, index) => {
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
    // setShowAdminModal(true);
    handleAdminSubmit(e);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();

    try {
      const DATAS = {
        userId: newUser.userId,
        nom: newUser.nom,
        prix: newUser.prix,
        mois: newUser.mois.toLowerCase(),
        annee: newUser.annee,
      };

      await fetch(`${URL}/wifi/admin/payment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DATAS),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          // Ici vous pourrez ajouter la logique pour sauvegarder les données
          setError("");
          // Réinitialiser le formulaire
          setNewUser({
            userId: "",
            prix: "",
            mois: "",
            annee: "",
          });

          setShowToast(true); // Afficher le toast après succès
        });

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
    if (name === "userId") {
      // Trouver la personne sélectionnée
      const selectedUser = users.find((u) => u._id === value);
      setNewUser((prev) => ({
        ...prev,
        userId: value,
        nom: selectedUser ? selectedUser.nom : "",
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: name === "prix" ? Number(value) : value,
      }));
    }
    setError("");
  };

  return (
    <div className="form-container">
      <div className="header-container">
        <h2>Paiement</h2>
        <Link to="/" className="back-button">
          Retour à la liste
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          {
            <select
              id="nom"
              name="userId"
              value={newUser.userId}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une Personne</option>
              {users.length > 0 ? (
                users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.nom}
                  </option>
                ))
              ) : (
                <option value="">Aucune personne trouvée</option>
              )}
            </select>
          }
          {/*  <input
              type="text"
              id="nom"
              name="nom"
              value={newUser.nom}
              onChange={handleChange}
              required
            /> */}
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

export default Paiement;
