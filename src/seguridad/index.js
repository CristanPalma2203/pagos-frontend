import React,{ Component } from "react";
import { connect, useSelector } from "react-redux";

const AuthGuard = (props) => {

  const usuario = useSelector((state) => state.usuario)
  const isAuthorized=() => {
    const permiso = props.permiso;

    if (permiso == null) return true;

    const found = getPermisos().find(function (element) {
      return element.codigo === permiso;
    });
    return found;
  }

  const getPermisos =() => {
    let permisos = [];
    if (usuario.roles) {
      usuario.roles.forEach(element => {
        permisos = [...permisos, ...element.permisosConMetadata];
      });
      return permisos;
    }
    return permisos;
  }

  if (isAuthorized()) {
    return props.children;
  }
  return "";
   
  
}

const mapStateToProps = (state, ownProps) => {
  return {
    usuario: state.usuario
  };
};

export default connect(mapStateToProps)(AuthGuard);
