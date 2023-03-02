import React, { useEffect, useState } from 'react'
import GridTable from 'src/components/GridTable/index';

import { CCard, CRow, CCol, CCardTitle, CCardBody, CFormLabel, CInputGroup, CFormInput, CButton, CFormText } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import {
  Link
} from "react-router-dom";
import AuthGuard from "../../seguridad";
import { FaPlus, FaSearch } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import { MdCleaningServices } from 'react-icons/md';
const RolList = (props) => {

  const [state, setState] = useState(
    {
      nombre: "",
      correo: "",
    }

  )

  useEffect(() => {

  }, [state.defaltQuery])

  const buscar = () => {
    if (state.nombre !== "") {
      setState({
        ...state,
        defaltQuery: "nombre=" + state.nombre
      });
    } else {
      setState({
        ...state,
        defaltQuery: ""
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
    { header: "Identificador", field: "id" },
    { header: "Nombre", field: "nombre" },
    {
      header: "Fecha de creación",
      render(row) {
        return moment(row.fehchaCreacion).format("DD-MM-YYYY");
      }
    },
    {
      header: "Acciones",
      render(row, props) {
        return (
          <div>

            <AuthGuard permiso="rol-ver">
              <Link to={"/rol/ver/" + row.id} >
                <AiOutlineEye color="#2278E5" size={22} className='me-1 mb-1' />
              </Link>
            </AuthGuard>
            <AuthGuard permiso="rol-editar">
              <Link to={"/rol/editar/" + row.id} >
                <BiEditAlt color="#EF8420" size={22} className='me-1 mb-1 ' />
              </Link>
            </AuthGuard>

          </div>

        );
      },
    },
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
                      <CFormText className='fs-2 fw-bold text-body'>Rol</CFormText>
                    </div>
                    <div className="position-absolute top-0 end-0">
                      <AuthGuard permiso="rol-crear">
                        <Link to={"/rol/crear"} >
                          <CButton className='mt-2 btn-blue' > <FaPlus className='me-1 mb-1' />Crear Rol</CButton>
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
            <CRow className='d-flex justify-content-left me-1'>
              <CCol md={5} >
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
            className="mb-3 shadow p-3  bg-body "
          >
            <CRow className='mt-2'>
              <CCol md={3}>
                <CCardTitle> Listado de Roles
                </CCardTitle>
              </CCol>


            </CRow>
            <CRow >
              <GridTable
                definicion={colDef}
                servicio={service.apiAuth}
                baseRoute={rutas.roles}
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


export default (RolList);
