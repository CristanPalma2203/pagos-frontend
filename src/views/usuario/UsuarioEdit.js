import React, { useEffect, useState } from 'react'
import UsuarioForm from './UsuarioForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UsuarioEdit = (props) => {
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

    const buscarCatalogoId = (catalogo, id) => {
        let label = "";
        catalogo.lista.forEach(element => {

            if (element.id === id) {
                label = element.nombre;
            }
        });
        return label;
    }

    const consultarUsuario = async () => {

        let usuario = await service.apiAuth.get(rutas.usuarios.base + "/" + id);

        usuario.rolId = usuario.roles[0].id
        //==================================
        let regionales = await service.apiBackend.get(rutas.catalogos.regional);
        let listaRegionales = [];
        usuario.usuarioRegional.forEach(element => {
            let nombre = buscarCatalogoId(regionales, element.regionalId);
            listaRegionales.push({ value: element.regionalId, label: nombre });
        });
        usuario.regionales = listaRegionales;
        //==================================
        let areas = await service.apiBackend.get(rutas.catalogos.areas);
        let listaAreas = [];

        usuario.usuarioArea.forEach(element => {
            let nombre = buscarCatalogoId(areas, element.areaId);
            
            listaAreas.push({ value: element.areaId, label: nombre });
        });
        usuario.areas = listaAreas;


        setState({ ...state, data: usuario });
    }

    const onSubmit = async (data) => {
        let listaIdRegionales = [];
        data?.regionales.forEach(element => {
            listaIdRegionales.push({ regionalId: element.value })
        });

        let listaAreas = [];
        data?.areas.forEach(element => {
            listaAreas.push({areaId:element.value})
        });

        let request = {
            id: parseInt(id),
            nombre: data.nombre,
            IdentificadorAcceso: data.identificadorAcceso,
            departamentoId: parseInt(data.departamentoId),
            roles: [{ id: parseInt(data.rolId) }],
            usuarioRegional: listaIdRegionales,
            usuarioArea:listaAreas,
            activo: data.activo
        }

        await service.apiAuth.put(rutas.usuarios.base + "/" + id, request);
        setLoading(true)
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
            <UsuarioForm onSubmit={onSubmit} soloEditar={true} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default UsuarioEdit
