import React, { useState, useEffect, Suspense } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader, Loader } from '../components/index'
import { connect } from "react-redux";
import { CNavTitle } from '@coreui/react'
import * as actions from "../redux/actions/usuario";
import { bindActionCreators } from "redux";
import { useSelector } from 'react-redux'
import { CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilHome,
  cilUser,
  cilShieldAlt,
  cilBook,
  cilAddressBook,
  cilFile,
  cilNewspaper
} from '@coreui/icons'
import {
  matchPath,
  useLocation,
  Navigate
} from "react-router-dom";
import routes from "../routes";



const DefaultLayout = () => {

  const { pathname } = useLocation();

  const usuario = useSelector((state) => state.usuario)
  const [loading, setLoading] = useState(true)
  const myIcons = {
    dashboard: cilHome,
    user: cilUser,
    rol: cilShieldAlt,
    catalogo: cilBook,
    importador: cilAddressBook,
    servicio: cilFile,
    recibo: cilNewspaper,
  }
  const example = 'dashboard';

  const [state, setState] = useState(
    {
      permisos: [],
      menu: {
        items: [
          {
            component: CNavItem,
            name: 'Inicio',
            to: '/dashboard',
            icon: <CIcon icon={myIcons[example]} customClassName="nav-icon" />,
          },
        ]
      }
    }

  )

  useEffect(() => {
    let permisos = getPermisos();
    var permisosRoot = permisos.filter(
      c => c.esMenu === true && c.permisoPadre === null
    );
    permisosRoot.forEach(element => {
      state.menu.items.push({
        component: CNavTitle,
        name: element.nombre,
      });
      construirMenu(element.id, permisos);
    });
    setState({ ...state, permisos: permisos })
    setLoading(false)
    return () => {
    }
  }, [])

  const getPermisos = () => {
    let permisos = [];
    if (usuario.roles) {
      usuario.roles.forEach(element => {
        permisos = [...permisos, ...element.permisosConMetadata];
      });
      return permisos;
    }
    return permisos;

  }

  const construirMenu = (IdPadre, listaPermisos) => {
    let permisosHijos = listaPermisos.filter(
      c => c.esMenu === true && c.permisoPadre === IdPadre
    );
    if (permisosHijos.length > 0) {
      permisosHijos.forEach(child => {
        const icon = child.icono;
        var item = {
          component: CNavItem,
          name: child.nombre,
          to: child.url === "" ? "/nourl" : child.url,
          icon: <CIcon icon={myIcons[icon]} customClassName="nav-icon" />,
        };

        construirSubMenu(listaPermisos, child, item);
        state.menu.items.push(item);
      });
    }
  }

  const construirSubMenu = (listaPermisos, child, item) => {
    let nietos = listaPermisos.filter(
      c => c.esMenu === true && c.permisoPadre === child.id
    );
    if (nietos.length > 0) {
      item.children = [];
      nietos.forEach(nieto => {
        const icon = child.icono;
        item.children.push({
          name: nieto.nombre,
          url: nieto.url,
          icon: <CIcon icon={myIcons[icon]} customClassName="nav-icon" />,
        });
      });
    }
  }

  const urlPermitida = () => {
    var respuesta = false;
    state.permisos.forEach(element => {
      var template = {
        path: element.url,
        exact: true,
        strict: false
      };  
      var resul = matchPath(template,pathname);
      if (resul !== null) {
        respuesta = true;
      }
    });
    return respuesta;
  }

  const urlBloqueada = () => {
    var resul = routes.filter(
      c => c.path === pathname && c.excluir === true,
    );
    return resul.length > 0;
  }


  if (loading) {
    return <Loader />;
  }
  
  else {
    
    const auth = usuario.autenticado;
    if (!auth) {
      return <Navigate to="/login" />;
    }
    if (!urlBloqueada()) {
      if (!urlPermitida()) {
        return <Navigate to="/500" />;
      }
    }
    return (
      <div>
        <Suspense>
          <AppSidebar menu={state.menu.items} />
        </Suspense>
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  return {
    usuario: state.usuario
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
