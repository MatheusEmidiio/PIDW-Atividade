import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EquipamentosCadastro.css";

export default function EquipamentosCadastro() {
  const navigate = useNavigate();
  const { id } = useParams();

  const chave = "rotary_equipamentos_v1";

  const [form, setForm] = useState({
    tipo: "",
   
    estado: "",
    dataAquisicao: "",
  });

 
  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem(chave);
      const lista = saved ? JSON.parse(saved) : [];

      const equipamento = lista.find((item) => item.id == id);

      if (equipamento) {
        setForm(equipamento);
      }
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

  
    const saved = localStorage.getItem(chave);
    const lista = saved ? JSON.parse(saved) : [];

    let novaLista;

    if (id) {
      novaLista = lista.map((item) =>
        item.id == id ? { ...form, id: Number(id) } : item
      );
    }


    else {
      const novoEquip = {
        ...form,
        id: Date.now(),
      };
      novaLista = [novoEquip, ...lista];
    }

    localStorage.setItem(chave, JSON.stringify(novaLista));

    navigate("/lista-equipamentos");
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2 className="cadastro-title">
          {id ? "Editar Equipamento" : "Cadastrar Equipamento"}
        </h2>

        <form className="form-equip" onSubmit={handleSubmit}>
          <div>
            <label>Tipo do Equipamento</label>
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Selecione...</option>
              <option value="Cadeira de Rodas">Cadeira de Rodas</option>
              <option value="Muleta">Muleta</option>
              <option value="Bengala">Bengala</option>
              <option value="Andador">Andador</option>
            </select>
          </div>

   

          <div>
            <label>Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange}>
              <option value="">Selecione...</option>
              <option value="Disponível">Disponível</option>
              <option value="Emprestado">Emprestado</option>
              <option value="Manutenção">Manutenção</option>
            </select>
          </div>

          <div>
            <label>Data de Aquisição</label>
            <input
              type="date"
              name="dataAquisicao"
              value={form.dataAquisicao}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-cadastrar">
            {id ? "Salvar Alterações" : "Salvar Equipamento"}
          </button>
        </form>
      </div>
    </div>
  );
}
