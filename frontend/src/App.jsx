import "./App.css";
import AddUSER from "./AjouterPersonne";
import ListeUSER from "./Liste";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ListeUSER />} />
          <Route path="/add" element={<AddUSER />}>
            {/* Nous imbriquons nos composants dans survey */}
            {/* <Route path="client" element={<ClientForm />} /> */}
            {/* <Route path="freelance" element={<FreelanceForm />} /> */}
          </Route>
        </Routes>
      </Router>
      {/* <h1>Liste Des Personnes Qui Ont Participé Au WIFI</h1>
      <AddUSER />
      <ListeUSER /> */}
    </>
  );
}

export default App;
