import {useState, useCallback} from "react";
import { calcularPrecioConDescuento } from "./CalcularDesct.jsx";
import '/src/assets/css/producto.css';

let idContador = 0;


function Producto({ productos, setProductos }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [descuento, setDescuento] = useState("");
    const [stock, setStock] = useState("");

    const [modoEdicion, setModoEdicion] = useState(false);
    const [productoEditandoId, setProductoEditandoId] = useState(null);

    // Función para manejar el envío del formulario
    // Se utiliza useCallback para evitar la creación de una nueva función en cada renderizado
    // y así optimizar el rendimiento del componente
    const manejarEnvio = useCallback ((e) => {
        e.preventDefault();

if (modoEdicion) {
      const productosActualizados = productos.map((producto) =>
        producto.id === productoEditandoId
          ? {
              ...producto,
              nombre,
              descripcion,
              precio,
              descuento,
              stock,
            }
          : producto
      );
      setProductos(productosActualizados);
      setModoEdicion(false);
      setProductoEditandoId(null);
    } else { 
        const nuevoProducto = {
            id: ++idContador,
            nombre,
            descripcion,
            precio,
            descuento,
            stock,
            activo: true 
    
        };
        setProductos([...productos, nuevoProducto]);
        console.log("Lista de Productos actualizada:", [...productos, nuevoProducto]);
        };

        setNombre("");
        setDescripcion("");
        setPrecio("");
        setDescuento("");
        setStock("");
    }, [productos, nombre, descripcion, precio, descuento, stock]);

 

    const eliminarProducto = (id) => {
        const productosActualizados = productos.map((producto) =>
        producto.id === id ? { ...producto, activo: false} : producto
        );
    setProductos(productosActualizados);
    };

    const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setDescuento(producto.descuento);
    setStock(producto.stock);
    setModoEdicion(true);
    setProductoEditandoId(producto.id);
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

                    <button type="submit"> {modoEdicion ? "Guardar Cambios" : "Registrar Producto"} </button>

                </form>
            </div>

            <h3>Listado de Productos</h3>
            <table class="tabla-productos">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio Original</th>
                        <th>Descuento</th>
                        <th>Precio Final</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.filter(p => p.activo).map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.id}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.descripcion}</td>
                            <td>{producto.precio}$</td>
                            <td>{producto.descuento}%</td>
                            <td>{calcularPrecioConDescuento(producto.precio, producto.descuento)}$</td>
                            <td>{producto.stock}</td>
                            <td>
                                <button type="button" class="eliminar" onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                                <button type="button" class="editar" onClick={() => editarProducto(producto)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Producto;