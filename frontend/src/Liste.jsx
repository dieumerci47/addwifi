import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Liste.css";

const ListeUSER = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMth = currentDate.getMonth();
  const allMoth = [
    "JANVIER",
    "FÉVRIER",
    "MARS",
    "AVRIL",
    "MAI",
    "JUIN",
    "JUILLET",
    "AOUT",
    "SEPTEMBRE",
    "OCTOBRE",
    "NOVEMBRE",
    "DÉCEMBRE",
  ];

  // Données des utilisateurs
  const [data, setData] = useState([]);
  const [mois, setMois] = useState("");
  const [annee, setAnne] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [debut, setDebut] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [emailAdmin, setEmailAdmin] = useState("");
  const [pwdAdmin, setPwdAdmin] = useState("");
  const [showToast, setShowToast] = useState(false);

  const DATA = {
    mois,
    annee,
  };
  let GetDATA = async (data) => {
    try {
      const response = await fetch("https://addwifi.onrender.com/wifi/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        setDebut(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setDebut(false);
      setData(result);
    } catch (err) {
      console.error("Erreur lors de la récupération des données:", err);
      setError(
        "Erreur lors de la récupération des données. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  // Créer un tableau de mois disponibles en utilisant Intl.DateTimeFormat
  const availableMonths = Array.from({ length: currentMth + 2 }, (_, index) => {
    const date = new Date(currentYear, index);
    return new Intl.DateTimeFormat("fr-FR", { month: "long" })
      .format(date)
      .toUpperCase();
  });
  const dataDebut = { mois: allMoth[currentMth], annee: currentYear };
  useEffect(() => {
    /*     setMois(availableMonths[availableMonths.length - 1]);
    setAnne(currentYear); */

    GetDATA(dataDebut);
  }, []);
  const years = [];
  for (let year = currentYear; year <= currentYear + 1; year++) {
    years.push(year);
  }
  const HANDLECLICK = async () => {
    if (!mois || !annee) {
      setError("Veuillez sélectionner un mois et une année");
      console.log();

      return;
    }
    setDebut(true);
    setLoading(true);
    setError("");

    GetDATA(DATA);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setEditedPrice(user.prix);
    setEditError("");
  };

  // Effet pour gérer la disparition automatique du toast
  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showToast]);

  const handleUpdatePrice = async () => {
    if (!editedPrice) {
      setEditError("Veuillez entrer un prix");
      return;
    }
    setShowAdminModal(true);
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    if (!emailAdmin || !pwdAdmin) {
      setEditError("Veuillez remplir tous les champs administrateur");
      return;
    }

    setEditLoading(true);
    setEditError("");

    try {
      // Vérifier les identifiants admin
      const adminResponse = await fetch(
        "https://addwifi.onrender.com/wifi/admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailAdmin,
            password: pwdAdmin,
          }),
        }
      );

      if (!adminResponse.ok) {
        throw new Error("Identifiants administrateur incorrects");
      }

      const adminResult = await adminResponse.json();

      if (adminResult.response) {
        // Si admin validé, procéder à la mise à jour
        const updateResponse = await fetch(
          `https://addwifi.onrender.com/wifi/user/${selectedUser._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prix: Number(editedPrice),
              id: selectedUser._id,
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        // Mettre à jour les données localement
        setData(
          data.map((user) =>
            user._id === selectedUser._id
              ? { ...user, prix: Number(editedPrice) }
              : user
          )
        );

        // Réinitialiser les états
        setShowAdminModal(false);
        setSelectedUser(null);
        setEditedPrice("");
        setEmailAdmin("");
        setPwdAdmin("");
        setShowToast(true);
      }
    } catch (err) {
      console.error("Erreur:", err);
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="liste-container">
      <h1>Liste Des Personnes Qui Ont Participé Au WIFI</h1>

      {selectedUser && (
        <div className="edit-container">
          <h3>Modifier le prix pour {selectedUser.nom.toUpperCase()}</h3>
          {editError && <div className="error-message">{editError}</div>}
          <div className="edit-form">
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              placeholder="Nouveau prix"
              min="0"
            />
            <div className="edit-buttons">
              <button
                onClick={handleUpdatePrice}
                disabled={editLoading}
                className="update-button"
              >
                {editLoading ? "Modification..." : "Valider"}
              </button>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setEditedPrice("");
                  setEditError("");
                }}
                className="cancel-button"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="actions-container">
        <button className="add-button">
          <Link to="/add">Ajouter une personne</Link>
        </button>

        <div className="filters">
          <select
            name="mois"
            id="mois"
            className="select-filter"
            value={mois}
            onChange={(e) => setMois(e.target.value)}
            required
          >
            <option value="">Sélectionnez un mois</option>
            {availableMonths.map((mois, index) => (
              <option key={index} value={mois}>
                {mois}
              </option>
            ))}
          </select>
          <select
            name="annee"
            id="anne"
            className="select-filter"
            value={annee}
            onChange={(e) => setAnne(e.target.value)}
            required
          >
            <option value="">Sélectionnez une année</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          <button
            className="voir-button"
            onClick={HANDLECLICK}
            disabled={loading}
          >
            {loading ? "Chargement..." : "VOIR"}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {debut ? (
        <p className="no-datas">Chargement</p>
      ) : data.length > 0 ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>N°</th>
              <th>NOM</th>
              <th>PRIX</th>
              <th>MOIS</th>
              <th>ANNEE</th>
            </tr>
          </thead>
          <tbody>
            {data.map((personne, index) => (
              <tr
                key={personne._id}
                onClick={() => handleRowClick(personne)}
                className={
                  selectedUser?._id === personne._id ? "selected-row" : ""
                }
              >
                <td>{index + 1}</td>
                <td>{personne.nom.toUpperCase()}</td>
                <td>{personne.prix}</td>
                <td>{personne.mois.toUpperCase()}</td>
                <td>{personne.annee}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <strong>Nbre: {data.length}</strong>
              </td>
              <td></td>
              <td>
                <strong>
                  Total: {data.reduce((acc, current) => acc + current.prix, 0)}
                </strong>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        !error &&
        !loading && <p className="no-data">Aucune donnée à afficher</p>
      )}

      {showAdminModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirmation Administrateur</h3>
            {editError && <div className="error-message">{editError}</div>}
            <form onSubmit={handleAdminSubmit}>
              <div className="form-group">
                <label htmlFor="username">Email:</label>
                <input
                  type="text"
                  id="username"
                  value={emailAdmin}
                  onChange={(e) => {
                    setEmailAdmin(e.target.value);
                    setEditError("");
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input
                  type="password"
                  id="password"
                  value={pwdAdmin}
                  onChange={(e) => {
                    setPwdAdmin(e.target.value);
                    setEditError("");
                  }}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" disabled={editLoading}>
                  {editLoading ? "Validation..." : "Confirmer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAdminModal(false);
                    setEmailAdmin("");
                    setPwdAdmin("");
                    setEditError("");
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
                <span className="text text-2">Prix modifié avec succès!</span>
              </div>
            </div>
            <div className="progress"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeUSER;
