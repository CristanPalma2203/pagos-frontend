import React, { useEffect, useState } from 'react'
import UsuarioFormStaff from './UsuarioFormStaff'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UsuarioEditStaff = (props) => {
    let navigate = useNavigate();

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

    useEffect(() => {
        setLoading(false)
    }, [])

    const consultarUsuario = async () => {
        let usuario = await service.apiAuth.get( rutas.usuarios.base + "/" + id );
        usuario.identificadorAccesoTemporal = usuario.identificadorAcceso
        setState({ ...state, data: usuario });
    }

    const onSubmit = async (data) => {

        let request = {
            id:parseInt(id),
            contrasena:data.contrasena,
            identificadorAcceso:  data.identificadorAcceso
            
        }
        setLoading(true)
        await service.apiAuth.post(rutas.usuarios.EditarContraseña , request);
        
        toast.success("Se ha editado el usuario");
        navigate("/usuario");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <UsuarioFormStaff onSubmit={onSubmit} soloEditar={true}overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default UsuarioEditStaff