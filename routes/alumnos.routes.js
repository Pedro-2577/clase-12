import express from 'express'
import * as controllers from '../controllers/alumnos.controllers.js'

const route = express.Router()

route.get('/alumnos', controllers.getAlumnos)
route.get('/alumnos/:id', controllers.getAlumnoDetail)

route.get('/alumnos/nuevo', controllers.getAlumnoNuevo)
route.post('/alumnos/nuevo', controllers.postAgregarAlumno)

route.get('/edit/:id', controllers.getAlumnoEdit)
route.post('/edit', controllers.postAlumnoEdit)

route.get('/delete/:id', controllers.getAlumnoDelete)

export default route