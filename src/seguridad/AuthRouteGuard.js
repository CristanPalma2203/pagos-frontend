import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
class AuthRouteGuard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  renderComponent(route, usuario, props) {
    const found = usuario.permisos.find(x => {
      if (x.url) {
        var ruta = x.url.split("?");
        return ruta[0] === props.match.path || x.url === props.match.url
      }
      return false;
    });
    if (found) {
      return <route.component {...props} />;
    }

    return this.renderRedirect('/no-autorizado', props);
  }

  renderRedirect(path, props) {
    return (
      <Redirect to={{ pathname: path, state: { from: props.location } }} />
    );
  }

  render() {
    const usuario = this.props.usuario;
    const route = this.props.route;

    return (
      usuario.autenticado
        ? this.renderComponent(route, usuario, this.props.parentProps)
        : this.renderRedirect('/login', this.props.parentProps)
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    usuario: state.usuario
  };
};

export default connect(mapStateToProps)(AuthRouteGuard);
