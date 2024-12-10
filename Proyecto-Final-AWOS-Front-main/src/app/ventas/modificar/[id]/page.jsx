"use client";
import { useState } from "react";
import axios from "axios";

export default function Modificar({ params }) {
    const venta = JSON.parse(decodeURIComponent(params.id));

    const [cantidad, setCantidad] = useState(venta.cantidad);
    const [producto, setProducto] = useState(venta.nombreProducto || "");
    const [usuario, setUsuario] = useState(venta.nombreUsuario || "");
    const [productosSugeridos, setProductosSugeridos] = useState([]);
    const [usuariosSugeridos, setUsuariosSugeridos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState({ id: venta.id_producto, nombre: venta.nombreProducto });
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({ id: venta.id_usuario, nombre: venta.nombreUsuario });

    const modificarVenta = async (e) => {
        e.preventDefault();

        const data = {
            id: venta.id,
            cantidad,
            id_producto: productoSeleccionado.id,
            id_usuario: usuarioSeleccionado.id,
        };

        const url = "http://localhost:3000/ventas/modificarVenta";

        await axios.post(url, data);
        location.replace("http://localhost:3001/ventas/mostrar");
    };

    const obtenerSugerenciasProducto = async (nombre) => {
        setProducto(nombre);

        if (nombre.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/sugerirProducto?producto=${nombre}`);
                setProductosSugeridos(response.data);
            } catch (error) {
                console.error("Error al obtener productos sugeridos:", error);
            }
        } else {
            setProductosSugeridos([]);
        }
    };

    const obtenerSugerenciasUsuario = async (nombre) => {
        setUsuario(nombre);

        if (nombre.length >= 2) {
            try {
                const response = await axios.get(`http://localhost:3000/ventas/sugerirUsuario?nombre=${nombre}`);
                setUsuariosSugeridos(response.data);
            } catch (error) {
                console.error("Error al obtener usuarios sugeridos:", error);
            }
        } else {
            setUsuariosSugeridos([]);
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

    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={modificarVenta}>
                <div className="card" style={cardStyle}>
                    <div className="card-header" style={headerStyle}>
                        <h1 style={{ color: "#fff" }}>Modificar Venta</h1>
                    </div>
                    <div className="card-body">
                        <input
                            id="cantidad"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            type="text"
                            style={inputStyle}
                            placeholder="Cantidad"
                        />
                        <input
                            id="producto"
                            value={producto}
                            onChange={(e) => obtenerSugerenciasProducto(e.target.value)}
                            type="text"
                            style={inputStyle}
                            placeholder="Producto"
                        />
                        {productosSugeridos.length > 0 && (
                            <ul>
                                {productosSugeridos.map((prod) => (
                                    <li key={prod.id} onClick={() => seleccionarProducto(prod.id, prod.producto)}>
                                        {prod.producto}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            id="usuario"
                            value={usuario}
                            onChange={(e) => obtenerSugerenciasUsuario(e.target.value)}
                            type="text"
                            style={inputStyle}
                            placeholder="Usuario"
                        />
                        {usuariosSugeridos.length > 0 && (
                            <ul>
                                {usuariosSugeridos.map((usr) => (
                                    <li key={usr.id} onClick={() => seleccionarUsuario(usr.id, usr.nombre)}>
                                        {usr.nombre}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={buttonStyle}>
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Estilos
const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa", // Fondo claro
};

const headerStyle = {
    backgroundColor: "#001f36", // Azul oscuro
    padding: "10px",
    textAlign: "center",
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
};

const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#001f36", // Azul oscuro
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
};
