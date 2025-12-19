import { Routes, Route, Link, Form } from "react-router-dom";
import CadastroBeneficiario from "./componentes/Beneficiarios";
import Beneficiarios from "./componentes/Beneficiarios";
import EquipamentosCadastro from "./componentes/EquipamentosCadastro";
import EquipamentosLista from "./componentes/EquipamentosLista";
import Dashboard from "./componentes/Dashboard/Dashboard";
import Membros from "./componentes/membros";
import "./App.css";



function App() {
  return (
    <div>
   
      <Routes>
        <Route path="/" element={<EquipamentosCadastro />} />
        <Route path="/equipamentos/:id" element={<EquipamentosCadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/cadastro" element={<CadastroBeneficiario />} />
        <Route path="/beneficiarios" element={<Beneficiarios />} />
        <Route path="/Membros" element={<Membros/>} />
        <Route path="/equipamentos" element={<EquipamentosCadastro />} />
        <Route path="/lista-equipamentos" element={<EquipamentosLista />} />
      </Routes>
    </div>
  );
}

export default App;
