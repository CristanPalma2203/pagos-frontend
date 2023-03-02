import React, { useEffect, useState } from 'react'
import UsuarioForm from './UsuarioForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'src/components';

const UsuarioCreate = (props) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    const onSubmit = async (data) => {
        
        let listaIdRegionales = [];
        data?.regionales.forEach(element => {
            listaIdRegionales.push({regionalId:element.value})
        });

        let listaAreas = [];
        data?.areas.forEach(element => {
            listaAreas.push({areaId:element.value})
        });

        let request = {
            nombre: data.nombre,
            IdentificadorAcceso: data.identificadorAcceso,
            departamentoId: parseInt(data.departamentoId),
            contrasena:"",
            roles:[{id: parseInt(data.rolId)}],
            usuarioRegional:listaIdRegionales,
            usuarioArea:listaAreas,
            activo: data.activo
        }
        
        await service.apiAuth.post(rutas.usuarios.base, request);
        setLoading(true)
        toast.success("Se ha creado el usuario");
        navigate("/usuario");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <UsuarioForm onSubmit={onSubmit} accion={"Crear"} />
        </div>
    )
}

export default UsuarioCreate