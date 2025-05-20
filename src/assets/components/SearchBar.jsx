import { useState, useMemo } from "react";
import { calcularPrecioConDescuento } from "./CalcularDesct.jsx";

function SearchBar({ productos }) {
    const [termino, setTermino] = useState("");
    const [modoBusqueda, setModoBusqueda] = useState("");

    const resultados = useMemo(() => {
        const texto = termino.trim().toLowerCase();

        if (modoBusqueda === "id") {
            return productos.filter(p => p.id.toString() === texto);
        }

        if (modoBusqueda === "nombre") {
            return productos.filter(p => p.nombre.toLowerCase().includes(texto));
        }

        return [];
    }, [productos, termino, modoBusqueda]);

    return (
        <div>
            <h2>Buscar Producto</h2>

            <input
                type="text"
                placeholder="Escribí el nombre o el ID"
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
            />

            <div>
                <button onClick={() => setModoBusqueda("nombre")}>Buscar por Nombre</button>
                <button onClick={() => setModoBusqueda("id")}>Buscar por ID</button>
            </div>

            {resultados.length > 0 && (
                <div>
                    <h3>Resultados</h3>
                    <ul>
                        {resultados.map((prod) => (
                            <li key={prod.id}>
                                Nombre: {prod.nombre} - Descripción: {prod.descripcion} - Precio: {prod.precio}$ - Descuento: {prod.descuento}% - Precio Final: {calcularPrecioConDescuento(prod.precio, prod.descuento)}$ - Stock: {prod.stock}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
