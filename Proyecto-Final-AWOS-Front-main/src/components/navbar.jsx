'use client';  // Asegura que el componente sea un componente de cliente

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; // Importación para obtener la ruta actual

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();
    const currentPath = usePathname(); // Obtiene la ruta actual de forma confiable

    const handleSearch = (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            alert("Por favor, ingresa un término de búsqueda.");
            return;
        }

        // Verifica la ruta actual y redirige a la página correspondiente
        if (currentPath?.includes("/productos")) {
            // Redirige a la página de productos con el término de búsqueda como query
            router.push(`/productos/mostrar?search=${searchTerm}`);
        } else if (currentPath?.includes("/usuarios")) {
            // Redirige a la página de usuarios con el término de búsqueda como query
            router.push(`/usuarios/mostrar?search=${searchTerm}`);
        } 
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" href="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                            </li>
                            {/* Dropdown para Productos */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Productos
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/productos/mostrar">Mostrar</Link></li>
                                    <li><Link className="dropdown-item" href="/productos/nuevo">Nuevo</Link></li>
                                </ul>
                            </li>
                            {/* Dropdown para Ventas */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Ventas
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/ventas/mostrar">Mostrar</Link></li>
                                    <li><Link className="dropdown-item" href="/ventas/nuevo">Nuevo</Link></li>
                                </ul>
                            </li>
                            {/* Dropdown para Usuarios */}
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Usuarios
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" href="/usuarios/mostrar">Mostrar</Link></li>
                                    <li><Link className="dropdown-item" href="/usuarios/nuevo">Nuevo</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link href="/" className="nav-link disabled" aria-disabled="true">Disabled</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search" onSubmit={handleSearch}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    );
}
