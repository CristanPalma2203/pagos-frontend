import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { CCard, CRow, CCol, CCardBody, CInputGroup, CInputGroupText, CFormTextarea, CAlert, CBadge, CFormSelect, CAlertLink, CModal, CModalHeader, CAlertHeading, CModalTitle, CModalBody, CFormLabel, CFormInput, CButton, CFormText, CForm, CFormFeedback, CContainer } from '@coreui/react'
import service from "../../Http/httpHelper";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import * as FontAwesome from 'react-icons/fa';
import rutas from "../rutas";
import { AiFillStar, } from "react-icons/ai"
import { HiDotsVertical } from 'react-icons/hi';
import { RiShieldStarFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { ModalServicio } from 'src/components';
import moment from "moment";
import Card from "../../components/ModalServicio/CardView"
const ReciboForm = ({ onSubmit, ...props }) => {

    const [state, setState] = useState(
        {
            buscadorModal: "",
            defaltQuery: "",
            categoriaServicio: "",
            identificacion: "",
            nombreRazon: "",
            montoTotal: "",
            servicioId: "",
            tipoIdentificadorId: "",
            servicio: [],
            categoriaId: "",
            comentario: "",
        }
    )
    const [solicitud, setsolicitud] = useState(false);
    const [servicio, setServicio] = useState({
        nombreServicio: "",
        nombreSubServicio: "",
        monto: "",
        monedaId: "",
        descripcion: "",

    });
    const myIcons = {
        Crear: "FaPlus",
        Ver: "FaPlus",
        Procesar: "FaEdit",
    }

    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);

    const validate = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        }
        setValidated(true)
        if (state.comentario !== "") {
            onSubmit(state);
        }

    }
    const [validated, setValidated] = useState(false);
    const [visibleLg, setVisibleLg] = useState(false);
    const [mostrarServicio, setMostrarServicio] = useState(false)
    const [identificadorCatalogos, setIdentificadorCatalogos] = useState([])
    const [categoriaServicio, setCategoriaServicio] = useState([])
    const [regionales, setRegionales] = useState([])
    const [servicios, setServicios] = useState([])
    const consultaCatalogo = async (rutaCatalogo) => {
        var dataResponse = await service.apiBackend.get(rutaCatalogo);
        let dataResponseList = dataResponse.lista;
        let data = ["",];
        dataResponseList.forEach((element) => {
            data.push({ value: element.id, label: element.nombre });
        });
        return data;
    }
    const consultarTipos = async () => {
        let tipoIdentificador = await consultaCatalogo(rutas.catalogos.tipoIdentificacion);
        let categoriaServicio = await consultaCatalogo(rutas.catalogos.categoria);
        let regionalServicio = await consultaCatalogo(rutas.catalogos.regional);
        setIdentificadorCatalogos(tipoIdentificador);
        setRegionales(regionalServicio);
        setCategoriaServicio(categoriaServicio);
    }
    const traerServicio = (row) => {
        const dataServicio = row ?? {};
        setServicio({ ...servicio, ...dataServicio });
        setVisibleLg(false);
        setsolicitud(true);
    }
    const buscarServicio = () => {
        if (state.categoriaServicio !== "") {
            setState({
                ...state,
                defaltQuery: "categoriaId=" + state.categoriaServicio
            });
            setVisibleLg(!visibleLg)
        } else {
            setState({
                ...state,
                defaltQuery: "categoriaId=0"
            });
            setVisibleLg(!visibleLg)
        }
    }

    const test = (estadoId) => {
        if (estadoId == 6) {
            return <CBadge className='bg-info-2' shape="rounded-pill" >Creado</CBadge>;
        } else if (estadoId == 7) {
            return <CBadge className='bg-success-2' shape="rounded-pill"  >Pagado</CBadge>;
        } else if (estadoId == 8) {
            return <CBadge cclassName='bg-dark-2'shape="rounded-pill"  >Procesado</CBadge>;
        } else if (estadoId == 9) {
            return <CBadge className='bg-dark-2' shape="rounded-pill"  >Utilizado</CBadge>;
        } else if (estadoId == 10) {
            return <CBadge className='bg-dark-2' shape="rounded-pill"  >Solicitado</CBadge>;
        }
        else {
            return <CBadge className='bg-danger-2' shape="rounded-pill"  >Anulado</CBadge>;
        }


    }
    const buscarCatalogoId = (catalogo, id) => {
        let label = "";
        catalogo.forEach(element => {
            if (element.value === id) {
                label = element.label
            }
        });
        return label;
    }
    useEffect(() => {
        consultarTipos();
        const overridenData = props.overridenData ?? {};
        setState({ ...state, ...overridenData, checked: overridenData.permisos })


    }, [])
    useEffect(() => {

        const overridenData = props.overridenData ?? {};
        if (props.overridenData) {

            overridenData.detalleRecibos.forEach(element => {

                servicios.push(<Card
                    key={servicios.length}
                    cantidadServicios={element.cantidadServicio}
                    nombreServicio={element.servicio.nombreServicio}
                    nombreSubServicio={element.servicio.nombreSubServicio}
                    descripcion={element.servicio.descripcion}
                />);
            });
            setMostrarServicio(true);
        }
    }, [servicios])


    return (
        <div className="animated fadeIn">
            <CRow>
                <CCol sm={12}>
                    <CCard color="white"
                        className="mb-3 shadow p-4  bg-body ">
                        <CRow className="mb-2">
                            <CCol xl={12}>
                                <CCard className='border-0'>
                                    <CCardBody>
                                        <CCol md={14}>
                                            <CCard className={`mb-5 border-secondary border-0  text-black shadow-lg mb-3`}>
                                                <div className="position-relative ">
                                                    <div className="position-absolute top-0 start-0">
                                                        <CFormText className='fs-4 fw-bold  text-body'> <RiShieldStarFill /> Detalle del Recibo</CFormText>
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
                                <CCol >
                                    <CFormLabel className='textL'>Tipo de Identificación</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        options={identificadorCatalogos}
                                        disabled={props.soloLectura || props.editView}
                                        value={state.tipoIdentificadorId}
                                        onChange={e => {
                                            setState({ ...state, tipoIdentificadorId: e.target.value });
                                        }}
                                        required
                                    />
                                    <CFormFeedback invalid>Ingresa un tipo de identificacion.</CFormFeedback>
                                </CCol>
                                <CCol >
                                    <CFormLabel className='textL' >Identificador</CFormLabel>
                                    <CFormInput
                                        type="number"
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.editView}
                                        onChange={(e) => setState({ ...state, identificacion: e.target.value })}
                                        value={state.identificacion}
                                        required
                                    />
                                    <CFormFeedback invalid>Ingresa una identificacion.</CFormFeedback>
                                </CCol>

                            </CRow>
                            <CRow className="rowL mb-3">
                                <CCol>
                                    <CFormLabel className='textL' >Nombre o Razón Social</CFormLabel>
                                    <CFormInput
                                        type="textL"
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.editView}
                                        onChange={(e) => setState({ ...state, nombreRazon: e.target.value })}
                                        value={state.nombreRazon}
                                        required
                                    />
                                    <CFormFeedback invalid>Ingresa un Nombre.</CFormFeedback>
                                </CCol>

                            </CRow>

                            {(!props.editView && !props.soloLectura) && (
                                <>
                                    <CRow>
                                        <CCol >
                                            <CButton onClick={() => buscarServicio()} disabled={props.soloLectura || props.editView} className="btn-landing mt-4 mb-3 ">Servicios</CButton>
                                        </CCol>
                                    </CRow>
                                </>
                            )}

                          
                            {!solicitud && (
                                state.servicio.nombreServicio !== "" && (
                                    <>


                                        {mostrarServicio && (
                                            servicios
                                        )}
                                        {(props.editView || props.soloLectura) && (

                                            <CRow className="rowL mt-3 mb-3">
                                                <CAlert color="dark" className='backGround-white-cardView ms-3 mb-1 mt-2 shadow-lg' >
                                                    <CRow>
                                                        <CCol>
                                                            <CAlertHeading tag="h4">TGR1: {state.id} </CAlertHeading>
                                                        </CCol>
                                                        <CCol>

                                                            <CAlertHeading tag="h4">Rubro: {state.rubroNombre + "(" + state.servicio.rubro +")"}  </CAlertHeading>
                                                        </CCol>
                                                        <CCol>
                                                            <CAlertHeading tag="h4">Monto Recibo: 
                                                                {state.servicio.tipoCobroId !== 58 && (<small className="titleL-sm fw-normal"> {state.servicio.monedaId == 64 ? "L. " : "$ "} {(Math.round((state.servicio.monto == null ? state.montoTotal : state.servicio.monto) * 100) / 100).toFixed(2)}  </small>)}
                                                            </CAlertHeading>
                                                        </CCol>
                                                    </CRow>


                                                    <CRow className="justify-content-start">
                                                        {state.importador?.identificador !== "0" && (

                                                            <CCol xs={3}>
                                                                <p><strong>Usuario: </strong> {state.importador?.nombre}</p>
                                                            </CCol>
                                                        )}
                                                        <CCol xs={2}>
                                                            <p><strong>Identificador: </strong> {(state.importador?.identificador === "0") ? state.identificacion : state.importador?.identificador}</p>
                                                        </CCol>
                                                        <CCol xs={3}>
                                                            {state.regionalNombre && (
                                                                <p><strong>Regional: </strong> {state.regionalNombre}</p>
                                                            )}
                                                        </CCol>
                                                        <CCol xs={4}>
                                                            {state.AreaNombre && (
                                                                <p><strong>Area: </strong> {state.AreaNombre}</p>
                                                            )}
                                                        </CCol>
                                                        <hr />
                                                    </CRow>
                                                    <CRow className="justify-content-start">
                                                        <CCol xs={3}>
                                                            {state.fechaCreacion !== "0001-01-01T00:00:00" && (
                                                                <p><strong>Fecha Creacion: </strong> {moment(state.fechaCreacion).format("DD-MM-YYYY")}</p>
                                                            )}
                                                        </CCol>
                                                        <CCol xs={3}>
                                                            {state.fechaPago !== "0001-01-01T00:00:00" && (
                                                                <p><strong>Fecha Pagado: </strong> {moment(state.fechaPago).format("DD-MM-YYYY")}</p>
                                                            )}
                                                        </CCol>
                                                        <CCol xs={3}>
                                                            {state.fechaUtilizado !== "0001-01-01T00:00:00" && (
                                                                <p><strong>Fecha Utilizado: </strong> {moment(state.fechaUtilizado).format("DD-MM-YYYY")}</p>
                                                            )}
                                                        </CCol>
                                                    </CRow>
                                                    <CRow className="justify-content-start">
                                                        <CCol xs={3}>

                                                            <p><strong>Estado Senasa: </strong> {test(state.estadoSenasaId)}</p>
                                                        </CCol>
                                                        <CCol xs={3}>
                                                            <p><strong>Estado Sefin: </strong> {test(state.estadoSefinId)}</p>
                                                        </CCol>
                                                        {state.estadoSefinId === 8 && (
                                                            <>
                                                                <CCol xs={3}>
                                                                    <p><strong>Procesador Por: </strong> {state.usuarioAsignado?.nombre}</p>
                                                                </CCol>
                                                                <CCol xs={3}>
                                                                    <p><strong>Regional: </strong> {buscarCatalogoId(regionales, state.regionalId)}</p>
                                                                </CCol>
                                                            </>

                                                        )}
                                                    </CRow>

                                                    <p className="mb-0">Puedes Ponerte en contacto al soporte tecnico al correo <CAlertLink >soporteSenasa@gmail.com</CAlertLink></p>
                                                </CAlert>
                                            </CRow>

                                        )}
                                    </>
                                )
                            )}
                            <CRow className='mb-2 '>
                                <CCol>
                                    <CInputGroup className='mt-1'>
                                        <CInputGroupText className='rounded-start'>Comentario</CInputGroupText>
                                        <CFormTextarea
     
                                            className=' rounded-end '
                                            required
                                            onChange={e =>
                                                setState({ ...state, comentario: e.target.value })
                                            }
                                            value={state.comentario}
                                            disabled={props.soloLectura || state.estadoSefinId !== 7}
                                        ></CFormTextarea>
                                    </CInputGroup>
                                    <CFormFeedback invalid>Comentario Obligatorio.</CFormFeedback>
                                </CCol>
                                <CCol >
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end  position-absolute bottom-0 end-0 mb-4 me-4 ">
                                        <Link to={"/recibo"} >
                                            <CButton className='me-md-2  btn-black ' >Volver</CButton>
                                        </Link>
                                        {!props.soloLectura && state.estadoSefinId === 7 && (
                                            <CButton className='btn-blue' onClick={(e) => validate(e)}  >{Icon}  {props.accion} Recibo  </CButton>
                                        )}
                                    </div>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCard>
                </CCol>
            </CRow >
        </div >
    )
}

ReciboForm.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
    editView: PropTypes.bool,
};

export default ReciboForm;
