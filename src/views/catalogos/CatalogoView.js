import React, { useEffect, useState } from 'react'
import CatalogoForm from './CatalogoForm'
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
        consultarCatalogo();
    }, [])


    const consultarCatalogo = async () => {
        let catalogo = await service.apiBackend.get(
            rutas.catalogos.consultaPorid + "/" + id
        );
        if (catalogo.idPadre != null && catalogo.idPadre > 0) {
            let catalogoPadre = await service.apiBackend.get(
                rutas.catalogos.consultaPorid + "/" + catalogo.idPadre
            );
            catalogo.catalogoPadre = catalogoPadre;
        } else {
            catalogo.catalogoPadre = "";
        }
        if(catalogo.idPadre == null){
            catalogo.idPadre = "";
        }
        catalogo.tipo = catalogo.tipo;
        setState({ ...state, data: catalogo });
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