import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const Reporteria = React.lazy(() => import('./views/reporteria/Reporteria'))

const Usuario = React.lazy(() => import('./views/usuario/UsuarioList'))
const UsuarioCreate = React.lazy(() => import('./views/usuario/UsuarioCreate'))
const UsuarioEdit = React.lazy(() => import('./views/usuario/UsuarioEdit'))
const UsuarioView = React.lazy(() => import('./views/usuario/UsuarioView'))
const UsuarioEditStaff = React.lazy(() => import('./views/usuario/UsuarioEditStaff'))

const Catalogos = React.lazy(() => import('./views/catalogos/CatalogosList'))
const CatalogoCreate = React.lazy(() => import('./views/catalogos/CatalogoCreate'))
const CatalogoEdit = React.lazy(() => import('./views/catalogos/CatalogoEdit'))
const CatalogoView = React.lazy(() => import('./views/catalogos/CatalogoView'))


const Servicios = React.lazy(() => import('./views/servicio/ServicioList'))
const ServicioCreate = React.lazy(() => import('./views/servicio/ServicioCreate'))
const ServicioEdit = React.lazy(() => import('./views/servicio/ServicioEdit'))
const ServicioVerificar = React.lazy(() => import('./views/servicio/ServicioVerificar'))
const ServicioView = React.lazy(() => import('./views/servicio/ServicioView'))

const Rol = React.lazy(() => import('./views/rol/RolList'))
const RolEdit = React.lazy(() => import('./views/rol/RolEdit'))
const RolCreate = React.lazy(() => import('./views/rol/RolCreate'))
const RolView = React.lazy(() => import('./views/rol/RolView'))

const Importadores = React.lazy(() => import('./views/Importadores/ImportadoresList'))
const ImportadoresCreate = React.lazy(() => import('./views/Importadores/ImportadorCreate'))
const ImportadoresEdit = React.lazy(() => import('./views/Importadores/ImportadorEdit'))
const ImportadoresView = React.lazy(() => import('./views/Importadores/ImportadorView'))

const Recibo = React.lazy(() => import('./views/recibos/ReciboList'))
const ReciboEdit = React.lazy(() => import('./views/recibos/ReciboEdit'))
const ReciboView = React.lazy(() => import('./views/recibos/ReciboView'))
const GenerarReciboInterno = React.lazy(() => import('./views/recibos/GenerarRecibo/UsuarioInterno/GenerarRecibo'))

const routes = [

  { path: '/dashboard', name: 'Inicio', element: Dashboard, excluir : true  },


  { path: '/usuario', name: 'Usuario', element: Usuario  },
  { path: '/usuario/crear', name: 'Crear', element: UsuarioCreate  },
  { path: '/usuario/editar/:id', name: 'Editar', element: UsuarioEdit  },
  { path: '/usuario/ver/:id', name: 'Ver', element: UsuarioView  },
  { path: '/usuario/editarstaff/:id', name: 'EditarStaff', element: UsuarioEditStaff  },

  { path: '/catalogo', name: 'Catalogos', element: Catalogos  },
  { path: '/catalogo/crear', name: 'Crear', element: CatalogoCreate  },
  { path: '/catalogo/editar/:id', name: 'Editar', element: CatalogoEdit  },
  { path: '/catalogo/ver/:id', name: 'Ver', element: CatalogoView  },

  { path: '/servicio', name: 'Servicio', element: Servicios  },
  { path: '/servicio/crear', name: 'Crear', element: ServicioCreate  },
  { path: '/servicio/editar/:id', name: 'Editar', element: ServicioEdit  },
  { path: '/servicio/verificar/:id', name: 'Verificar', element: ServicioVerificar  },
  { path: '/servicio/ver/:id', name: 'Ver', element: ServicioView  },

  { path: '/rol', name: 'Rol', element: Rol  },
  { path: '/rol/crear', name: 'Crear', element: RolCreate  },
  { path: '/rol/editar/:id', name: 'Editar', element: RolEdit  },
  { path: '/rol/ver/:id', name: 'Ver', element: RolView  },
  
  { path: '/importadores', name: 'Importadores', element: Importadores  },
  { path: '/importadores/crear', name: 'Crear', element: ImportadoresCreate  },
  { path: '/importadores/editar/:id', name: 'Editar', element: ImportadoresEdit  },
  { path: '/importadores/gestionar/:id', name: 'Ver', element: ImportadoresView  },

  { path: '/recibo', name: 'Recibo', element: Recibo  },
  { path: '/recibo/gestionar/:id', name: 'Editar', element: ReciboEdit  },
  { path: '/recibo/ver/:id', name: 'Ver', element: ReciboView  },
  { path: '/generar/recibo', name: 'Generar', element: GenerarReciboInterno  },

  { path: '/reporte', name: 'Reporte', element: Reporteria  },
]

export default routes
