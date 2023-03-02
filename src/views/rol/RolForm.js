import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { CCard, CRow, CCol, CCardBody, CCallout, CFormLabel, CInputGroup, CFormInput, CButton, CFormText, CForm, CFormFeedback } from '@coreui/react'
import service from "../../Http/httpHelper";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { Loader } from 'src/components';
import { Link } from "react-router-dom";
import * as FontAwesome from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import { RiShieldStarFill } from 'react-icons/ri';
import { FcDocument, FcFolder, FcOpenedFolder } from "react-icons/fc"
import { MdExpandMore, MdExpandLess, MdOutlineIndeterminateCheckBox, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md"

const RolForm = ({ onSubmit, ...props }) => {

    const [loading, setLoading] = useState(true);
    const [nodes, setNodes] = useState([]);
    const [validated, setValidated] = useState(false);
    const [state, setState] = useState(
        {
            nombre: "",
            descripcion: "",
            checked: [],
            expanded: [],
            permisosPlano: [],
            iconos: {
                check: <MdOutlineCheckBox size={30} />,
                uncheck: <MdOutlineCheckBoxOutlineBlank size={30} />,
                halfCheck: <MdOutlineIndeterminateCheckBox size={30} />,
                expandClose: <MdExpandMore size={30} />,
                expandOpen: <MdExpandLess size={30} />,
                parentClose: <FcFolder size={30} />,
                parentOpen: <FcOpenedFolder size={30} />,
                leaf: <FcDocument />,
            }
        }
    )

    const myIcons = {
        Crear: "FaPlus",
        Editar: "FaEdit",
    }

    const Icon = React.createElement(FontAwesome[myIcons[props.accion]]);

    useEffect(() => {
        const overridenData = props.overridenData ?? {};
        setState({ ...state, ...overridenData, checked: overridenData.permisos })
    }, [props.overridenData])

    useEffect(() => {
        consultarPermisos();
    }, [])

    const crearObjeto = (permisos) => {
        permisos.forEach(element => {
            formar(element);
        });
        setNodes(permisos)

    }
    const formar = (padre) => {
        padre.value = padre.id;
        padre.label = padre.nombre;
        state.permisosPlano.push(padre);
        if (padre.hijos !== null && padre.hijos.length > 0) {
            padre.hijos.forEach(hijo => {
                formar(hijo);
            });
            padre.children = padre.hijos;
        }
        setLoading(false)
    }

    const consultarPermisos = async () => {
        let permisos = await service.apiAuth.get("/permiso");
        crearObjeto(permisos.permisos);
    }
    const seleccionar =(checked)=>{

        checked = checked.map(Number);
        var collection = [];
        checked.forEach(element => {
            collection.push(element);
            traerHijos(element,collection);
        })
        let uniq =[...new Set(collection)];
        setState({...state, checked:uniq});
    }

    const traerHijos = (element,collection)=> {
        var nodo = state.permisosPlano.filter(c => c.id === element);

        if(nodo.length >0 && nodo[0].permisoPadre){
            collection.push(nodo[0].permisoPadre);
            traerHijos(nodo[0].permisoPadre,collection);
        }
    }



    const handleSubmit = (event) => {
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
        } else {
            onSubmit(state);
        }
        setValidated(true)
    }
    if(loading){
        return <Loader/>
    }
    return (
        <div className="animated fadeIn">
            <CRow>
                <CCol sm={12}>
                    <CCard
                        color="white"
                        className="mb-3 shadow p-4  bg-body "
                    >
                        <CRow className="mb-2">
                            <CCol xl={12}>
                                <CCard className='border-0'>
                                    <CCardBody>
                                        <CCol md={14}>
                                            <CCard className={`mb-5 border-secondary border-0  text-black shadow-lg mb-3`}>
                                                <div className="position-relative ">
                                                    <div className="position-absolute top-0 start-0">
                                                        <CFormText className='fs-4 fw-bold  text-body'> <RiShieldStarFill /> Rol</CFormText>
                                                    </div>
                                                    <div className="position-absolute top-0 start-100 translate-middle">
                                                        <CFormText className='fs-4 fw-bold  text-body'> <HiDotsVertical /></CFormText>
                                                    </div>
                                                </div>
                                            </CCard>
                                        </CCol>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                        <CForm
                            onSubmit={handleSubmit}
                            className="row needs-validation "
                            noValidate
                            validated={validated}
                        >
                            <CRow className='mb-2 '>
                                <CCol md={6} >
                                    <CFormLabel>Nombre</CFormLabel>
                                    <CInputGroup className="mb-3 search-table has-validation">
                                        <CFormInput
                                            className="contactL-input"
                                            disabled={props.soloLectura}
                                            id="name"
                                            value={state.nombre}
                                            onChange={e =>
                                                setState({ ...state, nombre: e.target.value })
                                            }
                                            autoComplete="off"
                                            required
                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa un Nombre.</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                                <CCol md={6} >
                                    <CFormLabel>Descripcion</CFormLabel>
                                    <CInputGroup className="mb-3 search-table">
                                        <CFormInput
                                            className="contactL-input"
                                            autoComplete="off"
                                            disabled={props.soloLectura}
                                            id="name"
                                            value={state.descripcion}
                                            onChange={e =>
                                                setState({ ...state, descripcion: e.target.value })
                                            }
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            required
                                        />
                                        <CFormFeedback invalid className='ms-3'>Ingresa una Descripcion</CFormFeedback>
                                    </CInputGroup>
                                </CCol>
                            </CRow>
                            <CRow className='mb-3 '>
                                <CCol md={6}>
                                    <CCallout color="primary">
                                        <CFormLabel>Permisos </CFormLabel>
                                        <CheckboxTree
                                            disabled={props.soloLectura}
                                            nodes={nodes}
                                            checked={state.checked}
                                            expanded={state.expanded}
                                            icons={state.iconos}
                                            onCheck={checked => seleccionar(checked)}
                                            onExpand={expanded => setState({ ...state, expanded })}
                                        />
                                    </CCallout>
                                </CCol>
                            </CRow>
                            <CRow className='mt-2'>
                                <CCol>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                                        <Link to={"/rol"} >
                                            <CButton className='me-md-2 btn-black' >Cancelar</CButton>
                                        </Link>
                                        {!props.soloLectura && (
                                            <CButton type="submit" className='btn-blue' >{Icon}  {props.accion} Rol  </CButton>
                                        )}
                                    </div>
                                </CCol>
                            </CRow>
                        </CForm>
                    </CCard>
                </CCol>
            </CRow>
        </div >
    );
}

RolForm.propTypes = {
    overridenData: PropTypes.object,
    accion: PropTypes.string,
    onSubmit: PropTypes.func,
    soloLectura: PropTypes.bool,
};

export default RolForm;
