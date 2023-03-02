import React, { useEffect, useState } from 'react'
import CatalogoForm from './ServicioForm'
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
            nombreServicio: data.nombreServicio,
            nombreSubServicio: data.nombreSubServicio,
            categoriaId: data.categoriaId,
            tipoServicioId: data.tipoServicioId,
            areaId: data.areaId,
            monedaId: data.monedaId,
            tipoCobroId: data.tipoCobroId,
            monto: data.monto,
            rubro: data.rubro,
            descripcion: data.descripcion,
            TipoCobroUnidadesId: data.tipoCobroUnidadesId,
            departamentoId: data.departamentoId,
            activo: data.activo
        }
        setLoading(true)
        await service.apiBackend.post(rutas.servicio.base, request);
        
        toast.success("Se ha creado el servicio");
        navigate("/servicio");
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