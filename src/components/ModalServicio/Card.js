import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import PropTypes, { element } from 'prop-types';
import { CBadge, CCard, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'
function Card(props) {
    const [state, setState] = useState(
        {

        }
    );

    useEffect(() => {

    }, []);

    return (
        <div >

            <CCard className="backGround-white-card">
                {
                    <div className="">
                        <CBadge className="ms-1" color="primary" shape="rounded-pill">{props.servicio[3]}</CBadge>
                    </div>
                }
                <CCardBody >
                    <CCardTitle component="h6">{props.servicio[0]} </CCardTitle>
                    <CCardText >
                        {props.servicio[1]} 
                        {props.servicio[4]!==""&&(
                            " / " + props.servicio[4]
                        )}
                    </CCardText>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton className="btn-black" color="primary">{props.servicio[2]}</CButton> 
                    </div>
                </CCardBody>
            </CCard>

        </div>

    );
}
Card.propTypes = {
    servicio: PropTypes.string,
    subServicio: PropTypes.string,

};

export default Card;