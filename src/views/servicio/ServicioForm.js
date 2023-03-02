import React, { useEffect, useState } from 'react'
import PropTypes, { element } from 'prop-types';
import { CCard, CRow, CCol, CFormSwitch, CCardBody, CFormTextarea, CBadge, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import * as FontAwesome from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { Loader } from 'src/components';
import {
    Link
} from "react-router-dom";
import { HiOutlineDocumentText } from 'react-icons/hi';
import { number } from 'is_js';

const CatalogoForm = ({ onSubmit, ...props }) => {

    const [loading, setLoading] = useState(true);

    const [validated, setValidated] = useState(false)

    const [state, setState] = useState(
        {
            start: 0,
            nombreServicio: "",
            nombreSubServicio: "",
            categoriaId: "",
            tipoServicioId: "",
            departamentoId: "",
            areaId: "",
            tipoCobroId: "",
            monto: "",
            rubro: "",
            descripcion: "",
            mostrarSubCategoria: false,

        }
    )
    const [listaCobros, setListaCobros] = useState([])
    const [categoriaCatalogos, setCategoriaCatalogos] = useState([])
    const [departamentoCatalogos, setDepartamentoCatalogos] = useState([])
    const [tiposServicioCatalogos, setTiposServicioCatalogos] = useState([])
    const [areaCatalogos, setAreaCatalogos] = useState([])
    const [tiposCobrosCatalogos, setTipoCobroCatalogos] = useState([])
    const [tiposUnidades, settiposUnidades] = useState([])
    const [monedaCatalogos, setMonedaCatalogos] = useState([])
    const myIcons = {
        Crear: "FaPlus",
        Editar: "FaEdit",
        Verificar: "FaEdit",
    }
    const traerServicio = (row) => {
        let listaCobro = [];
        if (row.tipoCobroId == 60) {
            let unidades = buscarCatalogoId(tiposUnidades, row.tipoCobroUnidadesId);
            row.rangoCobros.forEach(element => {
                listaCobro.push(<p>De <strong>{element.valorMinimo + " " + unidades} </strong> a <strong>{element.valorMaximo === 0 ? "Sin Limite" : element.valorMaximo + " " + unidades} </strong>se cobra <strong>{/*servicio.monedaId == 64 ? "L " : "$ "*/}  {(Math.round((element.monto) * 100) / 100).toFixed(2)}</strong>  {element.porCada !== 0 ? " Por cada  " + element.porCada + " " + unidades : " "}</p>);
            });
            setListaCobros(listaCobro);
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
    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);

    useEffect(() => {
        const overridenData = props.overridenData ?? {};
        setState({ ...state, ...overridenData })
        traerServicio(overridenData);
    }, [props.overridenData])

    useEffect(() => {
        consultarTipos();
    }, [])

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
        let area = await consultaCatalogo(rutas.catalogos.areas);
        let tipoUnidades = await consultaCatalogo(rutas.catalogos.unidadMedida);
        let moneda = await consultaCatalogo(rutas.catalogos.moneda);
        let categoria = await consultaCatalogo(rutas.catalogos.categoria);
        let tipoServicio = await consultaCatalogo(rutas.catalogos.tipoServicio);
        let tipoCobro = await consultaCatalogo(rutas.catalogos.tipoCobro);
        let departamentoServicio = await consultaCatalogo(rutas.catalogos.departamentoServicio);
        setCategoriaCatalogos(categoria);
        settiposUnidades(tipoUnidades);
        setTiposServicioCatalogos(tipoServicio);
        setAreaCatalogos(area);
        setTipoCobroCatalogos(tipoCobro);
        setMonedaCatalogos(moneda);
        setDepartamentoCatalogos(departamentoServicio);
        setLoading(false)
    }
    const setDecimal = e => {
        const cursorPosition = e.target.selectionStart;
        let val = e.target.value;
        val = val.replace(/([^0-9.]+)/, "");
        val = val.replace(/^(0|\.)/, "");
        const match = /(\d{0,7})[^.]*((?:\.\d{0,2})?)/g.exec(val);
        const value = match[1] + match[2];
        e.target.value = value;
        setState({ ...state, monto: value });

        if (val.length > 0) {
            e.target.value = Number(value).toFixed(2);
            e.target.setSelectionRange(cursorPosition, cursorPosition);
            setState({ ...state, monto: (Number(value).toFixed(2)) });
        }

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
                        className="mb-3 shadow p-4  bg-body "
                    >
                        <CRow className="mb-2">
                            <CCol xl={12}>
                                <CCard className='border-0'>
                                    <CCardBody>
                                        <CCol md={14}>
                                            <CCard className={`mb-5  border-0  text-black shadow-lg mb-3`}>
                                                <div className="position-relative ">
                                                    <div className="position-absolute top-0 start-0">
                                                        <CFormText className='fs-4 fw-bold  text-body'> <HiOutlineDocumentText /> Detalle del Servicio</CFormText>
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
                            <CRow>
                                <CCol className='mb-3'>
                                    <CBadge color="primary" shape="rounded-pill">Codigo De Servicio: {state.codigo}</CBadge>

                                </CCol>
                            </CRow>
                            <CRow className='mb-2 '>
                                <CCol md={6} >
                                    <CFormLabel>Nombre Servicio</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormTextarea
                                            className="contactL-input textArea"
                                            disabled={props.soloLectura || props.soloVerificar}
                                            rows="4"
                                            value={state.nombreServicio}
                                            onChange={e =>
                                                setState({ ...state, nombreServicio: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa un nombre.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Nombre SubServicio</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormTextarea
                                            className="contactL-input textArea"
                                            disabled={props.soloLectura || props.soloVerificar}
                                            rows="4"
                                            value={state.nombreSubServicio}
                                            onChange={e =>
                                                setState({ ...state, nombreSubServicio: e.target.value })
                                            }
                                            autoComplete="off"

                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa un Sub Servicio.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Descripción Servicio</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormTextarea
                                            className="contactL-input textArea"
                                            disabled={props.soloLectura || props.soloVerificar}
                                            rows="3"
                                            value={state.descripcion}
                                            onChange={e =>
                                                setState({ ...state, descripcion: e.target.value })
                                            }
                                            autoComplete="off"

                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa una descripcion.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} className="mt-2">
                                    <CFormLabel>Departamento</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.soloVerificar}
                                        required
                                        options={departamentoCatalogos}
                                        id="departamentoId"
                                        value={state.departamentoId}
                                        onChange={e => {
                                            setState({ ...state, departamentoId: e.target.value });
                                        }}

                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un departamento.</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CRow className='mb-2 '>
                                <CCol md={6}>
                                    <CFormLabel>Categoría</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.soloVerificar}
                                        required
                                        options={categoriaCatalogos}
                                        id="categoriaId"
                                        value={state.categoriaId}
                                        onChange={e => {
                                            setState({ ...state, categoriaId: e.target.value, mostrarSubCategoria: true });
                                        }}

                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un tipo de Categoria.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Tipo Servicio</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.soloVerificar}
                                        required
                                        options={tiposServicioCatalogos}
                                        id="tipoServicioId"
                                        value={state.tipoServicioId}
                                        onChange={e =>
                                            setState({ ...state, tipoServicioId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un tipo de Servicio.</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CRow className='mb-2 '>
                                <CCol md={6}>
                                    <CFormLabel>Área</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.soloVerificar}
                                        required
                                        options={areaCatalogos}
                                        id="areaId"
                                        value={state.areaId}
                                        onChange={e =>
                                            setState({ ...state, areaId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un tipo de Area.</CFormFeedback>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>ID Rubro</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input textArea"
                                            disabled={props.soloLectura || props.soloVerificar}
                                            value={state.rubro}
                                            onChange={e =>
                                                setState({ ...state, rubro: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa un Id de Rubro.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>

                            </CRow>
                            <CRow className='mb-3 '>
                                <CCol md={6}>
                                    <CFormLabel>Tipo Cobro</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.soloVerificar}
                                        required
                                        options={tiposCobrosCatalogos}
                                        id="tipoCobro"
                                        value={state.tipoCobroId}
                                        onChange={e => {

                                            setState({ ...state, tipoCobroId: e.target.value, monto: "" })

                                        }}
                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un tipo de cobro.</CFormFeedback>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Moneda</CFormLabel>
                                    <CFormSelect
                                        className="contactL-input"
                                        disabled={props.soloLectura || props.soloVerificar}
                                        required
                                        options={monedaCatalogos}
                                        id="monedaId"
                                        value={state.monedaId}
                                        onChange={e =>
                                            setState({ ...state, monedaId: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un tipo de moneda.</CFormFeedback>
                                </CCol>
                            </CRow>

                            {state.tipoCobroId == 59 && (

                                <CRow className='mb-2 '>
                                    <CCol md={3}>
                                        <CFormLabel>Monto</CFormLabel>
                                        <CFormInput
                                            className="contactL-input textArea"
                                            disabled={props.soloLectura || props.soloVerificar}
                                            value={state.monto}
                                            onChange={setDecimal}
                                            autoComplete="off"

                                            type='double'
                                        />
                                    </CCol>
                                </CRow>
                            )}
                            {state.tipoCobroId == 60 && (

                                <CRow className='mb-2 '>
                                    <CCol md="6" className=' me-auto ms-auto mb-2'>

                                        <CFormLabel>Tabla de Montos</CFormLabel>
                                        <CCard>
                                            <CCardBody className='ms-auto me-auto'>{listaCobros}</CCardBody>
                                        </CCard>



                                    </CCol>
                                    <CCol className=' me-auto ms-auto mb-2'>
                                        <CFormLabel>Tipo Unidades</CFormLabel>
                                        <CFormSelect
                                            className="contactL-input"
                                            disabled={props.soloLectura}
                                            required
                                            options={tiposUnidades}
                                            id="tiposUnidades"
                                            value={state.tipoCobroUnidadesId}
                                            onChange={e => {

                                                setState({ ...state, tipoCobroUnidadesId: e.target.value, monto: "" })

                                            }}
                                        />
                                    </CCol>

                                </CRow>
                            )}
                            <CRow className='mt-3 '>
                                <CCol md={6}>
                                    <CFormLabel>Servicio Activo?</CFormLabel>
                                    <CFormSwitch
                                        disabled={props.soloLectura || props.soloVerificar}
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
                                        <Link to={"/servicio"} >
                                            <CButton className='me-md-2 btn-black' >Cancelar</CButton>
                                        </Link>
                                        {!props.soloLectura && (
                                            <CButton onClick={(e) => validate(e)}  className='btn-blue' >{Icon}  {props.accion} Servicio  </CButton>
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

CatalogoForm.propTypes = {
    soloVerificar: PropTypes.bool,
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
};

export default CatalogoForm;