import React, { useEffect, useState } from 'react'
import CatalogoForm from './ServicioForm'
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
        consultarServicio();
    }, [])


    const consultarServicio = async () => {
        let servicio = await service.apiBackend.get(
            rutas.servicio.base + "/" + id
        );
        setState({ ...state, data: servicio });
        setLoading(false)
    }

    const onSubmit = async (data) => {

        let request = {
            id: data.id,
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
            activo: data.activo,
            MetodoVerificacion:true,
            codigo: data.codigo,
        }
        
        await service.apiBackend.put(rutas.servicio.base + "/" + data.id, request);
        setLoading(true)
        toast.success("Se ha editado el servicio");
        navigate("/servicio");
   
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <CatalogoForm onSubmit={onSubmit} soloVerificar={true} overridenData={state.data} accion={"Verificar"} />
        </div>
    )
}

export default CatalogoEdit