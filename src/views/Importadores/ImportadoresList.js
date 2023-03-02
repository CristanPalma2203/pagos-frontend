import React, { useEffect, useState } from 'react'
import GridTable from 'src/components/GridTable/index';
import { connect } from "react-redux";
import { CCard, CRow, CCol, CCardTitle, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CBadge } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
//import { useHistory } from "react-router-dom";
import {
    Link
} from "react-router-dom";
import AuthGuard from "../../seguridad";
import CIcon from '@coreui/icons-react';
import { cilColorBorder } from '@coreui/icons';
import { MdCleaningServices } from 'react-icons/md';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
const Importadores = (props) => {
    // let history = useHistory();
    const [state, setState] = useState(
        {
            consulta: "",
            identificador: "",
            defaltQuery: ""
        }

    )
    useEffect(() => {

    }, [state.defaltQuery])
    const limpiar = () => {

        setState({
            ...state,
            defaltQuery: "",
            nombre: "",
            idArea: "",
        });

    }
    const buscar = () => {

        if (state.identificador !== "") {
            setState({
                ...state,
                defaltQuery: "identificador=" + state.identificador
            });

        }
        else {
            setState({
                ...state,
                defaltQuery: ""
            });
        }
    }

    const colDef = [
        { header: "Nombre", field: "nombre" },
        { header: "Identificador", field: "identificador" },
        { header: "Correo", field: "correo" },
        {
            header: "Acceso",
            render(row) {
                if (row.accesoAprobado) {
                    return <CBadge color="success" shape="rounded-pill" >Activo</CBadge>;
                }
                return <CBadge color="danger" shape="rounded-pill"  >Inactivo</CBadge>;
            }
        },


        {
            header: "Acciones",
            render(row, props) {
                return (
                    <div className='ms-1 btn-acciones'>
                        <AuthGuard permiso="importador-ver">
                            <Link to={"/importadores/gestionar/" + row.id} >
                                <AiOutlineEye color="#2278E5" size={22} className='ms-1 me-1 mb-1' />
                            </Link>
                        </AuthGuard>
                        <AuthGuard permiso="importador-editar">
                            <Link to={"/importadores/editar/" + row.id} >
                                <CIcon className='iconWarning  me-1 ms-1' icon={cilColorBorder} size="lg" />
                            </Link>
                        </AuthGuard>
                    </div>
                );
            }
        }
    ];



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
                                            <CFormText className='fs-2 fw-bold text-body'>Usuario Externo</CFormText>
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
                        <CRow className='d-flex justify-content-left me-1'>
                            <CCol md={5} >
                                <CFormLabel>Identificador</CFormLabel>
                                <CInputGroup className="mb-3 search-table ">

                                    <CFormInput
                                        className="contactL-input"
                                        id="name"
                                        value={state.identificador}
                                        onChange={e =>
                                            setState({ ...state, identificador: e.target.value })
                                        }
                                        aria-describedby="basic-addon1"
                                    />
                                </CInputGroup>
                            </CCol>

                            <CCol md={1} className="mt-2" >

                                <CCard className={`mt-4 border-0  text-black shadow-lg `}>
                                    <CRow className='mt-1'>

                                        <CButton className='btn-black' onClick={() => buscar()}> <FaSearch className='me-2 mb-1' />Buscar</CButton>

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
                                <CCardTitle> Registros de Usuarios Externos
                                </CCardTitle>
                            </CCol>


                        </CRow>
                        <CRow >
                            <GridTable
                                definicion={colDef}
                                servicio={service.apiAuth}
                                baseRoute={rutas.importador.importadoresCorreoVerificado}
                                rootParms={props}
                                pageSize={7}
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
        Importadores: state,
    };
};



export default connect(mapStateToProps)(Importadores);
