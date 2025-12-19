import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/equipamentos", (req, res) => {
  db.query("SELECT * FROM equipamentos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


app.post("/equipamentos", (req, res) => {
  const { tipo, codigo, estado, dataAquisicao } = req.body;

  db.query(
    "INSERT INTO equipamentos (tipo, codigo, estado, dataAquisicao) VALUES (?, ?, ?, ?)",
    [tipo, codigo, estado, dataAquisicao],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, ...req.body });
    }
  );
});


app.delete("/equipamentos/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM equipamentos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  });
});


app.put("/equipamentos/:id", (req, res) => {
  const { id } = req.params;
  const { tipo, codigo, estado, dataAquisicao } = req.body;

  db.query(
    "UPDATE equipamentos SET tipo=?, codigo=?, estado=?, dataAquisicao=? WHERE id=?",
    [tipo, codigo, estado, dataAquisicao, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id, ...req.body });
    }
  );
});

app.listen(3001, () => {
  console.log("🚀 API rodando na porta 3001");
});
