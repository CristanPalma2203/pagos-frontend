import React, { useEffect, useState } from 'react'
import PropTypes, { element } from 'prop-types';
import { CCard, CRow, CCol, CCardBody, CFormSelect, CFormLabel, CFormSwitch, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";

import { FaUserAlt } from 'react-icons/fa';
import * as FontAwesome from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { Loader } from 'src/components';
import {
    Link
} from "react-router-dom";
import Select from "react-select";
const UsuarioForm = ({ onSubmit, ...props }) => {

    const [loading, setLoading] = useState(true);

    const [validated, setValidated] = useState(false)

    const [state, setState] = useState(
        {
            activo: false,
        }
    );

    const [correoValido, setCorreovalido] = useState(true);
    const [departamento, setDepartamento] = useState([]);
    const [area, setArea] = useState([]);
    const [regional, setRegional] = useState([])
    const [rol, setRol] = useState([]);

    const myIcons = {
        Crear: "FaPlus",
        Editar: "FaEdit",
    }

    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);

    useEffect(() => {
        const overridenData = props.overridenData ?? {};
        setState({ ...state, ...overridenData });

    }, [props.overridenData])


    useEffect(() => {
        consultarCatalogos();
    }, [])


    const consultarCatalogos = async () => {
        var departamento = await service.apiAuth.get(rutas.catalogos.departamentoSenasa);
        var departamentoLista = departamento.lista;
        let lista = ["",];
        departamentoLista.forEach((element) => {

            lista.push({ value: element.id, label: element.nombre });
        });
        setDepartamento(lista);


        var area = await service.apiAuth.get(rutas.catalogos.areas);
        var areaLista = area.lista;
        let listaArea = [];
        areaLista.forEach((element) => {

            listaArea.push({ value: element.id, label: element.nombre });
        });
        
        setArea(listaArea);

        var rol = await service.apiAuth.get(rutas.rolesSinPaginar)
        var RolLista = rol.lista;
        let listaRol = ["",];
        RolLista.forEach((element) => {
            listaRol.push({ value: element.id, label: element.nombre });
        });
        setRol(listaRol);

        var regional = await service.apiAuth.get(rutas.catalogos.regional)
        var RegionalLista = regional.lista;
        let listaRegional = [];
        RegionalLista.forEach((element) => {
            listaRegional.push({ value: element.id, label: element.nombre });
        });
        setRegional(listaRegional);

        setLoading(false)
    }



    const validate = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        onSubmit(state);
    }
    if (loading) {
        return (
            <Loader />
        )
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
                            className="row needs-validation "
                            noValidate
                            validated={validated}
                        >
                            <CRow className='mb-2 '>
                                <CCol md={6} >
                                    <CFormLabel>Nombre</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={props.soloLectura}
                                            id="name"
                                            value={state.nombre}
                                            onChange={e =>
                                                setState({ ...state, nombre: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa un nombre.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Correo</CFormLabel>
                                    <CInputGroup className="mb-3 search-table">
                                        <CFormInput

                                            disabled={props.soloLectura || props.soloEditar}
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
                                            className="contactL-input"
                                            invalid={!correoValido}
                                            aria-describedby="exampleFormControlInputHelpInline"

                                        />
                                        <CFormFeedback invalid >Ingresa un correo</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow className='mb-3 '>
                                <CCol md={6}>
                                    <CFormLabel>Departamento</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura}
                                        required
                                        options={departamento}
                                        id="departamentoId"
                                        value={state.departamentoId}
                                        onChange={e =>
                                            setState({ ...state, departamentoId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid>Ingresa un Departamento.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Rol</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        required
                                        disabled={props.soloLectura}
                                        options={rol}
                                        id="rol"
                                        value={state.rolId}
                                        onChange={e =>
                                            setState({ ...state, rolId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid>Ingresa un Rol.</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CRow className='mb-3 '>
                                <CCol md={6}>
                                    <CFormLabel>Regional</CFormLabel>
                                    <Select
                                        disabled={props.soloLectura}
                                        defaultValue={state.regionales}
                                        isMulti
                                        name="regionales"
                                        options={regional}
                                        className="basic-multi-select "
                                        classNamePrefix="select"
                                        onChange={(selected) => {
                                            setState({ ...state, regionales: selected })
                                        }}
                                    />
                                    <CFormFeedback invalid>Ingresa una Regional.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Area</CFormLabel>
                                    <Select
                                        disabled={props.soloLectura}
                                        defaultValue={state.areas}
                                        isMulti
                                        name="areas"
                                        options={area}
                                        className="basic-multi-select "
                                        classNamePrefix="select"
                                        onChange={(selected) => {
                                            setState({ ...state, areas: selected })
                                        }}
                                    />
                                    <CFormFeedback invalid>Ingresa una Area.</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CRow className='mb-3 '>
                                <CCol md={6}>
                                    <CFormLabel>Usuario Activo?</CFormLabel>
                                    <CFormSwitch
                                        disabled={props.soloLectura}
                                        size="lg"
                                        id="formSwitchCheckDefaultLg"
                                        checked={state.activo}
                                        onChange={(e) => {
                                            let val = !state.activo;
                                            setState({ ...state, activo: val });
                                        }}
                                    />
                                    <CFormFeedback invalid></CFormFeedback>
                                </CCol>

                            </CRow>
                            <CRow className='mt-2'>
                                <CCol>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                        <Link to={"/usuario"} >
                                            <CButton className='me-md-2 btn-black' >Cancelar</CButton>
                                        </Link>
                                        {!props.soloLectura && (
                                            <CButton onClick={(e) => validate(e)} className='btn-blue'>{Icon}  {props.accion} Usuario  </CButton>
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

UsuarioForm.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
    soloEditar: PropTypes.bool,
};

export default UsuarioForm;