import { useState,useEffect } from "react";
import { useParams } from "react-router-dom"

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)

    const {id} = useParams()

    useEffect(() => {
        setCargando(!cargando)
        const obtenerClienteAPI = async () =>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error);
            }
            setCargando(false)
        }
        obtenerClienteAPI()
    }, [])

    return (
        cargando ? 'Cargando...' : Object.keys(cliente).length === 0 ? <p>No hay resultados</p>
        :
        (<div>
            <h1 className="font-black text-4xl text-blue-400">Información del Cliente</h1>
            <p className="mt-10">Cliente: {cliente.nombre}</p>
            <p>Email: {cliente.email}</p>
            <p>Empresa: {cliente.empresa}</p>
            {cliente.telefono && (
                <p>Teléfono: {cliente.telefono}</p>
            )}
            {cliente.notas && (
                <p>Notas: {cliente.notas}</p>
            )}
        </div>)
        )}

export default VerCliente