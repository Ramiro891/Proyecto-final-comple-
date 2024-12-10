"use client";
import axios from "axios";
import { useState } from "react";

export default function Nueva() {
    const [isHovered, setIsHovered] = useState(false);
    const [cantidad, setCantidad] = useState("");
    const [producto, setProducto] = useState("");
    const [usuario, setUsuario] = useState("");
    const [productosSugeridos, setProductosSugeridos] = useState([]);
    const [usuariosSugeridos, setUsuariosSugeridos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const nuevaVenta = async (e) => {
        e.preventDefault();
        if (!productoSeleccionado || !usuarioSeleccionado) {
            alert("Selecciona un producto y un usuario antes de guardar la venta.");
            return;
        }

        const datos = {
            cantidad,
            id_producto: productoSeleccionado.id,
            id_usuario: usuarioSeleccionado.id,
        };

        try {
            const url = "http://localhost:3000/ventas/nuevaVenta";
            await axios.post(url, datos);
            location.replace("http://localhost:3001/ventas/mostrar");
        } catch (error) {
            console.error("Error al guardar la venta:", error);
        }
    };

    const obtenerSugerenciasProducto = async (event) => {
        const nombreProducto = event.target.value;
        setProducto(nombreProducto);

        if (nombreProducto.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/sugerirProducto?producto=${nombreProducto}`);
                setProductosSugeridos(response.data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        }
    };

    const obtenerSugerenciasUsuario = async (event) => {
        const nombreUsuario = event.target.value;
        setUsuario(nombreUsuario);

        if (nombreUsuario.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/sugerirUsuario?nombre=${nombreUsuario}`);
                setUsuariosSugeridos(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        }
    };

    const seleccionarProducto = (id, nombre) => {
        setProductoSeleccionado({ id, nombre });
        setProducto(nombre);
        setProductosSugeridos([]);
    };

    const seleccionarUsuario = (id, nombre) => {
        setUsuarioSeleccionado({ id, nombre });
        setUsuario(nombre);
        setUsuariosSugeridos([]);
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: isHovered ? '#c82333' : '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    };

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={nuevaVenta} style={formStyle}>
                <div style={cardStyle}>
                    <div style={cardHeaderStyle}>
                        <h1 style={{ margin: 0, color: '#fff' }}>Nueva Venta</h1>
                    </div>
                    <div style={cardBodyStyle}>
                        <input
                            id="cantidad"
                            required
                            placeholder="Cantidad"
                            type="text"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            autoFocus
                            style={inputStyle}
                        />
                        <input
                            id="id_producto"
                            required
                            placeholder="Escribe el nombre del producto"
                            type="text"
                            value={producto}
                            onChange={obtenerSugerenciasProducto}
                            style={inputStyle}
                        />
                        {productosSugeridos.length === 0 && producto.length >= 2 && (
                            <div>No se encontraron productos</div>
                        )}
                        {productosSugeridos.length > 0 && (
                            <ul>
                                {productosSugeridos.map((producto) => (
                                    <li key={producto.id} onClick={() => seleccionarProducto(producto.id, producto.producto)}>
                                        {producto.producto}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            id="id_usuario"
                            required
                            placeholder="Escribe el nombre del usuario"
                            type="text"
                            value={usuario}
                            onChange={obtenerSugerenciasUsuario}
                            style={inputStyle}
                        />
                        {usuariosSugeridos.length === 0 && usuario.length >= 2 && (
                            <div>No se encontraron usuarios</div>
                        )}
                        {usuariosSugeridos.length > 0 && (
                            <ul>
                                {usuariosSugeridos.map((usuario) => (
                                    <li key={usuario.id} onClick={() => seleccionarUsuario(usuario.id, usuario.nombre)}>
                                        {usuario.nombre}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div style={cardFooterStyle}>
                        <button
                            type="submit"
                            style={buttonStyle}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            Guardar venta
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Estilos
const formStyle = {
    display: 'flex',
    justifyContent: 'center',
};

const cardStyle = {
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const cardHeaderStyle = {
    backgroundColor: '#dc3545',
    padding: '15px',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
};

const cardBodyStyle = {
    padding: '15px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const cardFooterStyle = {
    padding: '15px',
};
