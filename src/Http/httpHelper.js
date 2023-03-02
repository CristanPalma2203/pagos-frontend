import ApiClientFactory  from './ApiClientFactory';
import configureStore from '../configureStore';
const { store } = configureStore;
const apiBackend = ApiClientFactory.api(store, 'backend');
const archivosBackend = ApiClientFactory.api(store, 'backendArchivos');
const apiAuth = ApiClientFactory.api(store, 'auth');
const getBackenParaArchivos = function(url){

    return ApiClientFactory.configurarParaArchivos(store, 'backend',url)
}
const descargarArchivosBackEnFile = function(url){

    return ApiClientFactory.configurarParaArchivos(store, 'backendArchivos',url)
}
const getPublicDownloadPdf = function(url){
    return ApiClientFactory.configPublicDownloadPdf(store, "backend", url)
}
export default { apiBackend,apiAuth, archivosBackend,getBackenParaArchivos, descargarArchivosBackEnFile,getPublicDownloadPdf};