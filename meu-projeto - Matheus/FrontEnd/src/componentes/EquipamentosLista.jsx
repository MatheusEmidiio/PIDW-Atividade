import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EquipamentosLista.css";

export default function EquipamentosLista() {
  const chave = "rotary_equipamentos_v1";
  const navigate = useNavigate();

  const [equipamentos, setEquipamentos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(chave);
    setEquipamentos(saved ? JSON.parse(saved) : []);
  }, []);


  function excluir(id) {
    if (!confirm("Confirma exclusão?")) return;

    const filtrado = equipamentos.filter((item) => item.id !== id);

    localStorage.setItem(chave, JSON.stringify(filtrado));
    setEquipamentos(filtrado);
  }


  const [filtro, setFiltro] = useState("");

  const listaFiltrada = equipamentos.filter((item) =>
    (item.tipo + item.codigo + item.estado + item.dataAquisicao)
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  return (
    <div className="prototype-screen active">
      <div className="screen-frame">
        <div className="screen-header">
          <h3>Lista de Equipamentos</h3>
        </div>

        <div className="screen-content">
          <input
            type="text"
            placeholder="Filtrar…"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
            }}
          />

          <table className="equip-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tipo</th>
            
              <th>Estado</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {listaFiltrada.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Nenhum equipamento encontrado.
                  </td>
                </tr>
              ) : (
                listaFiltrada.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tipo}</td>
        
                    <td>{item.estado}</td>
                    <td>{item.dataAquisicao}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/equipamentos/${item.id}`)}
                      >
                        Editar
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => excluir(item.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
