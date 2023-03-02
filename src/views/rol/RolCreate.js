import React, { useEffect, useState } from 'react'
import RolForm from './RolForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'src/components';

const RolCreate = (props) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    const onSubmit = async (data) => {
        var newchecked = [];
        data.checked.forEach(s => {
            newchecked.push(parseInt(s));
        });
        let request = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            permisos: newchecked,
        }
        setLoading(true)
        await service.apiAuth.post(rutas.roles, request)
        
        toast.success("Se ha creado el rol");
        navigate("/rol");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <RolForm onSubmit={onSubmit} accion={"Crear"} />
        </div>
    )
}

export default RolCreate