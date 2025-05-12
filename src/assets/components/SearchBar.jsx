import { useState, useCallback } from "react";

function SearchBar({ productos }) {
    const [termino, setTermino] = useState("");
    const [resultados, setResultados] = useState([]);

    const buscarProducto = useCallback(() => {
        const terminoNormalizado = termino.trim().toLowerCase();

        const resultadosFiltrados = productos.filter((producto) =>
            producto.descripcion.toLowerCase().includes(terminoNormalizado) ||
            producto.id.toString() === terminoNormalizado
        );

        setResultados(resultadosFiltrados);
    }, [productos, termino]);

    return (
        <div>
            <h2>Buscar Producto</h2>
            <input
                type="text"
                placeholder="Buscar por descripción o ID"
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
            />
            <button type="button" onClick={buscarProducto}>
                Buscar
            </button>

            {resultados.length > 0 && (
                <>
                    <h3>Resultados de Búsqueda</h3>
                    <ul>
                        {resultados.map((producto) => (
                            <li key={producto.id}>
                                Nombre: {producto.nombre} - Descripción: {producto.descripcion}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default SearchBar;