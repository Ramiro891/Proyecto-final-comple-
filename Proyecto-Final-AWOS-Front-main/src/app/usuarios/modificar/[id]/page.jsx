"use client";

import { useRouter } from "next/navigation";

export default function ModificarUsuario({ params }) {
    const router = useRouter();
    const usuarioId = params.id;

    const modificarUsuario = async (e) => {
        e.preventDefault();

        const data = {
            id: usuarioId,
            nombre: document.getElementById("nombre").value.trim(),
            usuario: document.getElementById("usuario").value.trim(),
            password: document.getElementById("password").value.trim(),
        };

        if (!data.nombre || !data.usuario || !data.password) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/usuarios/modificarUsuario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Error al modificar el usuario.");
            }

            alert("Usuario modificado correctamente.");
            // Redirigir a la ruta correcta
            router.push("/usuarios/mostrar");
        } catch (error) {
            console.error("Error al modificar el usuario:", error);
            alert("Hubo un problema al modificar el usuario.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8d7da' }}>
            <form style={{ width: '40%', marginTop: '5%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={modificarUsuario}>
                <div style={{ backgroundColor: '#dc3545', color: '#fff', padding: '15px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>Modificar Usuario</h1>
                </div>
                <div style={{ padding: '20px' }}>
                    <input id="nombre" type="text" placeholder="Nombre" style={inputStyle} />
                    <input id="usuario" type="text" placeholder="Usuario" style={inputStyle} />
                    <input id="password" required placeholder="Nuevo password" type="password" style={inputStyle} />
                </div>
                <div style={{ padding: '15px' }}>
                    <button type="submit" style={buttonStyle}>Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}

// Estilos para los inputs
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
    backgroundColor: '#007bff',  // Azul
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};
