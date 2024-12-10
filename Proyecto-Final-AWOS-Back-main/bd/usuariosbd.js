const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../modelos/UsuarioModelo");
const { encriptarPassword, validarPassword } = require("../middlewares/funcionesPassword");

// Validar datos del usuario
function validarDatos(usuario) {
    return usuario.nombre && usuario.usuario && usuario.password;
}

// Login del usuario
async function login(req, usuario, password) {
    const user = {
        usuario: "anonimo",
        tipoUsu: "sin acceso",
    };

    try {
        const usuariosCorrectos = await usuariosBD.where("usuario", "==", usuario).get();
        usuariosCorrectos.forEach((usu) => {
            const usuarioCorrecto = validarPassword(password, usu.data().password, usu.data().salt);
            if (usuarioCorrecto) {
                user.usuario = usu.data().usuario;
                if (usu.data().tipoUsuario === "usuario") {
                    req.session.usuario = "usuario";
                    user.tipoUsu = req.session.usuario;
                } else if (usu.data().tipoUsuario === "admin") {
                    req.session.admin = "admin";
                    user.tipoUsu = req.session.admin;
                }
            }
        });
        return user;
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        throw new Error("Error interno al autenticar.");
    }
}

// Mostrar todos los usuarios
async function mostrarUsuarios() {
    try {
        const usuarios = await usuariosBD.get();
        const usuariosValidos = [];
        usuarios.forEach((usuario) => {
            const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
            if (validarDatos(usuario1.getUsuario)) {
                usuariosValidos.push(usuario1.getUsuario);
            }
        });
        return usuariosValidos;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw new Error("Error interno al obtener usuarios.");
    }
}

// Buscar usuario por ID
async function buscarPorID(id) {
    try {
        const usuario = await usuariosBD.doc(id).get();
        if (!usuario.exists) {
            throw new Error("Usuario no encontrado.");
        }
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        if (validarDatos(usuario1.getUsuario)) {
            return usuario1.getUsuario;
        }
        throw new Error("Datos del usuario inválidos.");
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        throw new Error("Error interno al buscar usuario.");
    }
}

// Buscar si un usuario existe por su ID
async function buscarUsuarios(id_usuario) {
    try {
        const usuario = await usuariosBD.doc(id_usuario).get();
        return usuario.exists; // Retorna true si el usuario existe
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        throw new Error("Error interno al buscar usuario.");
    }
}

// Crear un nuevo usuario
async function nuevoUsuario(data) {
    try {
        const { nombre, usuario, password } = data;
        const { hash, salt } = encriptarPassword(password);
        const nuevoUsuario = {
            nombre,
            usuario,
            password: hash,
            salt,
        };
        const resultado = await usuariosBD.add(nuevoUsuario);
        return resultado.id;
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw new Error("Error interno al crear usuario.");
    }
}

// Modificar usuario
async function modificarUsuario(data) {
    try {
        const { id, nombre, usuario, password } = data;
        const { hash, salt } = encriptarPassword(password);
        await usuariosBD.doc(id).update({
            nombre,
            usuario,
            password: hash,
            salt,
        });
        return { message: "Usuario modificado correctamente." };
    } catch (error) {
        console.error("Error al modificar usuario:", error);
        throw new Error("Error interno al modificar usuario.");
    }
}

// Borrar usuario
async function borrarUsuario(id) {
    try {
        await usuariosBD.doc(id).delete();
        return true;
    } catch (error) {
        console.error("Error al borrar usuario:", error);
        throw new Error("Error interno al borrar usuario.");
    }
}

module.exports = {
    login,
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario,
    buscarUsuarios, // Exportamos la función corregida
};