export default {

    getUsuario(){
        const persit = JSON.parse(window.localStorage.getItem("persist:root"));
        if(persit){
            const usuario = persit.usuario? JSON.parse(persit.usuario):null;
            return usuario;
        }
      return null;
    },
    delete(){
        window.localStorage.removeItem("persist:root");
    },
    save(endpoints){
        window.localStorage.setItem("endpoints",JSON.stringify({endpoints:endpoints}));
    },
    get(){
        return JSON.parse(window.localStorage.getItem("endpoints")).endpoints;
    }
}