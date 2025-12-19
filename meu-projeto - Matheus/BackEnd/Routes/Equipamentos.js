const express = require("express");
const router = express.Router();
const db = require("../db");


router.get("/", (req, res) => {
  const { q, tipo, patrimonio } = req.query;
  let sql = "SELECT * FROM equipamentos";
  const where = [];
  const params = [];
  if (q) {
    where.push("(nome LIKE ? OR descricao LIKE ?)");
    params.push(`%${q}%`, `%${q}%`);
  }
  if (tipo) {
    where.push("tipo = ?");
    params.push(tipo);
  }
  if (patrimonio) {
    where.push("patrimonio LIKE ?");
    params.push(`%${patrimonio}%`);
  }
  if (where.length) sql += " WHERE " + where.join(" AND ");
  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.post("/", (req, res) => {
  const { nome, descricao, tipo, patrimonio, estado, dataAquisicao } = req.body;
  const sql = "INSERT INTO equipamentos (nome, descricao, tipo, patrimonio, estado, dataAquisicao) VALUES (?,?,?,?,?,?)";
  db.query(sql, [nome, descricao, tipo, patrimonio, estado, dataAquisicao], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nome, descricao, tipo, patrimonio, estado, dataAquisicao });
  });
});


router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { nome, descricao, tipo, patrimonio, estado, dataAquisicao } = req.body;
  const sql = "UPDATE equipamentos SET nome=?, descricao=?, tipo=?, patrimonio=?, estado=?, dataAquisicao=? WHERE id=?";
  db.query(sql, [nome, descricao, tipo, patrimonio, estado, dataAquisicao, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Atualizado" });
  });
});


router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM equipamentos WHERE id=?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Excluído" });
  });
});

module.exports = router;
