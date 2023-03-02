import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { CCard, CRow, CCol, CCardBody, CFormSelect, CInputGroupText, CFormTextarea, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { Loader } from 'src/components';
import { FaUserAlt, FaMinus } from 'react-icons/fa';
import * as FontAwesome from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import UploadFile from 'src/components/UploadFile/UploadFile';
import {
    Link
} from "react-router-dom";
const ImportadorForm = ({ onSubmit, ...props }) => {
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false)

    const [state, setState] = useState(
        {

            ...props.overridenData,
            mostrarMunicipio: false,

        }
    )
    const [validacionArchivo, setValidacionArchivo] = useState(false)
    const [tipoIdentificador, setTipoIdentificador] = useState([])
    const [tipoPersona, setTipoPersona] = useState([])
    const [correoValido, setCorreovalido] = useState(true);
    const [departamento, setDepartamento] = useState([])
    const [municipio, setMunicipio] = useState([])
    const [nacionalidad, setNacionalidad] = useState([])
    const myIcons = {
        Crear: "FaPlus",
        Aprobar: "FaEdit",
        Rechazar: "FaMinus"
    }

    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);
    const estalecerMunicipios = async (id) => {
        if (id > 0) {
            var municipio = await service.apiAuth.get(rutas.catalogos.municipio + "/id-padre/" + id);

            var municipioLista = municipio.lista;
            let listamunicipio = ["",];
            municipioLista.forEach((element) => {
                listamunicipio.push({ value: element.id, label: element.nombre });
            });
            setMunicipio(listamunicipio);
        } else {
            setState({ ...state, municipioId: 0, mostrarMunicipio: false, departamentoId: 0 });
        }
    }

    useEffect(() => {
        consultarCatalogos();
        if (props?.overridenData?.departamentoId) {
            estalecerMunicipios(props.overridenData.departamentoId)
            setState({ ...state, mostrarMunicipio: true });
        }
    }, [props.overridenData])

    const consultarCatalogos = async () => {
        var departamento = await service.apiAuth.get(rutas.catalogos.depto);
        var departamentoLista = departamento.lista;
        let lista = ["",];
        departamentoLista.forEach((element) => {

            lista.push({ value: element.id, label: element.nombre });
        });
        setDepartamento(lista);

        var nacionalidad = await service.apiAuth.get(rutas.catalogos.paises);
        var nacionalidadLista = nacionalidad.lista;
        var listanacionalidad = ["",];
        nacionalidadLista.forEach((element) => {

            listanacionalidad.push({ value: element.id, label: element.nombre });
        });
        setNacionalidad(listanacionalidad);

        var nacionalidad = await service.apiAuth.get(rutas.catalogos.tipoIdentificacion);
        var nacionalidadLista = nacionalidad.lista;
        var listanacionalidad = ["",];
        nacionalidadLista.forEach((element) => {

            listanacionalidad.push({ value: element.id, label: element.nombre });
        });
        setTipoIdentificador(listanacionalidad);

        var nacionalidad = await service.apiAuth.get(rutas.catalogos.tipoPersona);
        var nacionalidadLista = nacionalidad.lista;
        var listanacionalidad = ["",];
        nacionalidadLista.forEach((element) => {

            listanacionalidad.push({ value: element.id, label: element.nombre });
        });
        setTipoPersona(listanacionalidad);

        setLoading(false)
    }

    const validate = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        if (correoValido) {

            onSubmit(state, false);
        }
    }
    const validateRechazo = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        if (correoValido) {
            onSubmit(state, true);
        }
    }

    if (loading) {
        return <Loader />
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
                                                        <CFormText className='fs-4 fw-bold  text-body'> <FaUserAlt className='mb-1' /> Usuario Externo</CFormText>
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


                                <CCol md={6}>
                                    <CFormLabel>Tipo Identificador</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={true}
                                        required
                                        options={tipoIdentificador}
                                        id="nacionalidadId"
                                        value={state.tipoIdentificadorId}
                                        onChange={e =>
                                            setState({ ...state, tipoIdentificadorId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid>Ingresa un Tipo Identificador.</CFormFeedback>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Identificador</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={true}
                                            id="name"
                                            value={state.identificador}
                                            onChange={e =>
                                                setState({ ...state, identificador: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa un Identificador.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Tipo Persona</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={true}
                                        required
                                        options={tipoPersona}
                                        id="nacionalidadId"
                                        value={state.tipoPersonaId}
                                        onChange={e =>
                                            setState({ ...state, tipoPersonaId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid>Ingresa un Tipo de Persona.</CFormFeedback>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Nombre</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={true}
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
                                    <CFormLabel>Telefono</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            type='number'
                                            disabled={true}
                                            id="name"
                                            value={state.telefono}
                                            onChange={e =>
                                                setState({ ...state, telefono: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa un Telefono.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>

                                <CCol md={6} >
                                    <CFormLabel>Correo</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={true}
                                            id="name"
                                            value={state.correo}
                                            onChange={e => {
                                                setCorreovalido(false);
                                                var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                                                if (regex.test(e.target.value)) {
                                                    setCorreovalido(true);
                                                } else { setCorreovalido(false) }
                                                setState({ ...state, correo: e.target.value })
                                            }
                                            }
                                            autoComplete="off"
                                            invalid={!correoValido}
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa un Correo.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Direccion</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={true}
                                            id="name"
                                            value={state.direccion}
                                            onChange={e =>
                                                setState({ ...state, direccion: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid>Ingresa una Direccion.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Nacionalidad</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={true}
                                        required
                                        options={nacionalidad}
                                        id="nacionalidadId"
                                        value={state.nacionalidadId}
                                        onChange={e =>
                                            setState({ ...state, nacionalidadId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid>Ingresa un nacionalidad.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Departamento</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={true}
                                        required
                                        options={departamento}
                                        id="departamentoId"
                                        value={state.departamentoId}

                                        onChange={e => {
                                            setState({ ...state, departamentoId: e.target.value, mostrarMunicipio: true })
                                            estalecerMunicipios(e.target.value);
                                        }}
                                    />
                                    <CFormFeedback invalid>Ingresa un Departamento.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Municipio</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={true}
                                        required
                                        options={municipio}
                                        id="municipioId"
                                        value={state.municipioId}
                                        onChange={e =>
                                            setState({ ...state, municipioId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid>Ingresa un Municipio.</CFormFeedback>
                                </CCol>
                                <CCol className='mt-3'>
                                    <UploadFile
                                        mostrarLableSiempre={true}
                                        label={"Comprobante de Identificacion"}
                                        servicio={rutas.archivos.registro}
                                        archivoId={state.archivoId}
                                        mostrasSoloVer
                                        onArchivoCargado={(e) => {
                                            setState({ ...state, archivoId: e.identificador });
                                            setValidacionArchivo(false);
                                        }
                                        }
                                    />
                                    {validacionArchivo && (
                                        <sub className=" ms-1 text-danger">

                                            {"Debes subir tu idientificacion"}
                                        </sub>
                                    )}
                                </CCol>
                                <CCol md={6} className="mt-3">
                                    <CInputGroup className='mt-4'>
                                        <CInputGroupText className='rounded-start'>Comentario</CInputGroupText>
                                        <CFormTextarea
                                            aria-label="With textarea"
                                            className=' rounded-end '
                                            required
                                            onChange={e =>
                                                setState({ ...state, comentario: e.target.value })
                                            }
                                            value={state.comentario}
                                            disabled={props.soloLectura}
                                        ></CFormTextarea>
                                    </CInputGroup>
                                    <CFormFeedback invalid>Comentario Obligatorio.</CFormFeedback>
                                </CCol>
                            </CRow>

                            <CRow className='mt-2'>
                                <CCol>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                        <Link to={"/importadores"} >
                                            <CButton className='me-md-2 btn-black' >Cancelar</CButton>
                                        </Link>
                                        {!props.soloLectura && (
                                            <CButton onClick={(e) => validateRechazo(e)} color="warning" shape="rounded-pill"><FaMinus className='me-1' />  Rechazar   </CButton>
                                        )}
                                        {!props.soloLectura && (
                                            <CButton onClick={(e) => validate(e)} className='btn-blue'  >{Icon}  {props.accion}   </CButton>
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

ImportadorForm.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
    soloEditar: PropTypes.bool,
};

export default ImportadorForm;
