import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import PropTypes, { element } from 'prop-types';
import CardCreate from "./CardCreate";
import { CBadge, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'
function CardsContainers(props) {
    const [state, setState] = useState(
        {

        }
    );
    const [servicios, setServicios] = useState([]);
    const construir = (ListaServicios) => {
        
        let servicio = [];
        ListaServicios.forEach(element => {
            servicio.push(<CardCreate servicio={element}/>);
            setServicios(servicio);
        });
        
    }

    useEffect(() => {
        construir(props.ListaServicios); 
    }, [props.ListaServicios.length]);
    useEffect(() => {
        construir(props.ListaServicios); 
    }, [props.ListaServicios[0]?.codigoServicio]);
    useEffect(() => {
        construir(props.ListaServicios); 
    }, [JSON.stringify(props.ListaServicios)]);

    if(props.ListaServicios.length > 0){
        return (
            <div className="mb-3">  
                {servicios}
            </div>
        );
    }else{
        return (
            <div>  
                
            </div>
        );
    }
    
}
CardsContainers.propTypes = {
    nombreServicio: PropTypes.string,
    nombreSubServicio: PropTypes.string,
    descripcion: PropTypes.string,
    cantidadServicios: PropTypes.string,
    costoDeServicio: PropTypes.string,
    ListaServicios: PropTypes.array,
};

export default CardsContainers;