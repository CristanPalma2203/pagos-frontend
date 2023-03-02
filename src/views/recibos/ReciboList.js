import React, { useEffect, useState } from 'react'
import GridTable from 'src/components/GridTable/index';
import { connect , useSelector} from "react-redux";
import { CCard, CRow, CCol, CCardTitle, CBadge, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText } from '@coreui/react'
import service from "../../Http/httpHelper";
import rutas from "../rutas";
import {
  Link
} from "react-router-dom";
import AuthGuard from "../../seguridad";
import { FaSearch } from 'react-icons/fa';
import { MdCleaningServices } from 'react-icons/md';
import { AiOutlineEye, AiOutlineFieldTime } from "react-icons/ai";

const ReciboList = (props) => {

  const [state, setState] = useState(
    {
      numeroRecibo: "",
      estadoReciboSefin: 0,
      estadoReciboSenasa: 0
    }
  );
  const [loading, setLoading] = useState(true);
  const [estadosRecibo, setEstadosRecibo] = useState([]);
  const [moneda, setMoneda] = useState([]);
  const usuario = useSelector((state) => state.usuario)
  useEffect(() => {
    consultarCatologos();

  }, [state.defaltQuery])

  const buscar = () => {
    if (state.numeroRecibo !== "" || state.estadoReciboSefin !== 0 || state.estadoReciboSenasa !== 0) {
      setState({
        ...state,
        defaltQuery: "numeroRecibo=" + (state.numeroRecibo == "" ? 0 : state.numeroRecibo) + "&idEstadoSefin=" + (state.estadoReciboSefin == "" ? 0 : state.estadoReciboSefin) + "&idEstadoSenasa=" + (state.estadoReciboSenasa == "" ? 0 : state.estadoReciboSenasa) 
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
      numeroRecibo: "",
      estadoReciboSefin: "",
      estadoReciboSenasa: "",
    });

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
  const consultarCatologos = async () => {
    var estadosRecibo = await service.apiBackend.get(rutas.catalogos.estadosRecibo);
    var estadosReciboLista = estadosRecibo.lista;
    let lista = ["",];
    estadosReciboLista.forEach((element) => {
      lista.push({ value: element.id, label: element.nombre });
    });
    setEstadosRecibo(lista);

    var monedas = await service.apiBackend.get(rutas.catalogos.moneda);

    var monedaLista = monedas.lista;
    let listaM = ["",];
    monedaLista.forEach((element) => {
      listaM.push({ value: element.id, label: element.abreviatura });
    });
    setMoneda(listaM);
    setLoading(false);
  }
  const colDef = [
    { header: "Número Recibo", field: "id" },
    {
      header: "Estado Senasa",
      render(row, props) {
        if (row.estadoSenasaId == 6) {
          return <CBadge className='bg-info-2' shape="rounded-pill" >Creado</CBadge>;
        } else if (row.estadoSenasaId == 7) {
          return <CBadge className='bg-success-2'shape="rounded-pill"  >Pagado</CBadge>;
        } else if (row.estadoSenasaId == 8) {
          return <CBadge className='bg-dark-2'  shape="rounded-pill"  >Procesado</CBadge>;
        } else if (row.estadoSenasaId == 9) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Utilizado</CBadge>;
        } else if (row.estadoSenasaId == 10) {
          return <CBadge className='bg-dark-2' shape="rounded-pill"  >Solicitado</CBadge>;
        }
        return <CBadge className='bg-danger-2'  shape="rounded-pill"  >Anulado</CBadge>;
      },
    },
    {
      header: "Estado Sefin",
      render(row, props) {
        if (row.estadoSefinId == 6) {
          return <CBadge className='bg-info-2'  shape="rounded-pill" >Creado</CBadge>;
        } else if (row.estadoSefinId == 7) {
          return <CBadge className='bg-success-2'  shape="rounded-pill"  >Pagado</CBadge>;
        } else if (row.estadoSefinId == 8) {
          return <CBadge className='bg-dark-2'shape="rounded-pill"  >Procesado</CBadge>;
        } else if (row.estadoSefinId == 9) {
          return <CBadge className='bg-dark-2'  shape="rounded-pill"  >Utilizado</CBadge>;
        } else if (row.estadoSefinId == 10) {
          return <CBadge className='bg-dark-2'shape="rounded-pill"  >Solicitado</CBadge>;
        }
        return <CBadge className='bg-danger-2' shape="rounded-pill"  >Anulado</CBadge>;
      },
    },
    { header: "Identificador", field: "identificacion" },
    { header: "Nombre O Razón Social", field: "nombreRazon" },
    {
      header: "Monto",
      render(row, props) {
        return (
          <div>
            {
              <p> {buscarCatalogoId(moneda, row.detalleRecibos[0].servicio.monedaId)} {((Math.round(row.montoTotal * 100) / 100).toFixed(2))} </p>
            }
          </div>
        );
      },
    },
    {
      header: "Acciones",
      render(row, props) {
        let validacion = false;
        usuario.usuarioArea.forEach(element => {

            if(element.areaId == row.detalleRecibos[0].servicio.areaId){
              validacion = true;
            }
        });

        return (
          <div>
           

            <AuthGuard permiso="recibo-ver">
              <Link to={"/recibo/ver/" + row.id} >
                <AiOutlineEye color="#2278E5" size={22} className='me-1 mb-1' />
              </Link>
            </AuthGuard>

            {row.estadoSefinId === 7 && row.estadoSenasaId ===6 && validacion && (
              <AuthGuard permiso="recibo-gestionar">
                <Link to={"/recibo/gestionar/" + row.id} >
                  <AiOutlineFieldTime color="#399F68" size={21} className='me-1 mb-1 ' />
                </Link>
              </AuthGuard>
            )}

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
                      <CFormText className='fs-2 fw-bold text-body'>Recibos</CFormText>
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
              <CCol md={3} >
                <CFormLabel>Número de Recibo</CFormLabel>
                <CInputGroup className="mb-3 search-table ">

                  <CFormInput
                    className="contactL-input"
                    id="name"
                    value={state.numeroRecibo}
                    onChange={e =>
                      setState({ ...state, numeroRecibo: e.target.value })
                    }
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3} >
                <CFormLabel>Estado Senasa</CFormLabel>
                <CInputGroup className="mb-3 search-table ">
                  <CFormSelect
                    className="contactL-input"
                    aria-label="Default select example"
                    options={estadosRecibo}
                    value={state.estadoReciboSenasa}
                    onChange={e =>
                      setState({ ...state, estadoReciboSenasa: e.target.value })
                    }
                  />
                </CInputGroup>
              </CCol>
              <CCol md={3} >
                <CFormLabel>Estado Sefin</CFormLabel>
                <CInputGroup className="mb-3 search-table ">
                  <CFormSelect
                    className="contactL-input"
                    aria-label="Default select example"
                    options={estadosRecibo}
                    value={state.estadoReciboSefin}
                    onChange={e =>
                      setState({ ...state, estadoReciboSefin: e.target.value })
                    }
                  />
                </CInputGroup>
              </CCol>
              <CCol md={1} className="mt-2" >

                    <CButton className='btn-black mt-4' onClick={() => buscar()}> <FaSearch className='mb-1 me-1' />Buscar</CButton>

              </CCol>
              <CCol md={1} className="ms-1 mt-2 " >
                
                    <CButton className=' btn-black mt-4'  onClick={() => limpiar()}> <MdCleaningServices size={"1.2em"} className=' mb-1 me-1' /> Limpiar</CButton>

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
                <CCardTitle> Listado de Recibos
                </CCardTitle>
              </CCol>


            </CRow>
            <CRow >
                <GridTable
                  definicion={colDef}
                  servicio={service.apiBackend}
                  baseRoute={rutas.recibo.base}
                  rootParms={usuario}
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
    usuario: state,
  };
};

export default connect(mapStateToProps)(ReciboList);
