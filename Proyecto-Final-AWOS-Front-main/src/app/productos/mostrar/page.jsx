'use client';

import BorrarProducto from "@/components/borrarP";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Función para obtener productos
async function getProductos() {
  const url = "http://localhost:3000/productos";
  const { data } = await axios.get(url);
  return data;
}

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const searchParams = useSearchParams();

  // Obtiene todos los productos
  useEffect(() => {
    const fetchProductos = async () => {
      const allProductos = await getProductos();
      setProductos(allProductos);
    };
    fetchProductos();
  }, []);

  // Obtener el término de búsqueda desde los parámetros de búsqueda
  const searchTerm = searchParams.get('search') || ''; // Obtenemos el término de búsqueda de la URL

  // Filtrar productos por término de búsqueda
  const filteredProductos = productos.filter((producto) =>
    producto.producto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 style={headerStyle}>Productos</h1>

      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={tabEncabezado}>Id</th>
            <th style={tabEncabezado}>Producto</th>
            <th style={tabEncabezado}>Precio</th>
            <th style={tabEncabezado}>Cantidad</th>
            <th style={tabEncabezado}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProductos.map((producto, i) => (
            <tr key={i} style={i % 2 === 0 ? { backgroundColor: "#f9f9f9" } : { backgroundColor: "#ffffff" }}>
              <td style={tabstyle2}>{i + 1}</td>
              <td style={tabstyle2}>{producto.producto}</td>
              <td style={tabstyle2}>${producto.precio}</td>
              <td style={tabstyle2}>{producto.cantidad}</td>
              <td style={tabstyle2}>
                <BorrarProducto id={producto.id} />
                <> / </>
                <Link
                  href={`/productos/modificar/${encodeURIComponent(
                    JSON.stringify({ id: producto.id, producto: producto.producto, cantidad: producto.cantidad, precio: producto.precio })
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
        <Link href="/productos/nuevo" style={buttonStyle}>
          Nuevo Producto
        </Link>
      </div>
    </>
  );
}

// Estilos
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  marginTop: '30px',
  fontSize: '28px',
  backgroundColor: '#dc3545', // Rojo
  padding: '15px',
};

const tableStyle = {
  width: '80%',
  margin: '20px auto',
  borderCollapse: 'collapse',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
};

const headerRowStyle = {
  backgroundColor: '#dc3545', // Rojo
  color: '#fff',
};

const tabEncabezado = {
  padding: '12px',
  border: '1px solid #ccc',
  textAlign: 'left',
  fontWeight: 'bold',
  backgroundColor: '#dc3545', // Rojo
  color: '#fff',
};

const tabstyle2 = {
  padding: '12px',
  border: '1px solid #ccc',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '20px',
};

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#dc3545', // Rojo
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'inline-block',
};

const linkStyle = {
  color: '#dc3545', // Rojo
  textDecoration: 'none',
  fontWeight: 'bold',
};
