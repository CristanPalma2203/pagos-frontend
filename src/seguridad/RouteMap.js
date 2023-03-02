import React, { Component } from "react";
import { Navigate, Route, Switch } from "react-router-dom";
import AuthRouteGuard from "./AuthRouteGuard";
import { connect } from "react-redux";
class RouteMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  route(route, idx) {
    if (route.exclude) {
      return (
        <Route
          key={idx}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={props => <route.component {...props} />}
        />
      );
    }

    return (
      <Route
        key={idx}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={props => <AuthRouteGuard route={route} parentProps ={props}/> }
      />
    );
    
    return ;
    
  }

  render() {
    const routes = this.props.routes;
    const NoAutenticado = !this.props.usuario.autenticado;
    const {autenticado,cambioContrasena}= this.props.usuario;
    
    if(autenticado && cambioContrasena){
      return <Navigate to="/cambiar-contrasena" />
    }
    
    if (NoAutenticado) {
      return <Navigate to="/login" />;
    }

    return routes.map((route, idx) => route.component ? this.route(route, idx) : null );     
    
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    usuario: state.usuario
  };
};

export default connect(mapStateToProps)(RouteMap);
