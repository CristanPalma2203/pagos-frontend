import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { CCard, CRow, CCol, CBadge, CFormCheck, CContainer, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback, CImage } from '@coreui/react'
import service from "../../../Http/httpHelper";
import rutas from "../../rutas";
import banner from "../../../assets/imgHome/bannerRegistro4.png"
import { Loader } from 'src/components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as FontAwesome from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import {
  Link
} from "react-router-dom";
import FileUpload from "../../../components/UploadFile/UploadFile";
import { FaPlus, FaSearch, FaInfo, FaInfoCircle } from 'react-icons/fa';
const Register = () => {
  let navigate = useNavigate();
  const [busquedadImportador, setBusquedadImportador] = useState(true);
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false)
  const reqSvgs = require.context('../../../assets/landingPage/shapes', false, /.png$/);
  const allSvgFilepaths = reqSvgs.keys();
  const [state, setState] = useState(
    {
      circle: allSvgFilepaths[0],
      halfCircle: allSvgFilepaths[1],
      letters: allSvgFilepaths[2],
      logo: allSvgFilepaths[3],
      points1: allSvgFilepaths[4],
      points2: allSvgFilepaths[5],
      points3: allSvgFilepaths[6],
      points4: allSvgFilepaths[7],
      square: allSvgFilepaths[8],
      triangle: allSvgFilepaths[9],
      wave: allSvgFilepaths[10],
      waveShape: allSvgFilepaths[11],
      x: allSvgFilepaths[12],
      mostrarMunicipio: false,
      identificador: "",
      tipoPersonaId: "",
      tipoIdentificadorId: "",
      nombre: "",
      telefono: "",
      correo: "",
      direccion: "",
      nacionalidadId: "",
      departamentoId: "",
      municipioId: "",
      archivoId: "",
      busquedadValida: false,
    }
  )
  const cambiarTipoIdentificador = () => {
    setValidacionDNI(false);
    setValidacionPSPT(false);
    setValidacionRTN(false);

  }

  const [correoValido, setCorreovalido] = useState(true);
  const [departamento, setDepartamento] = useState([])
  const [tipoIdentificador, setTipoIdentificador] = useState([])
  const [tipoPersona, setTipoPersona] = useState([])
  const [municipio, setMunicipio] = useState([])
  const [nacionalidad, setNacionalidad] = useState([])
  const [validacionRTN, setValidacionRTN] = useState(false)
  const [validacionArchivo, setValidacionArchivo] = useState(false)
  const [validacionDNI, setValidacionDNI] = useState(false)
  const [validacionPSPT, setValidacionPSPT] = useState(false)
  const myIcons = {
    Crear: "FaPlus",
  }
  const [isConfirmed, setIsConfirmed] = useState(false);
  const Icon = React.createElement(FontAwesome[myIcons["Crear"]]);
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
  const buscarImportador = async () => {

    if (state.identificador != "" && state.tipoIdentificadorId == 5 && state.identificador.length == 14) {
      let id = state.identificador;

      let importador = await service.apiAuth.get(
        rutas.importador.getPorIdentificador + "/" + id
      );
      if (importador.id !== null && !importador.accesoAprobado) {
        estalecerMunicipios(importador.departamentoId);
        setState({
          ...state,
          tipoPersonaId: importador.tipoPersonaId,
          identificador: importador.identificador,
          tipoIdentificadorId: importador.tipoIdentificadorId,
          nombre: importador.nombre,
          telefono: importador.telefono,
          correo: importador.correo,
          direccion: importador.direccion,
          nacionalidadId: importador.nacionalidadId,
          departamentoId: importador.departamentoId,
          municipioId: importador.municipioId,
          mostrarMunicipio: true,
          busquedadValida: true,
        });
        toast.info('Se encontro informacion de registro con tu identificacion. Actualice los datos que sean necesarios!', {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (importador.accesoAprobado) {
        setState({ ...state, busquedadValida: false });
        toast.info("Este RTN Ya Tiene Acceso Al Sistema");
      }
    }


  }
  const handleChange = () => {
    setIsConfirmed(current => !current);
  };
  const validarIdentificador = (e) => {
    let valorModificado = e.target.value;
    if (state.tipoIdentificadorId == 5 && valorModificado.length <= 14) {
      //RTN
      if (valorModificado.length != 14 && valorModificado.length <= 13) {
        setValidacionRTN(true);
      } else {

        setValidacionRTN(false);
      }
      setState({ ...state, identificador: valorModificado })
    } else if (state.tipoIdentificadorId == 3 && valorModificado.length <= 13) {
      //DNI
      if (valorModificado.length != 13 && valorModificado.length <= 13) {
        setValidacionDNI(true);
      } else {
        setValidacionDNI(false);
      }
      setState({ ...state, identificador: valorModificado })
    } else if (state.tipoIdentificadorId == 4 && valorModificado.length <= 20) {
      //PASAPORTE
      if (valorModificado.length <= 4 && valorModificado.length <= 13) {
        setValidacionPSPT(true);
      } else {
        setValidacionPSPT(false);
      }
      setState({ ...state, identificador: valorModificado })
    }
  }

  useEffect(() => {
    consultarCatalogos();
  }, [])

  useEffect(() => {
    if (state.identificador.length == 14) {
      buscarImportador();
    } else if (state.busquedadValida && state.identificador.length != 14) {
      setState({
        ...state,
        busquedadValida: false,
        tipoPersonaId: "",
        nombre: "",
        telefono: "",
        correo: "",
        direccion: "",
        nacionalidadId: "",
        departamentoId: "",
        municipioId: "",
        mostrarMunicipio: false,
      })
      setValidacionRTN(false);
      setValidacionArchivo(false);
      setValidacionDNI(false);
      setValidacionPSPT(false);
      setValidated(false);
    }
  }, [state.identificador])
  useEffect(() => {

  }, [state])
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
  const onSubmit = async (data) => {
    if (state.archivoId === "") {
      setValidacionArchivo(true);
    } else if (!validacionRTN && !validacionDNI && !validacionPSPT && isConfirmed) {
      let request = {
        nombre: data.nombre,
        identificador: data.identificador,
        municipioid: parseInt(data.municipioId),
        nacionalidadId: parseInt(data.nacionalidadId),
        departamentoid: parseInt(data.departamentoId),
        telefono: data.telefono,
        correo: data.correo,
        direccion: data.direccion,
        tipoIdentificadorId: parseInt(data.tipoIdentificadorId),
        tipoPersonaId: parseInt(data.tipoPersonaId),
        archivoId: data.archivoId
      }
      setLoading(true)
      await service.apiAuth.post(rutas.importador.solucitarAcceso, request);

      toast.success("Verifica Tu Correo Electronico");
      navigate("/");
    }

  }

  const validate = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    if (correoValido) {
      onSubmit(state);
    }
    setValidated(true)
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center headerL">

      <div className="overlayL overlayL-lg ">
        <img src={reqSvgs(state.square)} className="shape square" alt="" />
        <img src={reqSvgs(state.circle)} className="shape circle" alt="" />
        <img src={reqSvgs(state.halfCircle)} className="shape half-circle1" alt="" />
        <img src={reqSvgs(state.halfCircle)} className="shape half-circle2" alt="" />
        <img src={reqSvgs(state.x)} className="shape xshape" alt="" />
        <img src={reqSvgs(state.wave)} className="shape wave wave1" alt="" />
        <img src={reqSvgs(state.wave)} className="shape wave wave2" alt="" />
        <img src={reqSvgs(state.triangle)} className="shape triangle" alt="" />
        <img src={reqSvgs(state.letters)} className="letters" alt="" />
        <img src={reqSvgs(state.points1)} className="points points1" alt="" />
      </div>



      <CContainer >

        <CRow className="justify-content-center mb-1  ">

          <CCol md={11} lg={9} xl={8}>

            <CCard className="mx-4 bg-white rounded-top">
              <CImage className='mb-1 rounded-top' fluid src={banner} />
              <CCardBody className="p-4 ">

                <CForm
                  className="row needs-validation "
                  noValidate
                  validated={validated}
                >
                  <CRow className='mb-1 '>
                    <CCol md={6}>
                      <CFormLabel>Tipo Identificador</CFormLabel>
                      <CFormSelect
                        className="contactL-input"

                        required
                        options={tipoIdentificador}
                        id="nacionalidadId"
                        value={state.tipoIdentificadorId}
                        onChange={e => {
                          setState({ ...state, tipoIdentificadorId: e.target.value });
                          cambiarTipoIdentificador();
                        }}
                      />
                      <CFormFeedback invalid>Ingresa un Tipo Identificador.</CFormFeedback>
                    </CCol>

                    <CCol md={6} >
                      <CFormLabel>Identificador

                        {validacionRTN && (
                          <sub className=" ms-1  text-danger">
                            {"(RTN debe de tener 14 digitos)"}
                          </sub>
                        )}
                        {validacionDNI && (
                          <sub className=" ms-1 text-danger">

                            {"(DNI debe de tener 13 digitos)"}
                          </sub>
                        )}
                        {validacionPSPT && (
                          <sub className=" ms-1 text-danger">
                            {"(El Pasaporte debe de tener entre 4 a 20 digitos)"}
                          </sub>
                        )}
                      </CFormLabel>
                      <CInputGroup className="mb-2 search-table has-validation">
                        <CFormInput
                          className="contactL-input"
                          disabled={state.tipoIdentificadorId === ""}
                          id="name"
                          value={state.identificador}
                          onChange={(e) => validarIdentificador(e)}
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
                        disabled={state.busquedadValida}
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
                      <CInputGroup className="mb-2 search-table has-validation">
                        <CFormInput
                          className="contactL-input"
                          disabled={state.busquedadValida}
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
                      <CInputGroup className="mb-2 search-table has-validation">
                        <CFormInput
                          className="contactL-input"
                          type='number'

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
                      <CInputGroup className="mb-2 search-table has-validation">
                        <CFormInput
                          className="contactL-input"

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
                      <CInputGroup className="mb-2 search-table has-validation">
                        <CFormInput
                          className="contactL-input"

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
                        disabled={!state.mostrarMunicipio}
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

                  </CRow>
                  <CRow>
                    <CCol className='mt-2'>
                      <FileUpload
                        mostrarLableSiempre={true}
                        label={"Comprobante de identificación"}
                        servicio={rutas.archivos.registro}
                        onArchivoCargado={(e) => {
                          setState({ ...state, archivoId: e.identificador });
                          setValidacionArchivo(false);
                        }
                        }
                      />
                      {validacionArchivo && (
                        <sub className=" ms-1 text-danger">
                          {"Debes adjuntar un comprobante de identificación"}
                        </sub>
                      )}
                    </CCol>

                  </CRow>
                  <CRow className='mt-3'>

                    <CCol>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                        <CFormCheck
                          className='mt-2'
                          type="checkbox"
                          id="invalidCheck"
                          value={isConfirmed}
                          onChange={handleChange}
                          label={
                            <p >
                              Acepto Los Terminos y Condiciones <a href="#" > <FiExternalLink size={"20"} /> </a>.
                            </p>
                          }
                          required
                        />
                        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                        <Link to={"/"} >
                          <CButton className='me-md-2 btn-black' >Cancelar</CButton>
                        </Link>
                        <div>
                          <CButton onClick={(e) => validate(e)} className='btn-blue' >{Icon} Registrarme  </CButton>
                        </div>

                      </div>
                    </CCol>
                  </CRow>

                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>



      </CContainer>
    </div >
  )
}

export default Register
