import React from 'react';
import { toast, ToastContainer } from "react-toastify";
import repo from "./EndpointRepository";
const intercep = function (api) {
  var mensaje ="¡Error en el Sistema!";
  api.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response.data;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 422) {
          let msjs = "";
          try {
            msjs = JSON.parse(error.response.statusText);
            msjs.forEach((obj) => {
              toast.error(obj)
            });
            
            
          } catch (e) {
            toast.error(error.response.statusText)
            
          }
        }

        if (error.response.status === 401) {
          //   conf.store.dispatch(logout());
          toast.info("Vuelva iniciar Sesión");
          setTimeout(() => {
            repo.delete();
            // eslint-disable-next-line no-restricted-globals
            location.reload();
          }, 2000);
        }

        if (error.response.status === 403) {
          toast.error("No estas autorizado");
          // conf.store.dispatch(logout());
        }

        if (error.response.status === 500) {
          if (error.response.data && error.response.data.message) {
            toast.error(
              error.response.data.message
            );
          } else {
            toast.error(mensaje);
          }
        }
        if (error.response.status === 405) {
          toast.error("Metodo no Permitio");
        }
      } else if (error.request) {
        toast.error(mensaje);
      } else {
        toast.error(mensaje);
      }
      <ToastContainer></ToastContainer>
      return Promise.reject(error);
    }
    
  );
};

export default intercep;
