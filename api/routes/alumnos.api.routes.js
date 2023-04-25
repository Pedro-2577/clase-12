import {Router} from 'express'
import * as controller from '../controllers/alumnos.api.controllers.js'

const route = Router()

// defino las rutas
// route.[ACCION]('[IDENTIFICADOR DE RECURSO]', CONTROLADOR)
route.get('/alumnos', controller.getAlumnos)
route.post('/alumnos', controller.createAlumno)

route.get('/alumnos/:legajo', controller.getAlumnoById)
route.put('/alumnos/:legajo', controller.replaceAlumno)
route.patch('/alumnos/:legajo', controller.updateAlumno)
route.delete('/alumnos/:legajo', controller.deleteAlumno)

export default route
