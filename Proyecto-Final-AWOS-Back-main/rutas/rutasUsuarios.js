const express = require("express");
const rutas = express.Router();
const {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorID,
    modificarUsuario,
    login,
} = require("../bd/usuariosbd");

// Ruta para login
rutas.post("/login", async (req, res) => {
    try {
        const usuario = await login(req, req.body.usuario, req.body.password);
        res.json(usuario);
    } catch (error) {
        console.error("Error en login:", error.message);
        res.status(500).json({ error: "Error interno al realizar el login." });
    }
});

// Ruta para obtener todos los usuarios
rutas.get("/", async (req, res) => {
    try {
        const usuariosValidos = await mostrarUsuarios();
        res.json(usuariosValidos);
    } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
        res.status(500).json({ error: "Error interno al obtener usuarios." });
    }
});

// Ruta para buscar un usuario por ID
rutas.get("/buscarPorId/:id", async (req, res) => {
    try {
        const usuarioValido = await buscarPorID(req.params.id);
        if (!usuarioValido) {
            return res.status(404).json({ error: "Usuario no encontrado." });
        }
        res.json(usuarioValido);
    } catch (error) {
        console.error("Error al buscar usuario:", error.message);
        res.status(500).json({ error: "Error interno al buscar usuario." });
    }
});

// Ruta para borrar un usuario
rutas.delete("/borrarUsuario/:id", async (req, res) => {
    try {
        const usuarioBorrado = await borrarUsuario(req.params.id);
        if (usuarioBorrado) {
            res.json({ message: "Usuario borrado correctamente." });
        } else {
            res.status(404).json({ error: "Usuario no encontrado." });
        }
    } catch (error) {
        console.error("Error al borrar usuario:", error.message);
        res.status(500).json({ error: "Error interno al borrar usuario." });
    }
});

// Ruta para crear un nuevo usuario
rutas.post("/nuevoUsuario", async (req, res) => {
    try {
        const usuarioValido = await nuevoUsuario(req.body);
        if (usuarioValido) {
            res.status(201).json({ message: "Usuario creado correctamente." });
        } else {
            res.status(400).json({ error: "Datos inválidos para crear usuario." });
        }
    } catch (error) {
        console.error("Error al crear usuario:", error.message);
        res.status(500).json({ error: "Error interno al crear usuario." });
    }
});

// Ruta para modificar un usuario
rutas.post("/modificarUsuario", async (req, res) => {
    try {
        const resultado = await modificarUsuario(req.body);
        res.status(200).json(resultado);
    } catch (error) {
        console.error("Error al modificar usuario:", error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = rutas;