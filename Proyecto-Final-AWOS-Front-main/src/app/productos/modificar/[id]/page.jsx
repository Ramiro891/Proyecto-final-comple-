"use client";
export default function Modificar({ params }) {
    const producto = JSON.parse(decodeURIComponent(params.id));

    const modificarProducto = async (e) => {
        e.preventDefault();

        const data = {
            id: producto.id,
            producto: document.getElementById("producto").value,
            cantidad: document.getElementById("cantidad").value,
            precio: document.getElementById("precio").value,
        };

        const url = "http://localhost:3000/productos/modificarProducto";

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        location.replace("http://localhost:3001/productos/mostrar");
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f8d7da' }}>
            <form style={{ width: '40%', marginTop: '5%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }} onSubmit={modificarProducto}>
                <div style={{ backgroundColor: '#dc3545', color: '#fff', padding: '15px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <h1 style={{ textAlign: 'center' }}>Modificar Producto</h1>
                </div>
                <div style={{ padding: '20px' }}>
                    <input id="id" defaultValue={producto.id} type="text" style={{ display: 'none' }} />
                    <input id="producto" defaultValue={producto.producto} type="text" style={inputStyle} placeholder="Nombre del producto" />
                    <input id="cantidad" defaultValue={producto.cantidad} type="text" style={inputStyle} placeholder="Cantidad" />
                    <input id="precio" defaultValue={producto.precio} type="text" style={inputStyle} placeholder="Precio" />
                </div>
                <div style={{ padding: '15px' }}>
                    <button type="submit" style={buttonStyle}>Guardar cambios</button>
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
    backgroundColor: '#007bff',  // Azul
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
};
