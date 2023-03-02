import React, { useEffect, useState } from 'react'
import CatalogoForm from './CatalogoForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { Loader } from 'src/components';
import { toast } from 'react-toastify';
import { useNavigate,useParams } from 'react-router-dom';

const CatalogoEdit = (props) => {
    let navigate = useNavigate();

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

    const onSubmit = async (data) => {
        let request = {
            id:id,
            nombre: data.nombre,
            abreviatura: data.abreviatura,
            tipo: data.tipo,
            idPadre: data.idPadre
        }
        setLoading(true)
        await service.apiBackend.put(rutas.catalogos.base, request);
       
        toast.success("Se ha editado el catalogo");
        navigate("/catalogo");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <CatalogoForm onSubmit={onSubmit} overridenData={state.data} accion={"Editar"} />
        </div>
    )
}

export default CatalogoEdit