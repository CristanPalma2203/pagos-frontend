import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import { PersistGate } from 'redux-persist/integration/react';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import configureStore from './configureStore';
import { Loader } from './components/index'

const { store } = configureStore;
const persitor = configureStore.persistor;


// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const LandingPage = React.lazy(() => import('./views/pages/landingPage/LandingPage'))
const VerificarCorreo = React.lazy(() => import('./views/pages/verificarCorreo/VerificarCorreo'))
const RecuperarContraseña = React.lazy(() => import('./views/pages/RecuperarContrasena/RecuperarContrasenaView'))
const ContraseñaEditar= React.lazy(() => import('./views/pages/RecuperarContrasena/ContraseñaEdit'))
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persitor}>
          <HashRouter>
            <Suspense fallback={<Loader />}>
              <Routes>
              <Route exact path="/" name="Landing Page" element={<LandingPage />} />
                <Route exact path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/register" name="Register Page" element={<Register />} />
                <Route exact path = "/recuperarcontrasena" name="Recuperar Contrasena" element={<RecuperarContraseña  />}   />
                <Route exact path = "/cambiarPassword/:id" name="Editar Contrasena" element={<ContraseñaEditar  />} />
                <Route exact path = "/verificacion-correo/:token" name="Verificar Correo" element={<VerificarCorreo  />} />
                <Route exact path="/404" name="Page 404" element={<Page404 />} />
                <Route exact path="/500" name="Page 500" element={<Page500 />} />
                <Route path="*" name="Home" element={<DefaultLayout  />}   />
              </Routes>
            </Suspense>
          </HashRouter>
        </PersistGate>
      </Provider>

    )
  }
}

export default App
