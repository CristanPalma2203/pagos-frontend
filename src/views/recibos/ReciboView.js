import React, { useEffect, useState } from 'react'
import ReciboForm from './ReciboForm'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { useParams } from "react-router-dom";
import { Loader } from 'src/components';

const ReciboView = (props) => {


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
        recibo.comentario = "";
        recibo.detalleRecibos.forEach(element => {
            area = element.servicio.areaId;
        });
        var areaCatalogo = await service.apiBackend.get(rutas.catalogos.areas);
        recibo.AreaNombre = buscarCatalogoId(areaCatalogo.lista, area);

        setState({ ...state, data: recibo });
        setLoading(false)
    }
    const onSubmit = async (data) => {

        
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

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <ReciboForm soloLectura={true}  onSubmit={onSubmit} overridenData={state.data} accion={"Ver"} />
        </div>
    )
}

export default ReciboView