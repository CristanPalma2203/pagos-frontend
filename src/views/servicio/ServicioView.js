import React, { useEffect, useState } from 'react'
import CatalogoForm from './ServicioForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';


const CatalogoEdit = (props) => {


    let { id } = useParams();

    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultarServicio();
    }, [])


    const consultarServicio = async () => {
        let servicio = await service.apiBackend.get(
            rutas.servicio.base + "/" + id
        );
        setState({ ...state, data: servicio });
        setLoading(false)
    }


    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <CatalogoForm  soloLectura={true} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default CatalogoEdit