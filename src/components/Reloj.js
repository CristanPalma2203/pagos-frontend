import React, { useEffect, useState } from "react";
import { CCard, CCardTitle, CPlaceholder, CSpinner } from '@coreui/react';
import relojBg from "../assets/images/relojBg.png"
import { BsCalendar3 } from "react-icons/bs"
function Clock() {
  const [miniLoading, setMiniLoading] = useState(true);
  const [clockState, setClockState] = useState(
    {
      dia: "",
      mes: "",
      hora: "",
      minutos: ""
    }
  );
  const meses = {
    1: 'Enero', 2: 'Febrero', 3: 'Marzo', 4: 'Abril',
    5: 'Mayo', 6: 'Junio', 7: 'Julio', 8: 'Agosto', 9: 'Septiembre',
    10: 'Octubre', 11: 'Noviembre', 12: 'Diciembre'
  }
  useEffect(() => {
    setMiniLoading(true);
    const timer = setInterval(() => {
      const date = new Date();
      setClockState({
        ...clockState,
        dia: date.getDate(),
        mes: date.getMonth() + 1,
        minutos: String(date.getMinutes()).padStart(2, '0'),
        hora: String(date.getHours()).padStart(2, '0')
      });
      setMiniLoading(false);
    }, 1000);
    return (() => {
      clearInterval(timer);
    });
  }, []);

  return (
    <div>
      <CCard color="white" className={` shadow  text-black  `}>
        <div className="m-3 mb-0 ">
          <CCardTitle className='m-0 text-uppercase text-info fw-bold reloj-mes' ><BsCalendar3 className="mb-1" size={"15"} />

            {miniLoading && (
              <CPlaceholder className="ms-2" color="danger" xs={6} />
            )}
            {!miniLoading && (
              <small className="ms-2">{meses[clockState.mes]}</small>
            )}
          </CCardTitle>
          <p className="fs-1 fw-medium mb-0">
            {miniLoading && (
              <CSpinner color="light" />
            )}
            {!miniLoading && (
              clockState.dia
            )}
          </p>
          <div className=' mb-1 reloj text-end'>
            <small className="m-0 fs-2 fw-medium" >
              {miniLoading && (
                <CSpinner color="light" />
              )}
              {!miniLoading && (
                clockState.hora
              )}
            </small>
            <small className="m-0 fs-2 fw-medium" >:</small>
            <small className="m-0 fs-2 fw-medium" >
              {miniLoading && (
                <CSpinner color="light" />
              )}
              {!miniLoading && (
                clockState.minutos
              )}
            </small>
            <small className="mb-2 fs-2 fw-medium" ></small>
          </div>
        </div>



      </CCard>
    </div>

  );
}

export default Clock;