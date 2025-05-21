import { useState, useMemo } from "react";
import { calcularPrecioConDescuento } from "./CalcularDesct.jsx";

function SearchBar({ productos }) {
    const [termino, setTermino] = useState("");
    const [modo, setModo] = useState("id");

    const resultados = useMemo(() => {
        const texto = termino.toLowerCase().trim();
        if (modo === "id") {
            return productos.filter(p => p.id.toString() === texto);
        }
        if (modo === "nombre") {
            return productos.filter(p => p.nombre.toLowerCase().includes(texto));
        }
        return [];
    }, [termino, modo, productos]);

    const limpiar = () => {
        setTermino("");
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h2>Buscar Producto</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "15px" }}>
                <label><input type="radio" value="id" checked={modo === "id"} onChange={() => setModo("id")} /> ID</label>
                <label><input type="radio" value="nombre" checked={modo === "nombre"} onChange={() => setModo("nombre")} /> Nombre</label>
                <input
                    type="text"
                    value={termino}
                    onChange={(e) => setTermino(e.target.value)}
                    placeholder="Buscar..."
                    style={{ padding: "5px" }}
                />
                <button style={{ background: "#007bff", color: "#fff", border: "none", padding: "6px 12px", cursor: "pointer" }}>
                    Buscar
                </button>
                <label><input type="checkbox" onChange={limpiar} checked={termino === ""} /> Limpiar</label>
            </div>

            {resultados.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#007bff", color: "white" }}>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Desc.</th>
                            <th>Final</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultados.map(p => (
                            <tr key={p.id}>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.id}</td>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.nombre}</td>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.descripcion}</td>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.precio}$</td>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.descuento}%</td>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{calcularPrecioConDescuento(p.precio, p.descuento)}$</td>
                                <td style={{ border: "1px solid #ccc", padding: "5px" }}>{p.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchBar;
