import { useEffect, useState } from "react";
import "./Liste.css";

import { URL } from "./Tool";

const Visiteur = () => {
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

  // Filtres affichés dans les selects
  const [moisSelect, setMoisSelect] = useState("");
  const [anneeSelect, setAnneeSelect] = useState("");

  // Filtres appliqués
  const [mois, setMois] = useState(allMoth[currentMth]);
  const [annee, setAnnee] = useState(currentYear);

  // Données
  const [users, setUsers] = useState([]);
  const [filteredPaiements, setFilteredPaiements] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast
  const [showToast, setShowToast] = useState(false);

  // Redux
  const Uid = "6846e3b5963f0b81d606eb26";

  // Fetch des utilisateurs
  useEffect(() => {
    setLoading(true);
    fetch(`${URL}/wifi/visiteur`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.filter((user) => user.admin === Uid));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError("Erreur lors du chargement des utilisateurs");
      });
  }, [Uid]);

  // Filtrer les paiements
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

  // Appliquer les filtres
  useEffect(() => {
    const paiements = filterPaiements(mois, annee);
    setFilteredPaiements(paiements);
  }, [users, mois, annee]);

  // Récupérer tous les mois disponibles
  const availableMonths = Array.from({ length: currentMth + 2 }, (_, index) => {
    const date = new Date(currentYear, index);
    return new Intl.DateTimeFormat("fr-FR", { month: "long" })
      .format(date)
      .toUpperCase();
  });

  // Récupérer les années (cette année et l'année prochaine)
  const years = [currentYear, currentYear + 1];

  // Bouton VOIR
  const handleVoir = () => {
    if (!moisSelect || !anneeSelect) {
      setError("Veuillez sélectionner un mois et une année");
      return;
    }
    setError("");
    setMois(moisSelect);
    setAnnee(anneeSelect);
  };

  // Calcul du total
  const total = filteredPaiements.reduce(
    (acc, paiement) => acc + Number(paiement.prix),
    0
  );

  // Disparition automatique du toast
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
            id="annee"
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
              <tr key={`${paiement.userId}-${paiement.mois}-${paiement.annee}`}>
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
    </div>
  );
};

export default Visiteur;
