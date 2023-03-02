import React from 'react'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,


} from '@coreui/react'
import { connect } from "react-redux";
import { AppHeaderDropdown } from './header/index'
import { cilMenu } from '@coreui/icons'
import { useSelector, useDispatch } from 'react-redux'
import CIcon from '@coreui/icons-react'
import * as  actions from "../redux/actions/ui"
const AppHeader = () => {
  
  const dispatch = useDispatch()

  return (
    <CHeader position="fixed" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => { actions.toggleMenu()(dispatch) }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CHeaderNav className="ms-3">

          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

const mapStateToProps = (state, ownProps) => {

  return {
    usuario: state,
  };
};

export default connect(mapStateToProps)(AppHeader);
