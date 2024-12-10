"use client"
import Link from "next/link";
import axios from "axios";
export default function BorrarUsuario({id}){
    async function borrar() {
        //console.log(id);
        const url="http://localhost:3000/usuarios/borrarUsuario/"+id;
        const respuesta= await axios.delete(url);
        window.location.replace("/usuarios/mostrar");
    }

    return(
        <Link href="" onClick={borrar}>Borrar</Link>
    );
}