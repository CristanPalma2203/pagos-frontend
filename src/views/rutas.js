// eslint-disable-next-line import/no-anonymous-default-export
export default {
  roles: "/rol",
  cerrarSession: "usuario/cerrar-session",
  catalogoDepartamentosSenasa: "/catalogo/departamento-senasa",
  rolesSinPaginar: "/rol/sinpaginar",
  importador: {
    base: "/importador",
    getPorUsuario:"/importador/usuario",
    getPorIdentificador:"/importador/identificador",
    EditarImportador:"/importador/actualizar-importador",
    gestionarAccesos:"/importador/gestionar-accesos",
    invitar: "/importador/invitar",
    rechazar: "/importador/rechazar",
    importadoresCorreoVerificado: "/importador/lista",
    solucitarAcceso:"/importador/solicitar-acceso",
    verificarCorreo:"/importador/verificar-correo"
  },
  catalogos: {
    paises: "/catalogo/pais",
    estados: "/catalogo/estado-recibo",
    depto:"/catalogo/departamento",
    municipio:"/catalogo/municipio",
    tipoIdentificacion:"/catalogo/tipo-identificacion",
    base:"/catalogo",
    consultaPorid:"/catalogo/identificador",
    tiposCatalogo:"/catalogo/tipos",
    padresCatalogo:"/catalogo/padres",
    departamentoSenasa:"/catalogo/departamento-senasa",
    areas: "/catalogo/area-servicio",
    categoria: "/catalogo/categoria-servicio",
    tipoServicio: "/catalogo/tipo-servicio",
    moneda: "/catalogo/moneda",
    regional: "/catalogo/regional",
    tipoCobro: "/catalogo/tipo-cobro",
    tipoPersona: "/catalogo/tipo-persona",
    departamentoServicio: "/catalogo/departamento-servicio",
    anios: "/catalogo/anio",
    unidadMedida: "/catalogo/tipo-unidad",
    estadosRecibo: "/catalogo/estado-recibo",
  },

  archivos:{
    base:'/archivo',
    registro:"/archivo/registro"
  },

  recibo:{
    base:"/recibo",
    pdf:"/recibo/pdf",
    reporteUsuario:"/recibo/reporteUsuarioExterno",
    listaRecibosPorMes:"/recibo/listaRecibosPorMes",
    anularRecibo:"/recibo/anular",
    reporteUsuarioListado:"/recibo/gestionesActivas",
    reportePDF:"recibo/pdf/reporte/",
  },
  
  modulosRoles:{
    base:"/rol/modulos"
  },
  servicio:{
    base:"/servicio",
    
  },
  usuarios: {
    base: "/usuario",
    EditarContraseña: "/Usuario/cambiar-contrasena",
    SolicitudCodigo: "/Usuario/codigo-temporal",
    Codigo: "/Usuario/codigo",
    EditarSoloContraseña: "/Usuario/editar-contrasena",
    SinPermiso: "/Usuario/GetSinPermiso",
  },

};


