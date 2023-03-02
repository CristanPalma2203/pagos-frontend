import React, { useEffect, useState } from 'react'
import ReciboForm from './ReciboForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from 'src/components';

const ReciboEdit = (props) => {

    let navigate = useNavigate();
    let { id } = useParams();
    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultarRecibo();
    }, [])
    const elegirRubro = (rubroId) => {
        let label = "";
        if (rubroId === 12199) {
            label = "Tasas Varias";
        }
        return label;
    }
    const consultarRecibo = async () => {
        let recibo = await service.apiBackend.get(
            rutas.recibo.base + "/" + id
        );
        recibo.servicio = recibo.detalleRecibos[0].servicio;
        var regionalCatalogo = await service.apiBackend.get(rutas.catalogos.regional);
        recibo.regionalNombre = buscarCatalogoId(regionalCatalogo.lista, recibo.regionalId);
        var area = 0;
        recibo.rubroNombre = elegirRubro(recibo.servicio.rubro);
        recibo.detalleRecibos.forEach(element => {
            area = element.servicio.areaId;
        });
        var areaCatalogo = await service.apiBackend.get(rutas.catalogos.areas);
        recibo.AreaNombre = buscarCatalogoId(areaCatalogo.lista, area);

        setState({ ...state, data: recibo });
        setLoading(false)
    }
    const buscarCatalogoId = (catalogo, id) => {
        let label = "";
        catalogo.forEach(element => {
            if (element.id === id) {
                label = element.nombre
            }
        });
        return label;
    }
    const onSubmit = async (data) => {

        let request = {
            id: data.id,
            identificacion: data.identificacion,
            nombreRazon: data.nombreRazon,
            servicioId: data.servicioId,
            montoTotal: (data.servicio.monto == null ? data.montoTotal : data.servicio.monto),
            tipoIdentificadorId: data.tipoIdentificadorId,
            comentario: data.comentario
        }
        await service.apiBackend.put(rutas.recibo.base + "/" + data.id, request);
        toast.success("Se ha procesado el Recibo");
        navigate("/recibo");
    }
    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <ReciboForm editView={true} onSubmit={onSubmit} overridenData={state.data} accion={"Procesar"} />
        </div>
    )
}

export default ReciboEdit