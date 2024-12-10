import Link from "next/link";
import "@/components/menu.css";
export default function Menu() {
    return (
        <>
            <Link className="link" href="/chat">Chat</Link>
            <br></br>
            <Link className="link" href="/universidades">Universidades</Link>
        </>
    );
}