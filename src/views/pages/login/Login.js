import React, { useRef, useState, useEffect } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CRow,
  CSpinner,
  CFormFeedback
} from '@coreui/react'
import { FaUser, FaLock } from 'react-icons/fa';
import service from "../../../Http/httpHelper";
import { connect, useDispatch } from "react-redux";
import logo from "../../../assets/landingPage/logo.png"
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import * as actions from "../../../redux/actions/usuario";
import logoUsaid from "../../../assets/brand/logoUsaid.png";
import loginFondo from "../../../assets/brand/login2.png";
import logoH from "../../../assets/brand/escudoH333.png";

const Login = () => {
  const [miniLoader, setMiniLoader] = useState(false)
  const [validated, setValidated] = useState(false)
  const userRef = useRef();
  const reqSvgs = require.context('../../../assets/landingPage/shapes', false, /.png$/);
  const allSvgFilepaths = reqSvgs.keys();
  const [state, setState] = useState(
    {
      usuario: "",
      contrasena: "",
      idUsuario: 0,
      success: false,
      cambiarPassword: false,
      msj: "",
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
    }

  )
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, [])

  const handleSubmit = async (e) => {
    if (state.usuario !== "" && state.contrasena !== "") {
      setMiniLoader(true);
      e.preventDefault();
      try{
        var response = await service.apiAuth.post("usuario/login", {
          ...state,
        });
  
        if (response.token !== "" || response.token !== null) {
          setState({ ...state, success: true, cambiarPassword: response.cambiarContrasena, idUsuario: response.id })
        }
        actions.login(response)(dispatch);
        setMiniLoader(false);
      }catch{
        setMiniLoader(false);
      }
      
    }
  }

  const validate = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }

  if (state.cambiarPassword) {
    return (<Navigate to={"/cambiarPassword/" + state.idUsuario} replace={true} />);
  } else {
    return (
      <>
        {state.success ? (
          <Navigate to="/dashboard" replace={true} />
        ) : (

          <div className=" home_main headerL">
            <nav>
            <div className="containerL">
              <div className="logoL">
                <img src={logo} alt="" />
              </div>

              <div className="linksL">
                <ul>
                  <li className='me-1 ms-1'>
                    <Link to={"/register"} >
                      <a className="">Registrarse</a>
                    </Link>
                  </li>
                  <li className='me-1 ms-1'>
                    <Link to={"/"} >
                      <a className="">Pagina Principal</a>
                    </Link>
                  </li>

                </ul>
              </div>
            </div>
          </nav>
            <div className="overlayL overlayL-lg">

              <img src={reqSvgs(state.square)} className="shape circle" alt="" />
              <img src={reqSvgs(state.x)} className="shape half-circle1" alt="" />
              <img src={reqSvgs(state.halfCircle)} className="shape half-circle2" alt="" />
              <img src={reqSvgs(state.x)} className="shape xshape" alt="" />
              <img src={reqSvgs(state.wave)} className="shape wave wave1" alt="" />
              <img src={reqSvgs(state.triangle)} className="shape triangle" alt="" />
              <img src={reqSvgs(state.letters)} className="letters" alt="" />
              <img src={reqSvgs(state.points1)} className="points points1" alt="" />
            </div>
            <CContainer className='main'>
              <CRow className="justify-content-center">
                <CCol md={4}  >
                  <CCardGroup>
                    <CCard className="p-5">
                      <CCardBody>
                        <CForm
                          onSubmit={handleSubmit}
                          className="row needs-validation "
                          noValidate
                          validated={validated}
                        >
                          <img className="img-fluid" src={logoH} alt="Logo Login"></img>
                          <h1 className="text-center" >Iniciar Sesión</h1>
                          <p className="text-medium-emphasis text-center">Inicia sesión en tu cuenta</p>
                          <div className="input-field">
                            <i className="fas fa-user"> <FaUser /></i>
                            <CFormInput
                              className='inputLogin'
                              placeholder="RTN / Correo"
                              type="text"
                              id="username"
                              ref={userRef}
                              aria-describedby="username"
                              autoComplete="off"
                              onChange={(e) => setState({ ...state, usuario: e.target.value })}
                              value={state.usuario}
                              required
                            />
                            <CFormFeedback invalid>Ingresa un RTN o Correo.</CFormFeedback>
                          </div>

                          <div className="input-field">
                            <i className="fas fa-user"> <FaLock /></i>
                            <CFormInput
                              className='inputLogin'
                              placeholder="Contraseña"
                              type="password"
                              id="password"
                              aria-describedby="password"
                              onChange={(e) => setState({ ...state, contrasena: e.target.value })}
                              value={state.contrasena}
                              required
                            />
                            <CFormFeedback invalid>Ingresa tu contraseña.</CFormFeedback>
                          </div>


                          <a className="text-end Rcontra mt-2" href="/recuperarcontrasena#/recuperarcontrasena">¿Olvidaste tu contraseña?</a>
                          <CRow>
                            <CCol className="d-grid gap-2 col-6 mx-auto ">
                              <CButton type='submit' color="primary" className="px-4 me-md-2" onClick={(e) => validate(e)}>
                                {miniLoader&&(
                                  <CSpinner className='me-2' color='light' size='sm'/>
                                )}{!miniLoader&&(
                                  <>
                                  Ingresar
                                  </>
                                )}
                                
                              </CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCardGroup>
                </CCol>
                
              </CRow>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img alt='Logo Usaid' src={logoUsaid} className="img-fluid d-block  mx-auto mb-4 position-absolute bottom-0 start-50 translate-middle-x" style={{ width: 170 + "px" }}></img>
              </div>
            </CContainer>
          </div>
        )}
      </>
    )
  }

}
const mapStateToProps = (state, ownProps) => {

  return {
    usuario: state,
  };
};

const mapDispatchToProps = {
  ...actions,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
