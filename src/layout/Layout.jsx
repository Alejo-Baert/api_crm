import {Outlet, Link, useLocation} from 'react-router-dom'
import User from '../svg/user.svg'
import AddUser from '../svg/useradd.svg'

const Layout = () => {

    const location = useLocation()
    const urlActual = location.pathname

    return (
        <div className='md:flex md:min-h-screen'>
            <div className='md:w-1/4 bg-blue-400 px-5 py-10'>
                <h2 className='text-3xl text-blue-900 font-bold text-center bg-blue-300 p-5'>CRM - CLIENTES</h2>
                <nav className='mt-10'>
                    <Link className={`${urlActual === '/clientes' ? 'clicked' : 'not-clicked'} text-2xl block`} to="/clientes">
                        <img src={User} width='25px' alt="" />
                        <p>Clientes</p>
                    </Link>
                    <Link className={`${urlActual === '/clientes/nuevo' ? 'clicked' : 'not-clicked'} text-2xl block`} to="/clientes/nuevo">
                        <img src={AddUser} width='25px' alt="" />
                        <p>Nuevo Clientes</p>
                    </Link>
                </nav>
            </div>

            <div className='md:w-3/4 p-10 bg-gray-100 md:h-screen overflow-scroll'>
                <Outlet/>
            </div>
        </div>
    )
}

export default Layout