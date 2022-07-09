import Ver from '../svg/ver.svg'
import Editar from '../svg/editar.svg'
import Eliminar from '../svg/eliminar.svg'
import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente,handleEliminar}) => {

    const navigate = useNavigate()

    const {nombre, empresa, email, telefono, notas, id} = cliente

    return (
        <tr className='tr hover:bg-gray-100 border-b-2 h-28'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p><span className='text-gray-800 font-bold uppercase'>Email:</span> {email}</p>
                <p><span className='text-gray-800 font-bold uppercase'>Telefono:</span> {telefono}</p>
            </td>
            <td className='p-3'>{empresa}</td>
            <td className='w-1/5'>
                <div className='hovered'>
                    <button onClick={() => navigate(`/clientes/${id}`)} ><img src={Ver} width="35px"/></button>
                    <button onClick={() => navigate(`/clientes/editar/${id}`)} ><img src={Editar} width="35px"/></button>
                    <button onClick={() => handleEliminar(id)}><img src={Eliminar} width="35px"/></button>
                </div>
            </td>
        </tr>
    )
}

export default Cliente