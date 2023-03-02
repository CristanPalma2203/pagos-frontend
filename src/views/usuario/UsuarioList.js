import React, { useEffect, useState } from 'react'
import GridTable from 'src/components/GridTable/index';
import { connect } from "react-redux";
import { CCard, CRow, CCol, CCardTitle, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CBadge } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import { MdCleaningServices } from 'react-icons/md';
import {
    Link
} from "react-router-dom";
import AuthGuard from "../../seguridad";
import CIcon from '@coreui/icons-react';
import { cilColorBorder } from '@coreui/icons';

import { FaPlus, FaSearch } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
const Usuario = (props) => {


    const [departamento, setDepartamento] = useState([])

    const [state, setState] = useState(
        {
            nombre: "",
            correo: "",
            idDepartamento: 0,
            defaltQuery: ""
        }

    )
    useEffect(() => {

    }, [state.defaltQuery])

    const buscar = () => {

        if (state.nombre !== "" || state.correo !== "" || state.idDepartamento !== "") {
            setState({
                ...state,
                defaltQuery: "nombre=" + state.nombre + "&correo=" + state.correo + "&idDepartamento=" + state.idDepartamento
            });
        } else {
            setState({
                ...state,
                defaltQuery: ""
            });
        }
    }

    const colDef = [
        { header: "Nombre", field: "nombre" },
        {
            header: "Correo",
            render(row) {
                return row.identificadorAcceso;
            }
        },
        {
            header: "Departamento",
            render(row) {
                return row.departamentoDescripcion;
            }
        },
        {
            header: "Rol",
            render(row) {
                if (row.roles.length > 0) {
                    return row.roles[0].nombre;
                }
                return "";
            }
        },
        {
            header: "Estado",
            render(row) {
                if (row.activo) {
                    return <CBadge className='bg-success-2'  color="success" shape="rounded-pill" >Activo</CBadge>;
                }
                return <CBadge className='bg-danger-2'  color="danger" shape="rounded-pill"  >Inactivo</CBadge>;
            }
        },
        {
            header: "Acciones",
            render(row, props) {
                return (
                    <div className='ms-1 btn-acciones'>
                        <AuthGuard permiso="usuario-ver">
                            <Link to={"/usuario/ver/" + row.id} >
                                <AiOutlineEye color="#2278E5" size={22} className='ms-1 me-1 mb-1' />
                            </Link>
                        </AuthGuard>
                        <AuthGuard permiso="usuario-editar">
                            <Link to={"/usuario/editar/" + row.id} >
                                <CIcon className='iconWarning  me-1 ms-1' icon={cilColorBorder} size="lg" />
                            </Link>
                        </AuthGuard>
                    </div>
                );
            }
        }
    ];

    const consultarDepartamento = async () => {
        var departamento = await service.apiBackend.get(rutas.catalogos.departamentoSenasa);
        var departamentoLista = departamento.lista;
        let lista = ["",];
        departamentoLista.forEach((element) => {
            lista.push({ value: element.id, label: element.nombre });
        });
        setDepartamento(lista);


    }
    const limpiar = () => {

        setState({
            ...state,
            defaltQuery: "",
            nombre: "",
            idArea: "",
        });

    }
    useEffect(() => {
        consultarDepartamento();
    }, [])

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
                                            <CFormText className='fs-2 fw-bold text-body'>Usuario</CFormText>
                                        </div>
                                        <div className="position-absolute top-0 end-0">
                                            <AuthGuard permiso="usuario-crear">
                                                <Link to={"/usuario/crear"} >
                                                    <CButton className='mt-2 btn-blue' > <FaPlus className='me-1 mb-1' />Crear Usuario</CButton>
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
                        className="mb-3 shadow p-3 "
                    >
                        <CRow className='  me-1'>
                            <CCol md={3} >
                                <CFormLabel>Nombre</CFormLabel>
                                <CInputGroup className="mb-3 search-table ">

                                    <CFormInput
                                        className="contactL-input"
                                        id="name"
                                        value={state.nombre}
                                        onChange={e =>
                                            setState({ ...state, nombre: e.target.value })
                                        }
                                        placeholder="Identificador"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel>Correo</CFormLabel>
                                <CInputGroup className="mb-3 search-table">
                                    <CFormInput
                                        className="contactL-input"
                                        id="correo"
                                        value={state.correo}
                                        onChange={e =>
                                            setState({ ...state, correo: e.target.value })
                                        }
                                        placeholder="Correo"
                                        aria-label="Email"
                                        aria-describedby="basic-addon1"
                                    />
                                </CInputGroup>
                            </CCol>
                            <CCol md={3}>
                                <CFormLabel>Departamento</CFormLabel>
                                <CFormSelect
                                    className="contactL-input"
                                    aria-label="Default select example"
                                    options={departamento}
                                    id="idDepartamento"
                                    value={state.idDepartamento}
                                    onChange={e =>
                                        setState({ ...state, idDepartamento: e.target.value })
                                    }
                                />
                            </CCol>
                            <CCol md={1} className="mt-2" >

                                <CCard className={`mt-4 border-0  text-black shadow-lg `}>
                                    <CRow className='mt-1'>

                                        <CButton className='btn-black' onClick={() => buscar()}> <FaSearch className='me-2 mb-1' />Buscar</CButton>

                                    </CRow>

                                </CCard>
                            </CCol>
                            <CCol md={1} className="ms-2 mt-1" >
                                <CCard className={`mt-4 border-0  text-black shadow-lg `}>
                                    <CRow className=''>
                                        <CButton className='mt-2 btn-black' color="primary" onClick={() => limpiar()}> <MdCleaningServices size={"1.2em"} className=' mb-1' /> Limpiar</CButton>
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
                        className=" shadow p-3  bg-body "
                    >
                        <CRow className='mt-2'>
                            <CCol md={3}>
                                <CCardTitle> Registros de Usuarios Internos
                                </CCardTitle>
                            </CCol>


                        </CRow>
                        <CRow >
                            <GridTable
                                definicion={colDef}
                                servicio={service.apiAuth}
                                baseRoute={rutas.usuarios.base}
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



export default connect(mapStateToProps)(Usuario);
