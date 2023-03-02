import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import PropTypes, { element } from 'prop-types';
import { CBadge, CCard, CCardBody, CCardTitle, CCardText, CButton, CRow, CCol } from '@coreui/react'
function CardCreate(props) {
    const [state, setState] = useState(
        {
            sizeInput: 11,
        }
    );
    const [servicio, setServicio] = useState([]);
    const construir = (Propsservicio) => {

        let servicioUnico = Propsservicio.servicio;
        if (servicioUnico.adicionarMismoServicio) {
            setState({ ...state, sizeInput: 9 });
        }
        setServicio({ ...servicio, ...servicioUnico });
    }
    useEffect(() => {
        construir(props.servicio);
    }, [props.servicio]);

    useEffect(() => {
        construir(props.servicio);
    }, [props.servicio.cantidadServicio]);
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
                <CRow>
                    {servicio.adicionarMismoServicio && (
                        <CCol sm={1} className=" ms-auto mt-auto mb-auto">
                            {props.servicio.cantidadInput}
                        </CCol>
                    )}

                    <CCol sm={state.sizeInput} className="ms-auto mt-auto mb-auto">
                        <CCardBody >

                            <b>{servicio.nombreServicio}</b>
                            {servicio.nombreSubServicio !== "" && (
                                " / " + servicio.nombreSubServicio
                            )}
                            {servicio.descripcion !== "" && (
                                <>
                                    {"/"}  <blink className="textL">  {servicio.descripcion}</blink>
                                </>
                            )}
                            {props.servicio.servicio.tipoCobroId === 59 && (
                                <CCardText><small className="text-medium-emphasis">Precio del Servicio: <b> {servicio.monedaId == 64 ? "L " : "$ "} {(Math.round((servicio.monto) * 100) / 100).toFixed(2)} </b> </small></CCardText>
                            )}

                        </CCardBody>
                    </CCol>

                    <CCol md={1} className="ms-auto mt-auto mb-auto" >
                        {props.servicio.eliminar}
                    </CCol>
                </CRow>

            </CCard>

        </div>

    );
}
CardCreate.propTypes = {
    servicio: PropTypes.object,
    btnEliminar: PropTypes.object,
    nombreServicio: PropTypes.string,
    nombreSubServicio: PropTypes.string,
    descripcion: PropTypes.string,
    cantidadServicios: PropTypes.string,
    costoDeServicio: PropTypes.string,
};

export default CardCreate;