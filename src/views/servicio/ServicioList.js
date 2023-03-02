import React, { useEffect, useState } from 'react'
import GridTable from 'src/components/GridTable/index';
import { connect } from "react-redux";
import { CCard, CRow, CCol, CBadge, CCardTitle, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import {
    Link
} from "react-router-dom";
import AuthGuard from "../../seguridad";

import { AiOutlineEye } from 'react-icons/ai';
import { FaPlus, FaSearch } from 'react-icons/fa';
import CIcon from '@coreui/icons-react';
import { cilColorBorder, cilBellExclamation, cilCheckCircle } from '@coreui/icons';
import { MdCleaningServices } from 'react-icons/md';
const CatalogoList = (props) => {

    const [state, setState] = useState(
        {
            nombre: "",
            idArea: 0,
            correo: "",
            idCatalogo: "",
            tiposCatalogos: [],
            listaDepartamento: [],
            verificado: "0",
            idDepartamento: 0,
            defaltQuery: "verificado=" + "0",
            codigo:""
        }

    )

    useEffect(() => {
        consultarTipos();
    }, [state.defaltQuery])

    const buscar = () => {
        if (state.nombre !== "" || state.idArea !== "" || state.verificado !== "" || state.idDepartamento !== "") {
            setState({
                ...state,
                defaltQuery: "tag=" + state.nombre + "&areaId=" + (state.idArea === "" ? 0 : state.idArea) + "&verificado=" + state.verificado + "&departamentoId=" + (state.idDepartamento === "" ? 0 : state.idDepartamento) +"&codigo=" + state.codigo
            });
        } else {
            setState({
                ...state,
                defaltQuery: "verificado=" + "0",
            });
        }

    }
    const limpiar = () => {

        setState({
            ...state,
            defaltQuery: "",
            nombre: "",
            idArea: "",
        });

    }
    const colDef = [
        {
            header: "Codigo",
            render(row) {

                return row.codigo;
            },
        },
        {
            header: "Nombre Servicio",
            render(row) {
                return row.nombreServicio;
            },
        },
        {
            header: "Nombre SubServicio",
            render(row) {
                return row.nombreSubServicio;
            },
        },
        {
            header: "Estado",
            render(row, props) {

                if (row.verificado) {
                    return <CBadge className='ms-3 bg-success-2' color="success" shape="rounded-pill" > <CIcon icon={cilCheckCircle} /> </CBadge>;
                }

            },
        },
        {
            header: "Acciones",
            render(row) {
                return (
                    <div className='btn-acciones'>
                        <AuthGuard permiso="servicio-ver">
                            <Link to={"/servicio/ver/" + row.id} >
                                <AiOutlineEye color="#2278E5" size={22} className='ms-1 me-1 mb-1' />
                            </Link>
                        </AuthGuard>
                        <AuthGuard permiso="servicio-editar">
                            <Link to={"/servicio/editar/" + row.id} >
                                <CIcon className='iconWarning  me-2 ms-1' icon={cilColorBorder} size="lg" />
                            </Link>
                        </AuthGuard>
                        <AuthGuard permiso="servicio-verificar">
                            <Link to={"/servicio/verificar/" + row.id} >
                                <CIcon className='iconWarning  me-2 ms-1' icon={cilBellExclamation} size="lg" />
                            </Link>
                        </AuthGuard>
                    </div>

                );
            },
        },
    ];

    const consultarTipos = async () => {
        var tipos = await service.apiBackend.get(rutas.catalogos.areas);
        var areaLista = tipos.lista;
        let lista = [{ value: 0, label: "" },];
        areaLista.forEach((element) => {
            lista.push({ value: element.id, label: element.nombre });
        });

        var tiposDepartamento = await service.apiBackend.get(rutas.catalogos.departamentoServicio);
        var departamentoLista = tiposDepartamento.lista;
        let listaDepartamento = [{ value: 0, label: "" },];
        departamentoLista.forEach((element) => {
            listaDepartamento.push({ value: element.id, label: element.nombre });
        });
        setState({ ...state, tiposCatalogos: lista, listaDepartamento: listaDepartamento });
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
                                            <CFormText className='fs-2 fw-bold text-body'>Servicios</CFormText>
                                        </div>
                                        <div className="position-absolute top-0 end-0">

                                            <AuthGuard permiso="servicio-crear">
                                                <Link to={"/servicio/crear"} >
                                                    <CButton className='mt-2 btn-blue' > <FaPlus className='me-1 mb-1' />Crear Servicio</CButton>
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
                        <CRow className='d-flex  me-1'>
                            <CCol md={5} >
                                <CFormLabel>Nombre</CFormLabel>
                                <CInputGroup className="mb-3 search-table ">

                                    <CFormInput
                                        className="contactL-input"
                                        value={state.nombre}
                                        onChange={e =>
                                            setState({ ...state, nombre: e.target.value })
                                        }
                                        aria-describedby="basic-addon1"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={4}>
                                <CFormLabel>Area</CFormLabel>
                                <CFormSelect
                                    className="contactL-input"
                                    options={state.tiposCatalogos}
                                    id="idArea"
                                    value={state.idArea}
                                    onChange={e =>
                                        setState({ ...state, idArea: e.target.value })
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
                            <CCol md={1} className="ms-3 mt-1" >
                                <CCard className={`mt-4 border-0  text-black shadow-lg `}>
                                    <CRow className=''>
                                        <CButton className='mt-2 btn-black' color="primary" onClick={() => limpiar()}> <MdCleaningServices size={"1.2em"} className=' mb-1' /> Limpiar</CButton>
                                    </CRow>
                                </CCard>
                            </CCol>
                            <CCol md={7}>
                                <CFormLabel>Departamento</CFormLabel>
                                <CFormSelect
                                    className="contactL-input"
                                    options={state.listaDepartamento}
                                    id="idArea"
                                    value={state.idDepartamento}
                                    onChange={e =>
                                        setState({ ...state, idDepartamento: e.target.value })
                                    }
                                />
                            </CCol>
                            <CCol md={2} >
                                <CFormLabel>Codigo De Servicio</CFormLabel>
                                <CInputGroup className="mb-1 search-table ">
                                    <CFormInput
                                        type='number'
                                        placeholder='000'
                                        className="contactL-input"
                                        value={state.codigo}
                                        onChange={e =>
                                            setState({ ...state, codigo: e.target.value })
                                        }
                                        aria-describedby="basic-addon1"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel>Estado</CFormLabel>
                                <CFormSelect
                                    className='contactL-input'
                                    value={state.verificado}
                                    onChange={e =>
                                        setState({ ...state, verificado: e.target.value })
                                    }
                                >
                                    <option value="0">Todos</option>
                                    <option value="1">Verficados</option>
                                    <option value="3">Sin Verificar</option>

                                </CFormSelect>
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
                                <CCardTitle> Listado de Servicios
                                </CCardTitle>
                            </CCol>


                        </CRow>
                        <CRow >
                            <GridTable
                                definicion={colDef}
                                servicio={service.apiBackend}
                                baseRoute={rutas.servicio.base}
                                rootParms={props}
                                pageSize={5}
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
