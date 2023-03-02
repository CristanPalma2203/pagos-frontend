import React, { useEffect, useState } from 'react'
import RolForm from './RolForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';

const RolView = (props) => {

    let { id } = useParams();

    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultarUsuario();
    }, [])

    const consultarUsuario = async () => {
        let usuario = await service.apiAuth.get(
            rutas.roles + "/" + id
        );
        setState({ ...state, data: usuario });
        setLoading(false)
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <RolForm soloLectura={true} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default RolView
