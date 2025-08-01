import { useContext } from "react";
import UidContext from "./AppContent";
import Index from "./log/Index";
import ListeUSER from "./Liste";
import "./HomeConnexion.css";

const Home = () => {
  const Uid = useContext(UidContext);

  if (Uid) {
    return <ListeUSER />;
  }

  return (
    <div className="home-main-container">
      <div className="home-left">
        <div className="home-left-content">
          <div className="home-title">WiFiManager</div>
          <div className="home-desc">
            Gérez facilement les abonnements de vos clients WiFi.
            <br />
            Suivi des paiements, gestion des utilisateurs, et accès rapide à
            l'état de chaque abonnement.
            <br />
            <br />
            <b>
              Simple, rapide et efficace pour les gestionnaires de réseaux
              locaux.
            </b>
          </div>
        </div>
      </div>
      <div className="home-right">
        <Index Login={true} Signup={false} />
      </div>
    </div>
  );
};

export default Home;
