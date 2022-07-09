import { Formik, Form, Field} from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import Alerta from "./Alerta";

const Formulario = ({cliente,cargando}) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string().min(3, 'El nombre es muy corto').max(20, 'El nombre es muy largo').required('El nombre es obligatorio'),
        empresa: Yup.string().required('El nombre de la empresa es obligatorio'),
        email: Yup.string().email('Email no válido').required('El nombre del email es obligatorio'),
        telefono: Yup.number().positive('Numero no valido').integer('Numero no valido').typeError('El numero no es valido'),
    })

    const handleSubmit = async (valores) => {
        try {
            let respuesta
            if(cliente.id){
                // EDITANDO REGISTRO
                const url = `http://localhost:4000/clientes/${cliente.id}`
                respuesta = await fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
            }else{
                // NUEVO REGISTRO
                const url = 'http://localhost:4000/clientes'
                respuesta = await fetch(url,{
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
            }
            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? 'Cargando...' : (

        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-2xl text-center">
                {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
            </h1>
        
            <Formik
                initialValues={{
                    nombre: cliente?.nombre ?? "",
                    empresa: cliente?.empresa ?? "",
                    email: cliente?.email ?? "",
                    telefono: cliente?.telefono ?? "",
                    notas: cliente?.notas ?? ""
                }}
                enableReinitialize={true}
                onSubmit={ async(values, {resetForm})=>{
                    handleSubmit(values)
                    resetForm()
                }}
                validationSchema={nuevoClienteSchema}
            >

                {({errors,touched})=>(
                <Form className="mt-10">
                    <div className="mb-4">
                        <label className="text-gray-800">Nombre:</label>
                        <Field type="text" name="nombre" className="mt-2 block w-full p-3 bg-gray-200" placeholder="Nombre del Cliente" />
                        {errors.nombre && touched.nombre ? (
                            <Alerta>{errors.nombre}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-800">Empresa:</label>
                        <Field type="text" name="empresa" className="mt-2 block w-full p-3 bg-gray-200" placeholder="Empresa del Cliente" />
                        {errors.empresa && touched.empresa ? (
                            <Alerta>{errors.empresa}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-800">Email:</label>
                        <Field type="email" name="email" className="mt-2 block w-full p-3 bg-gray-200" placeholder="Email del Cliente" />
                        {errors.email && touched.email ? (
                            <Alerta>{errors.email}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-800">Teléfono:</label>
                        <Field type="tel" name="telefono" className="mt-2 block w-full p-3 bg-gray-200" placeholder="Teléfono del Cliente" />
                        {errors.telefono && touched.telefono ? (
                            <Alerta>{errors.telefono}</Alerta>
                        ): null}
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-800">Notas:</label>
                        <Field as="textarea" name="notas" type="text" className="mt-2 block w-full p-3 bg-gray-200 h-40" placeholder="Notas del Cliente" />
                    </div>

                    <div className="text-center">
                        <input type="submit" value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} className="mt-5 bg-blue-400 p-3 cursor-pointer text-white uppercase text-lg font-bold" />
                    </div>
                </Form>
                )}
            </Formik>
        </div>
        )
    );
}

Formulario.defaultProps = {
    cliente:{},
    cargando: false
}

export default Formulario;