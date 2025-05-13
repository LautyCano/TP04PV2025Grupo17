import '/src/assets/css/producto.css';
import { useState } from "react";

let idContador = 0;

const calcularPrecioConDescuento = (precio, descuento) => {
    const descuentoDecimal = descuento / 100;
    const precioConDescuento = precio * (1 - descuentoDecimal);
    return precioConDescuento.toFixed(2);
};

function Producto({ productos, setProductos }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [descuento, setDescuento] = useState("");
    const [stock, setStock] = useState("");

    const manejarEnvio = (e) => {
        e.preventDefault();

        const nuevoProducto = {
            id: ++idContador,
            nombre,
            descripcion,
            precio,
            descuento,
            stock,
            realizada: false
        };

        setProductos([...productos, nuevoProducto]);
        console.log("Lista de Productos actualizada:", [...productos, nuevoProducto]);
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setDescuento("");
        setStock("");
    };

    return (
        <div>
            <div className='Titulo'>
                <h1>Agregar Nuevo Producto</h1>
            </div>

            <div>
                <form onSubmit={manejarEnvio}>
                    <div className='Nombre'>
                        <label>Nombre del Producto:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required />
                    </div>

                    <div className='Descrip'>
                        <label>Descripcion:</label>
                        <input
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required />
                    </div>

                    <div className='PrecioUni'>
                        <label>Precio:</label>
                        <input
                            type="number"
                            id="precio"
                            name="precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            required />
                    </div>

                    <div className='Descuento'>
                        <label>Descuento:</label>
                        <input
                            type="number"
                            id="descuento"
                            name="descuento"
                            value={descuento}
                            onChange={(e) => setDescuento(e.target.value)}
                            required />
                    </div>

                    <div className='Stock'>
                        <label>Stock:</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            required />
                    </div>

                    <button type="submit">Registar Producto</button>

                </form>
            </div>

            <h3>Listado Productos</h3>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        - ID:{producto.id} Nombre: {producto.nombre} - Descripcion: {producto.descripcion} - Precio Original: {producto.precio} - Descuento: {producto.descuento}% - Precio con Descuento: {calcularPrecioConDescuento(producto.precio, producto.descuento)} - Stock: {producto.stock} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Producto;