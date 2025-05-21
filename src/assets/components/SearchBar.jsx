import { useState } from "react";
import { calcularPrecioConDescuento } from "./CalcularDesct.jsx";
import '/src/assets/css/producto.css';

function SearchBar({ productos }) {
    const [termino, setTermino] = useState("");
    const [modo, setModo] = useState("id");
    const [resultados, setResultados] = useState([]);

    const buscar = () => {
        const texto = termino.toLowerCase().trim();
        let filtrados = [];

        if (modo === "id") {
            filtrados = productos.filter(p => p.id.toString() === texto);
        } else if (modo === "nombre") {
            filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
        }

        setResultados(filtrados);
    };

    const limpiar = () => {
        setTermino("");
        setResultados([]);
    };

    return (
        <div className="busqueda-container">
            <h2>Buscar Producto</h2>
            <div className="barra-busqueda">
                <label><input type="radio" value="id" checked={modo === "id"} onChange={() => setModo("id")} /> ID</label>
                <label><input type="radio" value="nombre" checked={modo === "nombre"} onChange={() => setModo("nombre")} /> Nombre</label>
                <input
                    type="text"
                    value={termino}
                    onChange={(e) => setTermino(e.target.value)}
                    placeholder="Buscar..."
                />
                <button type="button" onClick={buscar}>Buscar</button>
                <label><input type="checkbox" onChange={limpiar} checked={termino === "" && resultados.length === 0} /> Limpiar</label>
            </div>

            {resultados.length > 0 && (
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Descuento</th>
                            <th>Precio Final</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resultados.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>{p.descripcion}</td>
                                <td>{p.precio}$</td>
                                <td>{p.descuento}%</td>
                                <td>{calcularPrecioConDescuento(p.precio, p.descuento)}$</td>
                                <td>{p.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SearchBar;
