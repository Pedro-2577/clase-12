import express from 'express'
import * as controllers from '../controllers/alumnos.controllers.js'

const route = express.Router()

route.get('/alumnos', controllers.getAlumnos)
route.get('/alumnos/:legajo', controllers.getAlumnoDetail)

route.get('/alumnos/nuevo', controllers.getAlumnoNuevo)
route.post('/alumnos/nuevo', controllers.postAgregarAlumno)

route.get('/edit/:legajo', controllers.getAlumnoEdit)
route.post('/edit', controllers.postAlumnoEdit)

route.get('/delete/:legajo', controllers.getAlumnoDelete)

export default route