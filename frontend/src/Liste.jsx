import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Liste.css";

const ListeUSER = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMth = currentDate.getMonth();

  // Données des utilisateurs
  const [data, setData] = useState([]);
  const [mois, setMois] = useState("");
  const [annee, setAnne] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DATA = {
    mois,
    annee,
  };

  // Créer un tableau de mois disponibles en utilisant Intl.DateTimeFormat
  const availableMonths = Array.from({ length: currentMth + 1 }, (_, index) => {
    const date = new Date(currentYear, index);
    return new Intl.DateTimeFormat("fr-FR", { month: "long" })
      .format(date)
      .toUpperCase();
  });
  useEffect(() => {
    /*     setMois(availableMonths[availableMonths.length - 1]);
    setAnne(currentYear); */
    let GetDATA = async () => {
      try {
        const response = await fetch("https://addwifi.onrender.com/wifi/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mois: availableMonths[availableMonths.length - 1],
            annee: currentYear,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
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

    GetDATA();
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

    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://addwifi.onrender.com/wifi/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DATA),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
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
  return (
    <div className="liste-container">
      <h1>Liste Des Personnes Qui Ont Participé Au WIFI</h1>

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

      {data.length > 0 ? (
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
              <tr key={personne._id}>
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
    </div>
  );
};

export default ListeUSER;
