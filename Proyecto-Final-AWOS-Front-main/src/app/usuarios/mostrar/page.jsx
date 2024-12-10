'use client';

import BorrarUsuario from "@/components/borrar";
import axios from "axios";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./db/db";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Importamos para capturar parámetros de la URL

// Obtiene todos los usuarios desde el backend
async function getUsuarios() {
  const url = "http://localhost:3000/usuarios";
  const usuarios = await axios.get(url);
  return usuarios.data;
}

// Función para obtener usuarios filtrados desde Firestore
const getUsersByFilter = async (searchTerm) => {
  try {
    const usersRef = collection(db, "usuario");
    const q = query(usersRef, where("nombre", "==", searchTerm)); // Buscamos por el campo nombre
    const responseDb = await getDocs(q);
    const users = [];
    responseDb.forEach((user) => {
      users.push({ id: user.id, ...user.data() });
    });
    return users;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
};

// Componente principal
export default function Usuarios() {
  const [searchTerm, setSearchTerm] = useState(""); // Estado local para la búsqueda
  const [users, setUsers] = useState([]);
  const searchParams = useSearchParams(); // Hook para obtener parámetros de la URL

  // Obtiene todos los usuarios o filtra según el parámetro search
  useEffect(() => {
    const fetchUsers = async () => {
      const querySearchTerm = searchParams.get("search"); // Capturamos el valor de search en la URL
      if (querySearchTerm) {
        console.log("Buscando usuarios con nombre:", querySearchTerm);
        const filteredUsers = await getUsersByFilter(querySearchTerm); // Filtramos usuarios
        setUsers(filteredUsers);
      } else {
        const usuarios = await getUsuarios(); // Cargamos todos los usuarios
        setUsers(usuarios);
      }
    };
    fetchUsers();
  }, [searchParams]); // Se ejecuta cuando cambian los parámetros de la URL

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }
    console.log("Buscando usuarios con nombre:", searchTerm);
    const filteredUsers = await getUsersByFilter(searchTerm);
    console.log("Usuarios encontrados:", filteredUsers);
    setUsers(filteredUsers);
  };

  return (
    <>
      <h1 style={headerStyle}>Usuarios</h1>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={tabEncabezado}>Id</th>
            <th style={tabEncabezado}>Nombre</th>
            <th style={tabEncabezado}>Usuario</th>
            <th style={tabEncabezado}>Editar/Borrar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((usuario, i) => (
            <tr
              key={i}
              style={i % 2 === 0 ? { backgroundColor: "#f9f9f9" } : { backgroundColor: "#ffffff" }}
            >
              <td style={tabstyle2}>{i + 1}</td>
              <td style={tabstyle2}>{usuario.nombre}</td>
              <td style={tabstyle2}>{usuario.usuario}</td>
              <td style={tabstyle2}>
                <BorrarUsuario id={usuario.id} />
                <> / </>
                <Link href={`/usuarios/modificar/${usuario.id}`} style={linkStyle}>
                  Modificar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={buttonContainerStyle}>
        <Link href="/usuarios/nuevo" style={buttonStyle}>
          Nuevo
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

const searchContainerStyle = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
};

const searchInputStyle = {
  padding: "8px 12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  marginRight: "10px",
};

const searchButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545", // Rojo
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};
