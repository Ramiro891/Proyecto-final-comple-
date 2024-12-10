"use client";
import axios from "axios";

async function nuevoProducto(e) {
    e.preventDefault();
    const url = "http://localhost:3000/productos/nuevoProducto";
    const datos = {
        producto: document.getElementById("producto").value,
        cantidad: document.getElementById("cantidad").value,
        precio: document.getElementById("precio").value,
    };
    await axios.post(url, datos);
    location.replace("http://localhost:3001/productos/mostrar");
}

export default function Nuevo() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8d7da' }}>
            <form style={{ width: '40%', marginTop: '5%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={nuevoProducto}>
                <div style={{ backgroundColor: '#dc3545', color: '#fff', padding: '15px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>Nuevo Producto</h1>
                </div>
                <div style={{ padding: '20px' }}>
                    <input id="producto" placeholder="Producto" autoFocus type="text" style={inputStyle} />
                    <input id="cantidad" placeholder="Cantidad" type="text" style={inputStyle} />
                    <input id="precio" placeholder="Precio" type="text" style={inputStyle} />
                </div>
                <div style={{ padding: '15px' }}>
                    <button type="submit" style={buttonStyle}>Guardar producto</button>
                </div>
            </form>
        </div>
    );
}

// Estilo para los inputs
const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
};

// Estilo para el botón
const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};

