import BorrarVenta from "@/components/borrarVenta";
import axios from "axios";
import Link from "next/link";

async function getVentas() {
    const url = "http://localhost:3000/ventas";
    const ventas = await axios.get(url);
    return ventas.data;
}

export default async function Ventas() {
    const ventas = await getVentas();

    const tabEncabezado = {
        padding: "12px",
        border: "1px solid #ccc",
        textAlign: "left",
        fontWeight: "bold",
        backgroundColor: "#dc3545", // Rojo
        color: "#fff",
    };

    const tabstyle2 = {
        padding: "12px",
        border: "1px solid #ccc",
    };

    const tableStyle = {
        width: "80%",
        margin: "20px auto",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    };

    const headerStyle = {
        textAlign: "center",
        color: "#fff",
        marginTop: "30px",
        fontSize: "28px",
        backgroundColor: "#dc3545", // Rojo
        padding: "15px",
    };

    const buttonContainerStyle = {
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
    };

    const newButtonStyle = {
        padding: "12px 20px",
        backgroundColor: "#dc3545", // Rojo
        color: "#fff",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "16px",
        display: "inline-block",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
    };

    return (
        <>
            <h1 style={headerStyle}>Ventas</h1>
            <table style={tableStyle}>
                <thead>
                    <tr style={{ backgroundColor: "#f2f2f2" }}>
                        <th style={tabEncabezado}>Id</th>
                        <th style={tabEncabezado}>Cantidad</th>
                        <th style={tabEncabezado}>Estado</th>
                        <th style={tabEncabezado}>Fecha/Hora</th>
                        <th style={tabEncabezado}>Producto</th>
                        <th style={tabEncabezado}>Usuario</th>
                        <th style={tabEncabezado}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr
                            key={i}
                            style={
                                i % 2 === 0
                                    ? { backgroundColor: "#f9f9f9" }
                                    : { backgroundColor: "#ffffff" }
                            }
                        >
                            <td style={tabstyle2}>{i + 1}</td>
                            <td style={tabstyle2}>{venta.cantidad}</td>
                            <td style={tabstyle2}>{venta.estado}</td>
                            <td style={tabstyle2}>{venta.fechayhora}</td>
                            <td style={tabstyle2}>{venta.nombreProducto}</td>
                            <td style={tabstyle2}>{venta.nombreUsuario}</td>
                            <td style={tabstyle2}>
                                <BorrarVenta id={venta.id} />
                                <> / </>
                                <Link
                                    href={`/ventas/modificar/${encodeURIComponent(
                                        JSON.stringify({ id: venta.id, cantidad: venta.cantidad })
                                    )}`}
                                    style={linkStyle}
                                >
                                    Modificar
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={buttonContainerStyle}>
                <Link href="/ventas/nuevo" style={newButtonStyle}>
                    Nueva Venta
                </Link>
            </div>
        </>
    );
}

// Estilos
const linkStyle = {
    color: '#dc3545', // Rojo
    textDecoration: 'none',
    fontWeight: 'bold',
};
