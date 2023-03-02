import React, { useEffect, useState } from 'react'
import UsuarioForm from './UsuarioForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';


const UsuarioView = (props) => {


    let { id } = useParams();

    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ConsultarUsuarios();
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
    const ConsultarUsuarios = async () => {
        let usuario = await service.apiAuth.get(
            rutas.usuarios.base + "/" + id
        );
        usuario.rolId = usuario.roles[0].id

        let regionales = await service.apiBackend.get(rutas.catalogos.regional);
        let listaRegionales = [];
        usuario.usuarioRegional.forEach(element => {
            let nombre = buscarCatalogoId(regionales, element.regionalId);
            listaRegionales.push({ value: element.regionalId, label: nombre });
        });
        usuario.regionales = listaRegionales;

        let areas = await service.apiBackend.get(rutas.catalogos.areas);
        let listaAreas = [];
        usuario.usuarioArea.forEach(element => {
            let nombre = buscarCatalogoId(areas, element.areaId);

            listaAreas.push({ value: element.areaId, label: nombre });
        });
        usuario.areas = listaAreas;


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
            <UsuarioForm soloLectura={true} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default UsuarioView