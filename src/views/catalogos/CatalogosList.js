import React, { useEffect, useState } from 'react'
import GridTable from 'src/components/GridTable/index';
import { connect } from "react-redux";
import { CCard, CRow, CCol, CCardTitle, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import {
    Link
} from "react-router-dom";
import AuthGuard from "../../seguridad";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';

import CIcon from '@coreui/icons-react';
import { cilColorBorder } from '@coreui/icons';

const CatalogoList = (props) => {

    const [state, setState] = useState(
        {
            nombre: "",
            correo: "",
            idCatalogo: "",
            tiposCatalogos: []

        }

    )

    useEffect(() => {
        consultarTipos();
    }, [state.defaltQuery])

    const buscar = () => {

        if (state.nombre !== "" || state.idCatalogo !== "") {
            setState({
                ...state,
                defaltQuery: "nombre=" + state.nombre + "&tipo=" + state.idCatalogo
            });
        } else {
            setState({
                ...state,
                defaltQuery: ""
            });
        }
    }

    const colDef = [
        {
            header: "Id",
            render(row) {
                return row.id;
            },
        },
        {
            header: "Nombre",
            render(row) {
                return row.nombre;
            },
        },
        {
            header: "Tipo",
            render(row) {
                return row.tipo;
            },
        },
        {
            header: "Abreviatura",
            render(row) {
                return row.abreviatura;
            },
        },
        {
            header: "Acciones",
            render(row) {
                return (
                    <div className='btn-acciones'>
                        <AuthGuard permiso="catalogo-ver">
                            <Link to={"/catalogo/ver/" + row.id} >
                                <AiOutlineEye color="#2278E5" size={22} className='ms-1 me-1 mb-1' />
                            </Link>
                        </AuthGuard>
                        <AuthGuard permiso="catalogo-editar">
                            <Link to={"/catalogo/editar/" + row.id} >
                                <CIcon className='iconWarning  me-2 ms-1' icon={cilColorBorder} size="lg" />
                            </Link>
                        </AuthGuard>
                    </div>

                );
            },
        },
    ];

    const consultarTipos = async () => {
        var tipos = await service.apiBackend.get(rutas.catalogos.tiposCatalogo);
        let lista = ["",];
        tipos.forEach((element) => {
            lista.push({ value: element, label: element });
        });
        setState({ ...state, tiposCatalogos: lista });
        return lista;
    }
    return (
        <div className="animated fadeIn">
            <CRow>
                <CCol xl={12}>
                    <CCard className='border-0'>
                        <CCardBody>
                            <CCol md={14}>
                                <CCard className={`mb-5 border-secondary border-0  text-black shadow-lg mb-3`}>
                                    <div className="position-relative ">
                                        <div className="position-absolute top-0 start-0">
                                            <CFormText className='fs-2 fw-bold text-body'>Catalogos</CFormText>
                                        </div>
                                        <div className="position-absolute top-0 end-0">
                                            <AuthGuard permiso="catalogo-crear">
                                                <Link to={"/catalogo/crear"} >
                                                    <CButton  className='mt-2 btn-blue' > <FaPlus className='me-1 mb-1' />Crear Catalogo</CButton>
                                                </Link>
                                            </AuthGuard>
                                        </div>
                                    </div>
                                </CCard>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol sm={12}>
                    <CCard
                        color="white"
                        className="mb-2 shadow p-3  bg-body "
                    >
                        <CRow className='d-flex justify-content-center me-1'>
                            <CCol md={6} >
                                <CFormLabel>Nombre</CFormLabel>
                                <CInputGroup className="mb-3 search-table ">

                                    <CFormInput
                                        className="contactL-input"
                                        id="name"
                                        value={state.nombre}
                                        onChange={e =>
                                            setState({ ...state, nombre: e.target.value })
                                        }
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={5}>
                                <CFormLabel>Tipo</CFormLabel>
                                <CFormSelect
                                    className="contactL-input"
                                    options={state.tiposCatalogos}
                                    id="idCatalogo"
                                    value={state.idCatalogo}
                                    onChange={e =>
                                        setState({ ...state, idCatalogo: e.target.value })
                                    }
                                />
                            </CCol>
                            <CCol md={1} className="mt-2" >

                                <CCard className={`mt-4 border-0  text-black shadow-lg `}>
                                    <CRow>

                                        <CButton className='btn-black mt-1' onClick={() => buscar()}> <FaSearch className='me-2 mb-1' />Buscar</CButton>

                                    </CRow>

                                </CCard>
                            </CCol>
                        </CRow>

                    </CCard>
                </CCol>
            </CRow>
            <CRow className='mt-2'>
                <CCol sm={12}>
                    <CCard
                        color="white"
                        className="mb-3 shadow p-3  bg-body "
                    >
                        <CRow className='mt-2'>
                            <CCol md={3}>
                                <CCardTitle> Listado de Catalogos
                                </CCardTitle>
                            </CCol>


                        </CRow>
                        <CRow >
                            <GridTable
                                definicion={colDef}
                                servicio={service.apiBackend}
                                baseRoute={rutas.catalogos.base}
                                rootParms={props}
                                pageSize={8}
                                defaltQuery={state.defaltQuery}
                            ></GridTable>
                        </CRow>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {

    return {
        usuario: state,
    };
};



export default connect(mapStateToProps)(CatalogoList);
