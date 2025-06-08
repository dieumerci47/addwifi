import { useContext } from "react";
import UidContext from "./AppContent";
import Index from "./log/Index";
import ListeUSER from "./Liste";

const Home = () => {
  const Uid = useContext(UidContext);
  console.log("Uid Home : " + Uid);
  //   const LOCAL = "http://localhost:5000";
  //   const dm = true;

  return (
    <>
      {Uid ? (
        <>
          <ListeUSER />
        </>
      ) : (
        <div className="log-container">
          <Index Login={true} Signup={false} />
        </div>
      )}
    </>
  );
};

export default Home;
