import React, { useEffect, useState } from 'react'
import RolForm from './RolForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { toast } from 'react-toastify';
import { useNavigate, useParams} from 'react-router-dom';
import { Loader } from 'src/components';

const RolEdit = (props) => {

    let navigate = useNavigate();
    let { id } = useParams();
    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultarRol();
    }, [])

    const consultarRol = async () => {
        let rol = await service.apiAuth.get(
            rutas.roles + "/" + id
        );
        setState({ ...state, data: rol });
        setLoading(false)
    }

    const onSubmit = async (data) => {
        var newchecked = [];
        data.checked.forEach(s => {
            newchecked.push(parseInt(s));
        });
        let request = {
            id:data.id,
            nombre: data.nombre,
            descripcion: data.descripcion,
            permisos: newchecked
        }
        setLoading(true)
        await service.apiAuth.put(rutas.roles+"/"+data.id , request);
        
        toast.success("Se ha editado el catalogo");
        navigate("/rol");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <RolForm onSubmit={onSubmit} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default RolEdit
