"use client";
import axios from "axios";

async function nuevoUsuario(e) {
    e.preventDefault();
    const url = "http://localhost:3000/usuarios/nuevoUsuario";
    const datos = {
        nombre: document.getElementById("nombre").value,
        usuario: document.getElementById("usuario").value,
        password: document.getElementById("password").value,
    };

    await axios.post(url, datos);
    location.replace("http://localhost:3001/usuarios/mostrar");
}

export default function Nuevo() {
    return (
        <div className="m-0 row justify-content-center">
            <form className="col-6 mt-5" onSubmit={nuevoUsuario}>
                <div className="card" style={cardStyle}>
                    <div className="card-header" style={headerStyle}>
                        <h1 style={{ color: '#fff' }}>Nuevo Usuario</h1>
                    </div>
                    <div className="card-body">
                        <input id="nombre" placeholder="Nombre" autoFocus type="text" style={inputStyle} />
                        <input id="usuario" placeholder="Usuario" type="text" style={inputStyle} />
                        <input id="password" placeholder="Password" type="password" style={inputStyle} />
                    </div>
                    <div className="card-footer">
                        <button type="submit" style={buttonStyle}>Guardar usuario</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Estilos
const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
    backgroundColor: '#dc3545', // Rojo
    padding: '10px',
    textAlign: 'center',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545', // Rojo
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};
