import React, { useEffect, useState } from 'react'
import service from "../../../Http/httpHelper";
import rutas from "../../rutas";
import { Loader } from 'src/components';
import { CCard, CRow, CCol, CBadge, CTooltip, CContainer, CCardBody, CFormSelect, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';


const VerificarCorreo = () => {
    let navigate = useNavigate();

    let { token } = useParams();

    const [state, setState] = useState(
        {
            data: {}
        }
    )
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(true);
    useEffect(() => {
        consultarImportador();
    }, [])


    const consultarImportador = async () => {
        try {

            await service.apiAuth.put(
                rutas.importador.verificarCorreo, {
                token: token
            });
        } catch (ex) {
            setFound(false);
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center headerL">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={5}>
                        {found && (
                            <span className="clearfix">
                                <h1 className="float-left display-4 mr-4 text-primary">OK</h1>
                                <h4 className="pt-3">Tu correo fue verificado</h4>
                                <p className="text-muted float-left">
                                    Una vez que tu información sea revisada por personal de SENASA
                                    se te enviara un correo con tu usuario y contraseña.
                                </p>
                            </span>
                        )}
                        {!found && (
                            <span className="clearfix">
                                <h1 className="float-left display-4 mr-4 text-danger">Error</h1>
                                <h4 className="pt-1 ">Tu correo no fue verificado</h4>
                                <p className=" float-left ">
                                    No encontramos registro de la solicitud.
                                </p>
                            </span>
                        )}



                    </CCol>
                </CRow>
                <div className='d-grid gap-2 col-2 mx-auto'>
                    <a href="/#" className="btn box__button ">Go back</a>
                </div>
            </CContainer>
        </div>
    )
}

export default VerificarCorreo