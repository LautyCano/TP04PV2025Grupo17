import { useState, useCallback } from "react";

function SearchBar({ productos, setResultadosBusqueda }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const buscarProducto = useCallback(() => {
    const termino = terminoBusqueda.trim().toLowerCase();
    const resultados = productos.filter((producto) => {
      return (
        producto.descripcion.toLowerCase().includes(termino) ||
        producto.id.toString() === termino
      );
    });
    setResultadosBusqueda(resultados);
  }, [terminoBusqueda, productos, setResultadosBusqueda]);

  return (
    <div>
      <h2>Buscar Producto</h2>
      <input
        type="text"
        placeholder="Buscar por descripción o ID"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
      />
      <button onClick={buscarProducto}>Buscar</button>
    </div>
  );
}

export default SearchBar;