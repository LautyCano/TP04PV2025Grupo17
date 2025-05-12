import { useState } from "react";
import Producto from "./assets/components/Producto";
import SearchBar from "./assets/components/SearchBar";

function App() {
    const [productos, setProductos] = useState([]);
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    return (
        <div>
            <Producto productos={productos} setProductos={setProductos} />
            <SearchBar productos={productos} setResultadosBusqueda={setResultadosBusqueda} />

            <h2>Resultados de Búsqueda</h2>
            <ul>
                {resultadosBusqueda.map((producto) => (
                    <li key={producto.id}>
                        Nombre: {producto.nombre} - Descripcion: {producto.descripcion}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;