import React, { useState, useEffect } from 'react'
import { CTable, CRow, CCol, CContainer, CCallout } from '@coreui/react'
import PropTypes, { element } from 'prop-types';
import Loader from '../GridTable/LoaderTable';
import ReactPaginate from 'react-paginate';
import { Card } from ".."

const ModalServicio = (props) => {
  const emptyTable = <p className="text-center">No hay datos disponibles en el momento.</p>
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState(
    {
      encabezado: [],
      paginas: [],
      cuerpo: [],
      data: {},
      parametrosConsulta: "",
      totalPages: 0,
    },

  )


  useEffect(() => {
    consultar(getQuery(1), 1);

  }, [props.defaltQuery])



  const getQuery = (page) => {

    let ruta = "pageNumber=" + page + "&pageSize=" + props.pageSize;

    if (props.defaltQuery) ruta = props.defaltQuery + "&" + ruta;

    if (state.parametrosConsulta !== "") {
      ruta = "?" + state.parametrosConsulta + "&" + ruta;
    } else {
      ruta = "?" + ruta;
    }

    return ruta;
  }

  const getval = (colDef, row) => {
    if (colDef.render) {
      return colDef.render(row, props.rootParms);
    }

    if (colDef.field) {
      return row[colDef.field];
    } else {

      return "";
    }
  }
  const consultar = async (paging, pagina) => {
    let querydata = await props.servicio.get(
      props.baseRoute + "/" + paging
    );

    creardata(querydata);

  }
  const creardata = (data) => {
    let info = [];
    data.valores.forEach((ele) => {
      let linea = [];
      props.definicion.forEach((element) => {
        linea.push(getval(element, ele));
      });
      info.push(<Card key={info.length} servicio={linea}  />);
    });

    establecerEncabezado(info, data);
  }

  const establecerEncabezado = (info, data) => {
    let th = [];
    props.definicion.forEach((element) => {
      th.push(
        <th key={th.length} scope="col"  >
          {element.header}
        </th>
      );
    });
    setState({ ...state, encabezado: th, cuerpo: info, totalPages: data.metadata.totalPages });
    setLoading(false)
  }
  const changePage = ({ selected }) => {
    consultar(getQuery(selected + 1, selected + 1))
  }

  if (loading) {
    return (
      <Loader />
    );
  } else {
    return (
      <div>
        <div className='body-xd'>
          {
          state.cuerpo
          }
        </div>


        {state.cuerpo.length === 0 && (
          emptyTable
        )}
        {state.totalPages > 0 && !props.recentActivity && (
          <CContainer>
            <CRow className='mt-1 ms-auto me-auto'>
              <CCol className='d-flex justify-content-center me-5'>
                <ReactPaginate
                  previousLabel={"Anterior"}
                  breakLabel={"..."}
                  nextLabel={"Siguiente"}
                  pageCount={state.totalPages}
                  onPageChange={changePage}
                  pageRangeDisplayed={3}
                  renderOnZeroPageCount={null}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </CCol>
            </CRow>
          </CContainer>

        )}

      </div>
    )
  }

}

ModalServicio.propTypes = {
  servicio: PropTypes.elementType,
  baseRoute: PropTypes.string,
  definicion: PropTypes.array,
  defaltQuery: PropTypes.string,
  rootParms: PropTypes.object,
  pageSize: PropTypes.number,
  recentActivity: PropTypes.bool
};

export default ModalServicio;
