import { useState } from "react";
import Producto from "./assets/components/Producto";
import SearchBar from "./assets/components/SearchBar";
import './assets/css/App.css';

function App() {
    const [productos, setProductos] = useState([]);

    return (
        <div>
            <Producto productos={productos} setProductos={setProductos} />
            <SearchBar productos={productos} />
        </div>
    );
}

export default App;