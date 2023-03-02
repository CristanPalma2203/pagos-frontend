import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { CCard, CRow, CCol, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { BsBookmarkStarFill } from 'react-icons/bs';
import * as FontAwesome from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { Loader } from 'src/components';
import {
    Link
} from "react-router-dom";
const CatalogoForm = ({ onSubmit, ...props }) => {

    const [loading, setLoading] = useState(true);

    const [validated, setValidated] = useState(false)

    const [state, setState] = useState(
        {
            nombre: "",
            abreviatura: "",
            tipo: {},
            idPadre: "",
        }
    )
    const [tiposCatalogos, setTiposCatalogos] = useState([])

    const [nombresCatalogos, setNombresCatalogos] = useState([])

    const myIcons = {
        Crear: "FaPlus",
        Editar: "FaEdit",
    }

    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);

    useEffect(() => {
        const overridenData = props.overridenData ?? {};
        setState({ ...state, ...overridenData })
    }, [props.overridenData])

    useEffect(() => {
        consultarTipos();
    }, [])




    const consultarTipos = async () => {
        var tipos = await service.apiBackend.get(rutas.catalogos.tiposCatalogo);
        let lista = ["",];
        tipos.forEach((element) => {
            lista.push({ value: element, label: element });
        });
        var padres = await service.apiBackend.get(rutas.catalogos.padresCatalogo);
        let listapadres = ["",];
        padres.forEach((element) => {
            listapadres.push({ value: element.id, label: element.nombre });
        });
        setNombresCatalogos(listapadres)
        setTiposCatalogos(lista);
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
                                                        <CFormText className='fs-4 fw-bold  text-body'> <BsBookmarkStarFill /> Catalogo</CFormText>
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
   
                                            disabled={props.soloLectura}
                                            id="name"
                                            value={state.nombre}
                                            onChange={e =>
                                                setState({ ...state, nombre: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa un nombre.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Tipo</CFormLabel>
                                    <CFormSelect

                                        disabled={props.soloLectura}
                                        required
                                        options={tiposCatalogos}
                                        id="tipo"
                                        value={state.tipo}
                                        onChange={e =>
                                            setState({ ...state, tipo: e.target.value })
                                        }
                                    />
                                    <CFormFeedback invalid className='ms-3'>Ingresa un tipo de catalogo.</CFormFeedback>
                                </CCol>
                            </CRow>
                            <CRow className='mb-3 '>
                                <CCol md={6} >
                                    <CFormLabel>Abreviatura</CFormLabel>
                                    <CInputGroup className="mb-3 search-table">
                                        <CFormInput
                     
                                            disabled={props.soloLectura}
                                            autoComplete="off"
                                            id="abreviatura"
                                            value={state.abreviatura}
                                            onChange={e =>
                                                setState({ ...state, abreviatura: e.target.value })
                                            }
                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6}>
                                    <CFormLabel>Catalogo Padre </CFormLabel>
                                    <CFormSelect
         
                                        disabled={props.soloLectura}
                                        options={nombresCatalogos}
                                        id="idPadre"
                                        value={state.idPadre}
                                        onChange={e =>
                                            setState({ ...state, idPadre: e.target.value })
                                        }
                                    />
                                </CCol>
                            </CRow>
                            <CRow className='mt-2'>
                                <CCol>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                        <Link to={"/catalogo"} >
                                            <CButton color="secondary" onClick={() => { }} className='me-md-2 text-body btn-black' >Cancelar</CButton>
                                        </Link>
                                        {!props.soloLectura && (
                                            <CButton className='btn-blue' onClick={(e) => validate(e)} color="primary" >{Icon }  {props.accion}  Catalogo  </CButton>
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
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
};

export default CatalogoForm;