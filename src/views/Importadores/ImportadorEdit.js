import React, { useEffect, useState } from 'react'
import ImportadorForm from './ImportadorForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { Loader } from 'src/components';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const ImportadorEdit = (props) => {
    let navigate = useNavigate();

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

   
    const onSubmit = async (data,rechazo) => {
        let request = {
            importadorId: parseInt(id),
            motivo: data.comentario,
        }

        if(!rechazo){
            await service.apiAuth.post(rutas.importador.invitar, request);
            toast.success("Se ha invitado al usuario");
        }else{
            await service.apiAuth.post(rutas.importador.rechazar, request);
            toast.warning("Se ha rechazado al usuario");
        }
        setLoading(true)

        navigate("/importadores");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <ImportadorForm onSubmit={onSubmit} soloEditar={true} overridenData={state.data} accion={"Aprobar"} />
        </div>
    )
}

export default ImportadorEdit