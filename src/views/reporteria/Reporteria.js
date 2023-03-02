import React, { useEffect, useState } from 'react'
import AuthGuard from "../../seguridad";
import {
    Link
} from "react-router-dom";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import { AiOutlineEye, AiOutlineFieldTime, AiOutlineSetting } from "react-icons/ai";
import GridTable from 'src/components/GridTable/index';
import rutas from "../rutas";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol, CFormInput, CFormLabel,
    CInputGroup,
    CRow,
    CInputGroupText,
    CFormSelect,
    CBadge,
    CButton
} from '@coreui/react'
import service from "../../Http/httpHelper";
import { useNavigate, useParams } from 'react-router-dom';
import { BsCalendar3, BsDownload } from "react-icons/bs"
import { RiDeleteBinLine } from "react-icons/ri"
import { CgDanger } from "react-icons/cg"
import FileDownload from "js-file-download";
import { Loader } from 'src/components';
import LoaderTable from 'src/components/GridTable/LoaderTable';
import ExportExcel from "src/components/ExcelExport/excelExport"
import { toast } from 'react-toastify';
const Reporteria = () => {

    let navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [miniLoading, setMiniLoading] = useState(false);
    const [anular, setAnular] = useState(false);
    const [excelLoading, setExcelLoading] = useState(false);
    const [state, setState] = useState(
        {
            numeroRecibo: "",
            estadoReciboSefin: 0,
            estadoReciboSenasa: 0,
            defaltQuery: "",
            totalRecibos: 0,
            recibosSinPagar: 0,
            recibosPagados: 0,
            recibosUtilizados: 0,
            fechaInicio: "",
            fechaFin: "",
            porcentajeReciboPorProcesar: 0,
            colorPorcentajeReciboPorProcesar: ""
        }
    );

    const [catalogoAnios, setCatalogoAnios] = useState([])

    const [dataParaReporte, setDataParaReporte] = useState(false);
    const usuario = useSelector((state) => state.usuario)
    const [moneda, setMoneda] = useState([]);
    const buscarCatalogoId = (catalogo, id) => {
        let label = "";

        catalogo.forEach(element => {
            if (element.value === id) {

                label = element.label
            }
        });
        return label;
    }
    const buscarRubroId = (detallesRecibo) => {
        let id = detallesRecibo[0].servicio.rubro
        let label = "";

        if (id == 12199) {
            label = "12199 - Tasas Varias";
        }
        else if (id == 12121) {
            label = "12121 - Emisión, Constancias, Certificaciones y Otros";
        }
        else if (id == 12499) {
            label = "12499 - Multas y Penas Diversas";
        }
        else if (id == 12806) {
            label = "12806 - Devoluciones de Ejercicios Fisc. Anteriores";
        }
        else if (id == 15104) {
            label = "15104 - Venta de Artículos y Mat. Diversos";
        }
        return label;
    }
    const consultaCatalogo = async (rutaCatalogo) => {
        var dataResponse = await service.apiBackend.get(rutaCatalogo);
        let dataResponseList = dataResponse.lista;
        let data = [];
        dataResponseList.forEach((element) => {
            data.push({ value: element.id, label: element.nombre });
        });
        return data;
    }

    const consultaListaRecibo = async () => {
        setExcelLoading(true);
        var lista = []
        const fecha = new Date();
        var mes = state.mesSeleccionado !== 0 ? state.mesSeleccionado : fecha.getMonth() + 1;
        var anio = state.anioSeleccionado !== 0 ? state.anioSeleccionado : fecha.getFullYear();

        let request = {
            mes: mes,
            anio: anio,
            reporte: true

        }
        var dataResponse = await service.apiBackend.post(rutas.recibo.listaRecibosPorMes, request);
        dataResponse.recibos.forEach(element => {
            var recibo = {
                "No.": element.no,
                "Codigo": element.codigo,
                "Descripcion": element.descripcion,
                "No. Recibo TGR1": element.recibo,
                "Fecha": element.fecha,
                "Monto Total": element.monto,
                "0.32% comisión del Banco": element.comision,
                "Monto menos comisión": element.total,
            }
            lista.push(recibo);
        });
        setDataParaReporte(lista);

        setExcelLoading(false);
    }
    function formatoFecha(fecha, formato) {
        const map = {
            dd: fecha.getDate(),
            mm: fecha.getMonth() + 1,
            yy: fecha.getFullYear().toString().slice(-2),
            yyyy: fecha.getFullYear()
        }

        return formato.replace(/dd|mm|yyyy|yyy/gi, matched => map[matched])
    }
    const consultaReporte = async () => {

        const fecha = new Date();

        var fechaInicio = state.fechaInicio !== "" ? state.fechaInicio : formatoFecha(fecha, 'yyyy-mm-dd');
        var fechaFin = state.fechaFin !== "" ? state.fechaFin : formatoFecha(fecha, 'yyyy-mm-dd');
        console.log(fecha);

        //consultaListaRecibo();

        setState({
            ...state,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,

            defaltQuery: "mes=" + 11 + "&anio=" + 2022 + "&reporte=" + true + "&fechaInicio=" + fechaInicio + "&fechaFin=" + fechaFin,
        });
        setAnular(false);
        setMiniLoading(false);
        setLoading(false);
    }

    const consultarTipos = async () => {
        let anios = await consultaCatalogo(rutas.catalogos.anios);
        var monedas = await service.apiBackend.get(rutas.catalogos.moneda);
        var monedaLista = monedas.lista;
        let listaM = ["",];
        monedaLista.forEach((element) => {
            listaM.push({ value: element.id, label: element.abreviatura });
        });
        setMoneda(listaM);
        setCatalogoAnios(anios);
        consultaReporte();

    }
    const anularRecibo = async (id) => {

        await service.apiBackend.put(rutas.recibo.anularRecibo + "/" + id);
        toast.warning("Recibo " + id + " Anulado")
        setAnular(true);
    }
    const exportToPDF = async (e) => {
        const fecha = new Date();

        var fechaInicio = state.fechaInicio !== "" ? state.fechaInicio : formatoFecha(fecha, 'yyyy-mm-dd');
        var fechaFin = state.fechaFin !== "" ? state.fechaFin : formatoFecha(fecha, 'yyyy-mm-dd');

        desCargarpermiso(fechaInicio, fechaFin);
    }
    const desCargarpermiso = (fechaInicio, fechaFin) => {
        service
            .getBackenParaArchivos(rutas.recibo.reportePDF + fechaInicio + "/" + fechaFin)
            .then(({ data }) => {
                FileDownload(data, "Reporte" + ".pdf");
            });
    }
    useEffect(() => {
        consultarTipos();
    }, [])

    useEffect(() => {
        setMiniLoading(true);
        consultarTipos();
    }, [state.fechaInicio, state.fechaFin, anular])




    const colDef2 = [
        { header: "Número Recibo", field: "id" },
        { header: "Nombre O Razón Social", field: "nombreRazon" },
        {
            header: "Rubro",
            render(row, props) {
                return (
                    <div>
                        {

                            <p> {buscarRubroId(row.detalleRecibos)}  </p>
                        }
                    </div>
                );
            },
        },
        {
            header: "Estado Senasa",
            render(row, props) {
                if (row.estadoSenasaId == 6) {
                    return <CBadge className='bg-info-2' shape="rounded-pill" >Creado</CBadge>;
                } else if (row.estadoSenasaId == 7) {
                    return <CBadge className='bg-success-2' shape="rounded-pill"  >Pagado</CBadge>;
                } else if (row.estadoSenasaId == 8) {
                    return <CBadge className='bg-dark-2' shape="rounded-pill"  >Procesado</CBadge>;
                } else if (row.estadoSenasaId == 9) {
                    return <CBadge className='bg-dark-2' shape="rounded-pill"  >Utilizado</CBadge>;
                } else if (row.estadoSenasaId == 10) {
                    return <CBadge className='bg-dark-2' shape="rounded-pill"  >Solicitado</CBadge>;
                }
                return <CBadge className='bg-danger-2' shape="rounded-pill"  >Anulado</CBadge>;
            },
        },
        {
            header: "Estado Sefin",
            render(row, props) {
                if (row.estadoSefinId == 6) {
                    return <CBadge className='bg-info-2' shape="rounded-pill" >Creado</CBadge>;
                } else if (row.estadoSefinId == 7) {
                    return <CBadge className='bg-success-2' shape="rounded-pill"  >Pagado</CBadge>;
                } else if (row.estadoSefinId == 8) {
                    return <CBadge className='bg-dark-2' shape="rounded-pill"  >Procesado</CBadge>;
                } else if (row.estadoSefinId == 9) {
                    return <CBadge className='bg-dark-2' shape="rounded-pill"  >Utilizado</CBadge>;
                } else if (row.estadoSefinId == 10) {
                    return <CBadge className='bg-dark-2' shape="rounded-pill"  >Solicitado</CBadge>;
                }
                return <CBadge className='bg-danger-2' shape="rounded-pill"  >Anulado</CBadge>;
            },
        },
        {
            header: "Monto",
            render(row, props) {
                return (
                    <div>
                        {
                            <p> {buscarCatalogoId(moneda, row.detalleRecibos[0].servicio.monedaId)}{". "} {((Math.round(row.montoTotal * 100) / 100).toFixed(2))} </p>
                        }
                    </div>
                );
            },
        },
        {
            header: "Fecha Pagado",
            render(row) {
                return (
                    <>
                        {moment(row.fechaPago).format("DD-MM-YYYY")}
                    </>

                );
            }
        },
        {
            header: "Fecha Utilizado",
            render(row) {
                return (
                    <>
                        {moment(row.fechaUtilizado).format("DD-MM-YYYY")}
                    </>

                );
            }
        },
        {
            header: "Acciones",
            render(row, props) {
                let validacion = false;
                usuario.usuarioArea.forEach(element => {

                    if (element.areaId == row.detalleRecibos[0].servicio.areaId) {
                        validacion = true;
                    }
                });

                return (
                    <div>
                        {row.estadoSefinId === 8 && row.estadoSenasaId !== 11 && (
                            <AuthGuard permiso="generar-reporte">
                                <CButton variant="ghost" onClick={(e) => anularRecibo(row.id)} >
                                    <RiDeleteBinLine color='red' />
                                </CButton>
                            </AuthGuard>
                        )}



                    </div>
                );
            },
        },

    ];
    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <CRow>
                <CRow>
                    <CCol sm={2}>
                        <CFormLabel htmlFor="basic-url" className='text-muted'>Fecha Inicio</CFormLabel>
                        <CInputGroup className="mb-3 ms-1">
                            <CFormInput
                                type='date'
                                value={state.fechaInicio}
                                onChange={(e) => {
                                    setState({ ...state, fechaInicio: e.target.value });
                                }}
                            />

                        </CInputGroup>
                    </CCol>
                    <CCol sm={2}>
                        <CFormLabel htmlFor="basic-url" className='text-muted'>Fecha Fin</CFormLabel>
                        <CInputGroup className="mb-3 ms-1">
                            <CFormInput
                                type='date'
                                value={state.fechaFin}
                                onChange={(e) => {
                                    setState({ ...state, fechaFin: e.target.value });
                                }}
                            />

                        </CInputGroup>
                    </CCol>
                    <CCol className='mt-4'>
                        <AuthGuard permiso="generar-reporte">
                            <CButton variant="ghost" className='ms-1 mt-2' onClick={(e) => exportToPDF()} >
                                <BsDownload className='mb-1' />
                            </CButton>
                        </AuthGuard>
                    </CCol>


                </CRow>
                <CCol xs>


                    <CCard color="white"
                        className="mb-1 shadow p-3  bg-body ">
                        <CCardHeader color="white" className="  bg-body ">Recibos</CCardHeader>
                        <CCardBody>

                            <br />
                            {miniLoading && (
                                <LoaderTable />
                            )}
                            {!miniLoading && (
                                <GridTable
                                    definicion={colDef2}
                                    servicio={service.apiBackend}
                                    baseRoute={rutas.recibo.reporteUsuarioListado}
                                    rootParms={usuario}
                                    pageSize={15}
                                    defaltQuery={state.defaltQuery}

                                />
                            )}

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )


}

const mapStateToProps = (state, ownProps) => {

    return {
        usuario: state,
    };
};

export default connect(mapStateToProps)(Reporteria);
