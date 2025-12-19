import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer
} from "recharts";

export default function Dashboard() {
    const chave = "rotary_equipamentos_v1";

    const [equipamentos, setEquipamentos] = useState([]);
    const [totais, setTotais] = useState({
        total: 0,
        disp: 0,
        emp: 0,
        man: 0
    });
    const [tipoData, setTipoData] = useState([]);

    // -------------------------------
    // 🔥 CARREGAR DO LOCALSTORAGE
    // -------------------------------
    useEffect(() => {
        function carregarDados() {
            const saved = localStorage.getItem(chave);
            const lista = saved ? JSON.parse(saved) : [];

            setEquipamentos(lista);
            calcularMetricas(lista);
            calcularGrafico(lista);
        }

        carregarDados();

        // Atualiza automaticamente quando o localStorage mudar
        window.addEventListener("storage", carregarDados);
        return () => window.removeEventListener("storage", carregarDados);
    }, []);

    // -------------------------------
    // 📌 MÉTRICAS
    // -------------------------------
    function calcularMetricas(lista) {
        const total = lista.length;
        const disp = lista.filter(e => e.estado === "Disponível").length;
        const emp = lista.filter(e => e.estado === "Emprestado").length;
        const man = lista.filter(e => e.estado === "Manutenção").length;

        setTotais({ total, disp, emp, man });
    }

    // -------------------------------
    // 📊 GRÁFICO DE TIPOS
    // -------------------------------
    function calcularGrafico(lista) {
        const contagem = lista.reduce((acc, item) => {
            const tipo = item.tipo?.trim(); // remove espaços extras
            if (!tipo) return acc;

            acc[tipo] = (acc[tipo] || 0) + 1;
            return acc;
        }, {});

        const data = Object.keys(contagem).map((tipo) => ({
            name: tipo,
            value: contagem[tipo],
            color: TYPE_COLORS[tipo] || "#888888", // cor fallback
        }));

        setTipoData(data);
    }

    const TYPE_COLORS = {
        "Cadeira de Rodas": "#2563eb",   // azul
        "Muleta": "#16a34a",             // verde
        "Bengala": "#ca8a04",            // amarelo
        "Andador": "#dc2626",            // vermelho
    };

    const COLORS = ["#2563eb", "#16a34a", "#ca8a04", "#dc2626"];

    return (

        <div style={{ padding: "40px", maxWidth: "950px", margin: "0 auto" }}>

            {/* MÉTRICAS */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                marginBottom: "40px"
            }}>
                <div style={{ background: "#2563eb", color: "#fff", padding: "20px", borderRadius: "15px" }}>
                    <h3>Total de Equipamentos</h3>
                    <p style={{ fontSize: "32px", fontWeight: 700 }}>{totais.total}</p>
                </div>

                <div style={{ background: "#16a34a", color: "#fff", padding: "20px", borderRadius: "15px" }}>
                    <h3>Disponíveis</h3>
                    <p style={{ fontSize: "32px", fontWeight: 700 }}>{totais.disp}</p>
                </div>

                <div style={{ background: "#ca8a04", color: "#fff", padding: "20px", borderRadius: "15px" }}>
                    <h3>Emprestados</h3>
                    <p style={{ fontSize: "32px", fontWeight: 700 }}>{totais.emp}</p>
                </div>

                <div style={{ background: "#dc2626", color: "#fff", padding: "20px", borderRadius: "15px" }}>
                    <h3>Manutenção</h3>
                    <p style={{ fontSize: "32px", fontWeight: 700 }}>{totais.man}</p>
                </div>
            </div>

            {/* GRÁFICO */}
            <div style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "15px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <h2 style={{ marginBottom: "20px" }}>Distribuição por Tipo</h2>

                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={tipoData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                label
                            >
                                {tipoData.map((entry, index) => (
                                    <Cell key={index} fill={entry.color} />
                                ))}
                            </Pie>

                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
