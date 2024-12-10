"use client"
import Link from "next/link";
import axios from "axios";
export default function borrarProducto({id}){
    async function borrar() {
        //console.log(id);
        const url="http://localhost:3000/productos/borrarProducto/"+id;
        const respuesta= await axios.delete(url);
        window.location.replace("/productos/mostrar");
    }

    return(
        <Link href="" onClick={borrar}>Borrar</Link>
    );
}