import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Liste.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../action/UsersAction";
import { URL } from "./Tool";

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

  // Filtres affichés dans les selects (contrôlés, mais non appliqués tant que "VOIR" n'est pas cliqué)
  const [moisSelect, setMoisSelect] = useState("");
  const [anneeSelect, setAnneeSelect] = useState("");

  // Filtres réellement appliqués
  const [mois, setMois] = useState(allMoth[currentMth]);
  const [annee, setAnne] = useState(currentYear);

  // Données à afficher
  const [filteredPaiements, setFilteredPaiements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Popup modification prix
  const [selectedPaiement, setSelectedPaiement] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  // Toast
  const [showToast, setShowToast] = useState(false);

  // Redux
  const Uid = useSelector((state) => state.OneAdminReducer._id);
  const dispatch = useDispatch();
  const USERS = useSelector((state) => state.UsersReducer);

  // Récupérer les utilisateurs de l'admin courant
  const users =
    USERS.length > 0 ? USERS.filter((user) => user.admin === Uid) : [];

  // Récupérer tous les mois disponibles jusqu'au mois actuel
  const availableMonths = Array.from({ length: currentMth + 2 }, (_, index) => {
    const date = new Date(currentYear, index);
    return new Intl.DateTimeFormat("fr-FR", { month: "long" })
      .format(date)
      .toUpperCase();
  });

  // Récupérer les années (cette année et l'année prochaine)
  const years = [];
  for (let year = currentYear; year <= currentYear + 1; year++) {
    years.push(year);
  }

  // Fonction pour filtrer les paiements selon le mois et l'année
  const filterPaiements = (moisFiltre, anneeFiltre) => {
    let paiements = [];
    users.forEach((user) => {
      if (user.paiements && Array.isArray(user.paiements)) {
        user.paiements.forEach((paiement) => {
          if (
            paiement.mois &&
            paiement.annee &&
            paiement.mois.toUpperCase() === moisFiltre &&
            String(paiement.annee) === String(anneeFiltre)
          ) {
            paiements.push({
              ...paiement,
              nom: user.nom,
              userId: user._id,
            });
          }
        });
      }
    });
    return paiements;
  };

  // Premier chargement : paiements du mois et année en cours
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Appliquer le filtre quand mois/annee changent (mais pas lors de la sélection dans le select)
  useEffect(() => {
    if (mois == "AOUT") setMois("AOÛT");
    setLoading(true);
    setError("");
    const paiements = filterPaiements(mois, annee);
    setFilteredPaiements(paiements);
    setLoading(false);
  }, [USERS, Uid, mois, annee]);

  // Quand on clique sur "VOIR"
  const handleVoir = () => {
    if (!moisSelect || !anneeSelect) {
      setError("Veuillez sélectionner un mois et une année");
      return;
    }
    setError("");
    setMois(moisSelect);
    setAnne(anneeSelect);
  };

  // Calcul du total
  const total = filteredPaiements.reduce(
    (acc, paiement) => acc + Number(paiement.prix),
    0
  );

  // Gérer la modification du prix
  const handleRowClick = (paiement) => {
    setSelectedPaiement(paiement);
    setNewPrice(paiement.prix);
    setEditError("");
  };

  const handleEditPrice = async (e) => {
    e.preventDefault();
    if (!newPrice) {
      setEditError("Veuillez entrer un prix");
      return;
    }
    setEditLoading(true);
    setEditError("");
    try {
      // Appel API pour modifier le prix (à adapter selon ton backend)
      // const URL = "https://addwifi.onrender.com";
      // const LOCAL = "http://localhost:5000";
      console.log(selectedPaiement.userId);
      const res = await fetch(`${URL}/wifi/user/${selectedPaiement.userId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedPaiement.userId,
          paiementId: selectedPaiement._id,
          prix: Number(newPrice),
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      // Met à jour localement
      setFilteredPaiements((prev) =>
        prev.map((p) =>
          p._id === selectedPaiement._id ? { ...p, prix: Number(newPrice) } : p
        )
      );
      setSelectedPaiement(null);
      setNewPrice("");
      setShowToast(true);
    } catch {
      setEditError("Erreur lors de la modification");
    } finally {
      setEditLoading(false);
    }
  };

  // Gestion de la disparition automatique du toast
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="liste-container">
      <h1>Liste Des Paiements WiFi</h1>
      <div className="actions-container">
        <button className="add-button">
          <Link to="/add">Ajouter une personne</Link>
        </button>
        <button className="add-buttons">
          <Link to="/paiement">Paiement</Link>
        </button>

        <div className="filters">
          <select
            name="mois"
            id="mois"
            className="select-filter"
            value={moisSelect}
            onChange={(e) => setMoisSelect(e.target.value)}
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
            value={anneeSelect}
            onChange={(e) => setAnneeSelect(e.target.value)}
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
            onClick={handleVoir}
            disabled={loading}
          >
            {loading ? "Chargement..." : "VOIR"}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p className="no-datas">Chargement...</p>
      ) : filteredPaiements.length > 0 ? (
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
            {filteredPaiements.map((paiement, index) => (
              <tr
                key={
                  paiement.userId + "-" + paiement.mois + "-" + paiement.annee
                }
                onClick={() => handleRowClick(paiement)}
                style={{ cursor: "pointer" }}
              >
                <td>{index + 1}</td>
                <td>{paiement.nom.toUpperCase()}</td>
                <td>{paiement.prix}</td>
                <td>{paiement.mois.toUpperCase()}</td>
                <td>{paiement.annee}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <strong>Nbre: {filteredPaiements.length}</strong>
              </td>
              <td></td>
              <td>
                <strong>Total: {total}</strong>
              </td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      ) : (
        !error && <p className="no-data">Aucune donnée à afficher</p>
      )}

      {/* Toast de succès */}
      {showToast && (
        <div className="toast-container">
          <div className="toast success">
            <div className="toast-content">
              <i className="check-icon">✓</i>
              <div className="message">
                <span className="text text-1">Succès</span>
                <span className="text text-2">Prix modifié avec succès !</span>
              </div>
            </div>
            <div className="progress"></div>
          </div>
        </div>
      )}

      {/* Popup modification prix */}
      {selectedPaiement && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modifier le prix pour {selectedPaiement.nom.toUpperCase()}</h3>
            {editError && <div className="error-message">{editError}</div>}
            <form onSubmit={handleEditPrice}>
              <div className="form-group">
                <label>Nouveau prix :</label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  min="0"
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn-valider" disabled={editLoading}>
                  {editLoading ? "Modification..." : "Valider"}
                </button>
                <button type="button" className="btn-annuler" onClick={() => setSelectedPaiement(null)}>
                  Annuler
                </button>
                <button
                  className="btn-supprimer"
                  type="button"
                  onClick={() => setSelectedPaiement(null)}
                >
                  Supprimer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeUSER;
