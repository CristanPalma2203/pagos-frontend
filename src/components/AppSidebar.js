import React from 'react'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar, CSidebarNav, CImage } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import { connect } from "react-redux";
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import avatar8 from './../assets/brand/logohonduras.png'


const AppSidebar = (props) => {
  const dispatch = useDispatch()
  const uiState = useSelector((state) => state.ui)

  return (

    <CSidebar
      position="fixed"
      visible={uiState.mostrarMenu}
      
    >

        <div className="text-center mt-4 mb-4">
          <CImage rounded src={avatar8} fluid />
        </div>

      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={props.menu} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

const mapStateToProps = (state, ownProps) => {

  return {
    usuario: state,
  };
};

AppSidebar.propTypes = {
  menu: PropTypes.array
};

export default connect(mapStateToProps)(AppSidebar);
