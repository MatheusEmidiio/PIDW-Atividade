import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="prototype-container">
      <div className="header">
        <h1>🎡 RotaryAssist</h1>
        <p>Sistema de Gerenciamento de Equipamentos de Mobilidade</p>
      </div>

      <div className="nav-tabs">
        <Link to="/dashboard" className="nav-tab">Dashboard</Link>
        <Link to="/equipamentos" className="nav-tab">Equipamentos</Link>
        <Link to="/lista-equipamentos" className="nav-tab">Lista de Equipamentos</Link>
        <Link to="/beneficiarios" className="nav-tab">Beneficiários</Link>
        <Link to="/Membros" className="nav-tab">Membros</Link>
        <Link to="/emprestimos" className="nav-tab">Empréstimos</Link>
        <Link to="/devolucoes" className="nav-tab">Devoluções</Link>
      
        <Link to="/manutencao" className="nav-tab">Manutenção</Link>
      </div>
    </div>
  );
}

export default Header;

