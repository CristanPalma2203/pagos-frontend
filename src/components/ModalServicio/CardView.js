import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import PropTypes, { element } from 'prop-types';
import { CBadge, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'
function CardView(props) {
    const [state, setState] = useState(
        {

        }
    );

    useEffect(() => {

    }, []);

    return (
        <div >
            <CCard className="backGround-white-cardView mb-1 mt-2">
                {
                    /* 
                    <div className="multi-button">
                    {props.servicio[3]}
                    </div>
                    */
                }
                <CCardBody >
                    
                    <b>{props.nombreServicio}</b>
                    {props.nombreSubServicio !== "" && (
                        " / " + props.nombreSubServicio
                    )}
                    {props.descripcion !== "" && (
                        <>
                            {"/"}  <blink className="textL">  {props.descripcion}</blink>
                        </>
                    )}
                    <CCardText><small className="text-medium-emphasis">Cantidad de Servicio Cobrados: <b> {props.cantidadServicios}</b> </small></CCardText>
                </CCardBody>
            </CCard>

        </div>

    );
}
CardView.propTypes = {
    nombreServicio: PropTypes.string,
    nombreSubServicio: PropTypes.string,
    descripcion: PropTypes.string,
    cantidadServicios: PropTypes.number,
    costoDeServicio: PropTypes.string,
};

export default CardView;