// productosbd.js
const productosBD = require("./conexion").productos;
const Producto = require("../modelos/ProductoModelo");

function validarDatos(producto) {
    return producto.producto !== undefined && producto.cantidad !== undefined && producto.precio !== undefined;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    return productos.docs.map(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        return validarDatos(producto1.getProducto) ? producto1.getProducto : null;
    }).filter(Boolean);
}

async function buscarPorID(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    return validarDatos(producto1.getProducto) ? producto1.getProducto : false;
}

async function buscarPorNombre(nombre) {
    const productos = await productosBD.where("producto", "==", nombre).get();
    return productos.docs.map(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });
        return validarDatos(producto1.getProducto) ? producto1.getProducto : null;
    }).filter(Boolean);
}

async function validarID(id) {
    const producto = await productosBD.doc(id).get();
    return producto.exists;
}

async function validarCantidad(productoId, cantidad) {
    const producto = await productosBD.doc(productoId).get();
    const productoData = producto.data();
    const stock = productoData.cantidad;
    if (Number(stock) >= Number(cantidad)) {
        await productosBD.doc(productoId).update({
            cantidad: stock - cantidad
        });
        return true;
    } else {
        console.log("Producto insuficiente");
        return false;
    }
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        return true;
    }
    return false;
}

async function borraProducto(id) {
    const productoValido = await buscarPorID(id);
    if (productoValido) {
        await productosBD.doc(id).delete();
        return true;
    }
    return false;
}

async function modificarProducto(data) {
    const productoValido = await buscarPorID(data.id);
    if (productoValido) {
        await productosBD.doc(data.id).update({
            producto: data.producto,
            cantidad: data.cantidad,
            precio: data.precio
        });
        return true;
    }
    return false;
}

module.exports = {
    buscarPorID,
    mostrarProductos,
    nuevoProducto,
    borraProducto,
    validarID,
    validarCantidad,
    modificarProducto,
    buscarPorNombre
}