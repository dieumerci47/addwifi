import AddUSER from "../AjouterPersonne";
// import ListeUSER from "../Liste";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Paiement from "../Paiement";
/* import LoginForm from "../log/LoginForm";
import SignupForm from "../log/SignupForm";
import Index from "../log/Index"; */
import Navbar from "../log/Navbar";
import Home from "../Home";
// import Acceuil from "../Acceuil";
const Routess = () => {
  return (
    <>
      <Router>
        <>
          <Navbar />
        </>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paiement" element={<Paiement />} />
          <Route path="*" element={<Home />} />
          {/* <Route path="/signin" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/log" element={<Index Signup={false} Login={true} />} />
          <Route path="/signup" element={<SignupForm />} /> */}
          <Route path="/add" element={<AddUSER />}>
            {/* Nous imbriquons nos composants dans survey */}
            {/* <Route path="client" element={<ClientForm />} /> */}
            {/* <Route path="freelance" element={<FreelanceForm />} /> */}
          </Route>
        </Routes>

        {/* <h1>Liste Des Personnes Qui Ont Participé Au WIFI</h1>
      <AddUSER />
      <ListeUSER /> */}
      </Router>
    </>
  );
};
export default Routess;
