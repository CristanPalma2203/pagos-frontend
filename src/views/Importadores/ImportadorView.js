import React, { useEffect, useState } from 'react'
import ImportadorForm from './ImportadorForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';


const ImportadorView = (props) => {


    let { id } = useParams();

    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultarImportador();
    }, [])


    const consultarImportador = async () => {
        let importador = await service.apiAuth.get(
            rutas.importador.base + "/" + id
        );
        setState({ ...state, data: importador });
        setLoading(false)
    }



    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <ImportadorForm  soloLectura={true} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default ImportadorView