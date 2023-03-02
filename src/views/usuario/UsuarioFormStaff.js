import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { CCard, CRow, CCol, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import { FaUserAlt } from 'react-icons/fa';
import * as FontAwesome from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import {
    Link
} from "react-router-dom";

const UsuarioFormStaff = ({ onSubmit, ...props }) => {


    const [validated, setValidated] = useState(false)

    const [state, setState] = useState(
        {
            contraseñaTeporal: "",
            identificadorAccesoTemporal: "",
            identificadorAcceso: ""
        }
    );
    const [contraseñaValido, setContraseñavalido] = useState(true);
    const [correoValido, setCorreovalido] = useState(true);

    const myIcons = {
        Crear: "FaPlus",
        Editar: "FaEdit",
    }

    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);

    useEffect(() => {
        const overridenData = props.overridenData ?? {};
        setState({ ...state, ...overridenData })
    }, [props.overridenData])


    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            onSubmit(state);
        }
        setValidated(true)
    }

    return (
        <div className="animated fadeIn">

            <CRow>
                <CCol sm={12}>
                    <CCard
                        color="white"
                        className="mb-3 shadow p-3  bg-body "
                    >
                        <CRow className="mb-2">
                            <CCol xl={12}>
                                <CCard className='border-0'>
                                    <CCardBody>
                                        <CCol md={14}>
                                            <CCard className={`mb-5 border-secondary border-0  text-black shadow-lg mb-3`}>
                                                <div className="position-relative ">
                                                    <div className="position-absolute top-0 start-0">
                                                        <CFormText className='fs-4 fw-bold  text-body'> <FaUserAlt className='mb-1' /> Usuario</CFormText>
                                                    </div>
                                                    <div className="position-absolute top-0 start-100 translate-middle">
                                                        <CFormText className='fs-4 fw-bold  text-body'> <HiDotsVertical /></CFormText>
                                                    </div>
                                                </div>
                                            </CCard>
                                        </CCol>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CForm
                            onSubmit={handleSubmit}
                            className="row needs-validation "
                            noValidate
                            validated={validated}
                        >
                            <CRow className='mb-2 '>
                                <CCol md={6} >
                                    <CFormLabel>Contraseña</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            type='password'
                                            disabled={props.soloLectura}
                                            id="name"
                                            onChange={e =>
                                                setState({ ...state, contraseñaTeporal: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa un nombre.</CFormFeedback>
                                    </CInputGroup>
                                    <CFormLabel>Repetir Contraseña</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            type='password'
                                            disabled={props.soloLectura}
                                            id="name"
                                            onChange={e => {

                                                if (e.target.value == state.contraseñaTeporal) {
                                                    setContraseñavalido(true);
                                                } else { setContraseñavalido(false) }
                                                setState({ ...state, contrasena: e.target.value })
                                            }}
                                            invalid={!contraseñaValido}
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid>Contraseña no Coinciden.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Correo</CFormLabel>
                                    <CInputGroup className="mb-3 search-table">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={props.soloLectura || props.soloEditar}
                                            autoComplete="off"

                                            id="identificadorAcceso"
                                            value={state.identificadorAccesoTemporal}
                                            aria-label="Username"
                                            onChange={e =>
                                                setState({ ...state, identificadorAccesoTemporal: e.target.value })
                                            }
                                            required
                                            aria-describedby="exampleFormControlInputHelpInline"

                                        />
                                        <CFormFeedback ></CFormFeedback>
                                    </CInputGroup>
                                    <CFormLabel>Nuevo Correo</CFormLabel>
                                    <CInputGroup className="mb-3 search-table">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={props.soloLectura}
                                            autoComplete="off"

                                            id="identificadorAcceso"
                                            value={state.identificadorAcceso}
                                            onChange={e => {
                                                var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                                                if (regex.test(e.target.value)) {
                                                    setCorreovalido(true);
                                                } else { setCorreovalido(false) }
                                                setState({ ...state, identificadorAcceso: e.target.value })
                                            }
                                            }
                                            aria-label="Username"
                                            required
                                            invalid={!correoValido}
                                            aria-describedby="exampleFormControlInputHelpInline"

                                        />
                                        <CFormFeedback invalid >Ingresa un correo</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                            </CRow>

                            <CRow className='mt-2'>
                                <CCol>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                        <Link to={"/dashboard"} >
                                            <CButton  className='me-md-2 btn-black' >Cancelar</CButton>
                                        </Link>
                                        {!props.soloLectura && (
                                            <CButton type="submit" className='btn-blue' >{Icon}  {props.accion} Usuario  </CButton>
                                        )}

                                    </div>
                                </CCol>
                            </CRow>

                        </CForm>
                    </CCard>
                </CCol>
            </CRow>

        </div >
    );
}

UsuarioFormStaff.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
    soloEditar: PropTypes.bool,
};

export default UsuarioFormStaff;