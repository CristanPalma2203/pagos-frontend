import React, { useEffect, useState } from 'react'
import ImportadorForm from './ImportadorForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'src/components';

const ImportadorCreate = (props) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    const onSubmit = async (data) => {
        let request = {
            nombre: data.nombre,
            identificador: data.identificador,
            municipioid: parseInt(data.municipioId),
            nacionalidadId: parseInt(data.nacionalidadId),
            departamentoid: parseInt(data.departamentoId),
            telefono: data.telefono,
            celular: data.celular,
            correo: data.correo,
            direccion: data.direccion,
        }
        setLoading(true)
        await service.apiAuth.post(rutas.importador.base, request);
       
        toast.success("Se ha creado el usuario-externo");
        navigate("/importadores");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <ImportadorForm onSubmit={onSubmit} accion={"Crear"} />
        </div>
    )
}

export default ImportadorCreate