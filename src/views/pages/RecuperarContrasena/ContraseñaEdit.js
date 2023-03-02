import React, { useState, useEffect } from 'react'

import {
    CContainer,
    CCardGroup,
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormInput,
    CRow,
    CButton,
    CFormFeedback
} from '@coreui/react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logoUsaid from "../../../assets/brand/logoUsaid.png";
import part1 from "../../../assets/brand/Part1.png";
import part2 from "../../../assets/brand/Part2.png";
import logoH from "../../../assets/brand/escudoH333.png";
import service from "../../../Http/httpHelper";
import rutas from "../../rutas";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecuperarContrasena = ({ onSubmit, ...props }) => {

    const navigate = useNavigate();
    let { id } = useParams();
    const [contraseñaValido, setContraseñavalido] = useState(true);
    const reqSvgs = require.context('../../../assets/landingPage/shapes', false, /.png$/);
    const allSvgFilepaths = reqSvgs.keys();
    const [state, setState] = useState(
        {
            contrasena: "",
            idUsuario: "",
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
    useEffect(() => {
        consultarUsuario();
    }, [])
    const consultarUsuario = async () => {

        let usuario = await service.apiAuth.get(rutas.usuarios.SinPermiso + "/" + id);
        state.idUsuario = usuario.id;
        setState({ ...state, data: usuario });
    }

    const EditarContraseña = async () => {
        let request = {
            id: parseInt(state.idUsuario),
            contrasena: state.contrasena,
        }
        await service.apiAuth.post(rutas.usuarios.EditarSoloContraseña, request);
        toast.success("Se ha actulizado su contraseña");
        navigate("/dashboard");
    }


    return (
        <header className='headerL home_recoverPass'>
            <div className="overlayL overlayL-lg">
                <img src={reqSvgs(state.square)} className="shape square" alt="" />
                <img src={reqSvgs(state.circle)} className="shape circle" alt="" />
                <img src={reqSvgs(state.halfCircle)} className="shape half-circle1" alt="" />
                <img src={reqSvgs(state.halfCircle)} className="shape half-circle2" alt="" />
                <img src={reqSvgs(state.x)} className="shape xshape" alt="" />
                <img src={reqSvgs(state.triangle)} className="shape triangle" alt="" />
                <img src={reqSvgs(state.points1)} className="points points1" alt="" />
            </div>
            <CContainer className='main'>
                <CRow className="justify-content-left">
                    <CCol md={4} className="">
                        <CCol className=" " md={8}>
                            <img className="img-fluid mt-5 fondo-Login ms-2" src={part1} alt="Fondo Login"></img>
                        </CCol>
                    </CCol>
                    <CCol md={4}>
                        <CCardGroup >
                            <CCard className=" borderNone">
                                <CCardBody>
                                    <CForm

                                        className="row needs-validation "
                                        noValidate
                                    >
                                        <img className="img-fluid" src={logoH} alt="Logo Login"></img>
                                        <h1 className="text-center" >SENASA</h1>
                                        <p className="text-medium-emphasis text-center">ingresa tu nueva contraseña</p>

                                        <CRow>
                                            <CCol className='mb-2'>
                                                <CFormInput
                                                    placeholder='Ingrese Su Contraseña'
                                                    className='contactL-input'
                                                    type='password'

                                                    onChange={e =>
                                                        setState({ ...state, contraseñaTeporal: e.target.value })
                                                    }
                                                    autoComplete="off"
                                                    required
                                                />
                                                <CFormFeedback invalid>Ingresa un Correo Valido.</CFormFeedback>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol className='mt-2'>
                                                <CFormInput
                                                    className='contactL-input'
                                                    type='password'
                                                    placeholder='Repita Su Contraseña'
                                                    id="name"
                                                    onChange={e => {

                                                        if (e.target.value == state.contraseñaTeporal) {
                                                            setContraseñavalido(true);
                                                        } else { setContraseñavalido(false) }
                                                        setState({ ...state, contrasena: e.target.value })
                                                    }}
                                                    invalid={!contraseñaValido}
                                                    autoComplete="off"
                                                    required
                                                />
                                                <CFormFeedback invalid>Contraseña no coincide.</CFormFeedback>
                                            </CCol>
                                        </CRow>

                                        <CRow>
                                            <CCol className="d-grid gap-2 col-6 mx-auto mt-2 ">
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                                    <Link to={"/login"}>
                                                        <CButton className='btn-black'  color="primary"  >
                                                            Cancelar
                                                        </CButton>
                                                    </Link>
                                                    <CButton className='btn-blue'  color="primary" onClick={() => EditarContraseña()} >
                                                        Actualizar
                                                    </CButton>

                                                </div>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                    <CCol md={4} className="mt-5 ">
                        <CCol className="mt-5 ms-5" md={11}>
                            <img className="img-fluid mt-5  ms-5 fondo-Login" src={part2} alt="Fondo Login"></img>
                        </CCol>
                    </CCol>
                </CRow>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img alt='Logo Usaid' src={logoUsaid} className="img-fluid d-block  mx-auto mb-4 position-absolute bottom-0 start-50 translate-middle-x" style={{ width: 170 + "px" }}></img>
                </div>
            </CContainer>
        </header>
    );
}


RecuperarContrasena.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
};

export default RecuperarContrasena;