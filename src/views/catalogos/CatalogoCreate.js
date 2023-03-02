import React, { useEffect, useState } from 'react'
import CatalogoForm from './CatalogoForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'src/components';

const CatalogoCreate = (props) => {

    let navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    const onSubmit = async (data) => {
        let request = {
            nombre: data.nombre,
            abreviatura: data.abreviatura,
            tipo: data.tipo,
            idPadre: data.idPadre
        }
        setLoading(true)
        await service.apiBackend.post(rutas.catalogos.base, request);
        
        toast.success("Se ha creado el catalogo");
        navigate("/catalogo");
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <CatalogoForm onSubmit={onSubmit} accion={"Crear"} />
        </div>
    )
}

export default CatalogoCreate