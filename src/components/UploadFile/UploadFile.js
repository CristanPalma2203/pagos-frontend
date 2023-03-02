import React, { useEffect, useState } from "react";
import PropTypes, { element } from 'prop-types';
import {
  CFormGroup,
  CLabel,
  CButton,
  CCol,
  CRow,
  CSpinner,
  CModal,
  CFormFeedback,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CInputGroupText,
  CFormInput,
} from "@coreui/react";
import servicio from "../../Http/httpHelper";
import Rutas from "../../views/rutas";
import FileViewer from "react-file-viewer";
import FileDownload from "js-file-download";
import { toast } from 'react-toastify';
//import { NotificationManager } from "react-notifications";
// eslint-disable-next-line import/no-anonymous-default-export

function UploadFile(props) {
  const [state, setState] = useState(
    {
      file: null,
      desabilitado: true,
      verArchivo: false,
      verSpinner: false,
      urlFile: "",
      fileType: "",
      filename: "archivos permitidos .pdf, .png, .jpg, .jpge ",
      fileId: null,
    }
  );
  const [archivoCargado, setArchivoCargado] = useState(false);
  const verArchivo = () => {
    var id = props.archivoId ? props.archivoId : state.fileId;

    servicio.descargarArchivosBackEnFile("archivo/" + id).then(({ data }) => {

      const url = window.URL.createObjectURL(new Blob([data]));

      var tipo = data.type.split("/");

      setState({ ...state, urlFile: url, fileType: tipo[1], verArchivo: !state.verArchivo });
      setTimeout(() => {
        setArchivoCargado(true);
      }, "1000")
    });
  }

  const descargar = () => {
    var id = props.archivoId ? props.archivoId : state.fileId;
    servicio
      .descargarArchivosBackEnFile("archivo/" + id)
      .then(({ data }) => {
        var tipo = data.type.split("/");
        FileDownload(data, props.modalTitle + "." + tipo[1]);
      });
  }
  const subir = () => {
    setState({ ...state, verSpinner: true });
    const formData = new FormData();
    const file = state.file;

    formData.append("file", state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    servicio.archivosBackend.post(
      props.servicio ? props.servicio : Rutas.archivos.base,
      formData,
      config
    ).then(function (response) {
      setState({ ...state, fileId: response.identificador, verSpinner: false });
      props.onArchivoCargado(response, file);
      toast.info("El archivo se cargo satisfactoriamente");
    }).catch(function (error) {
      setState({ ...state, verSpinner: false });
    });
  }
  const archivoSeleccionado = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      if (props.validarArchivo) {
        props.validarArchivo(archivo, (validate) => {
          const file = validate ? archivo : null;
          const fileName = validate ? archivo.name : null;
          setState({
            ...state,
            file: file,
            desabilitado: !validate,
            filename: fileName,
          })

        });
      } else {
        setState({
          ...state,
          file: archivo,
          desabilitado: false,
          filename: archivo.name,
        });
      }
    }
  }
  const toggleFile = () => {
    setState({
      ...state,
      verArchivo: !state.verArchivo,
    });
    setArchivoCargado(false);
  }
  const onError = (e) => {

  }
  useEffect(() => {

  }, [archivoCargado]);

  return (
    <div>
      <CModal
        visible={state.verArchivo}
        className={"modal-xl modal-success "}

      >
        <CModalBody>
          <CRow>
            <CCol style={{ height: 600 }}>
              {!archivoCargado && (
                <div className="position-absolute top-50 start-50">
                  <CSpinner size="xl" />
                </div>

              )}
              {archivoCargado && (
                <FileViewer
                  fileType={state.fileType}
                  filePath={state.urlFile}
                  onError={onError}
                />
              )}

            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton className="btn-green" onClick={() => descargar()}>
            Descargar
          </CButton>
          <CButton className="btn-black" onClick={toggleFile}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
      {props.mostrarLableSiempre === true && (

        <p>{props.label}</p>

      )}

      <CRow>
        <CCol>
          <div className="input-group">

            <div className="custom-file ">

              <CInputGroup >
                {(props.archivoId || state.fileId !== null) && (

                  <button
                    onClick={() => verArchivo()}
                    className="btn btn-outline-primary"
                    type="button"
                  >
                    Ver archivo
                  </button>

                )}

                <div className="fileinputs border  ">

                  <CFormInput
                    type="file"
                    className="file"

                    disabled={props.mostrasSoloVer}
                    onChange={(e) => archivoSeleccionado(e)}
                  />
                  <div className="fakefile mt-2 ms-2">
                    <label
                      className="custom-file-label"
                      data-browse="Buscar archivo"
                    >
                      <p className="text-muted">
                        {state.filename}
                      </p>

                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-outline-primary"
                  onClick={() => subir()}
                  type="button"
                  disabled={state.desabilitado}
                >
                  {state.verSpinner && (
                    <CSpinner className="me-2" size="sm" color="primary" />
                  )}

                  Subir

                </button>
              </CInputGroup>
              <CFormFeedback invalid>Sube Un Archivo .</CFormFeedback>
            </div>
            <div className="input-group-append">

            </div>
          </div>

        </CCol>
      </CRow>


    </div>
  )


}
UploadFile.propTypes = {
  servicio: PropTypes.string,
  archivoId: PropTypes.number,
  modalTitle: PropTypes.string,
  validarArchivo: PropTypes.bool,
  onArchivoCargado: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
  mostrarLableSiempre: PropTypes.bool,
  mostrasSoloVer: PropTypes.bool,
};

export default UploadFile;