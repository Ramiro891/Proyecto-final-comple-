"use client"
import Link from "next/link";
import axios from "axios";
export default function borrarVennta({id}){
    async function borrar() {
        const url="http://localhost:3000/ventas/ventaModificada/"+id;
        const respuesta= await axios.patch(url);
        window.location.replace("/ventas/mostrar");
    }

    return(
        <Link href="" onClick={borrar}>Cancelar</Link>
    );
}