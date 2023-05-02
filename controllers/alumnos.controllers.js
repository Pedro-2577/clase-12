import * as services from '../services/alumnos.services.js'
import * as views from '../views/alumnos.views.js'


function getAlumnos(req, res) {

    services.getAlumnos({ deleted: true })
        .then(function (alumnos) {
            res.send(views.createAlumnoListPage(alumnos))
        })
}


function getAlumnoDetail(req, res) {
    const id = req.params.id

    services.getAlumnoById(id)
        .then(function (alumno) {
            if (alumno) {
                res.send(views.createAlumnoPage(alumno))
            }
            else {
                res.send(views.createPage('Alumno no encontrado', '<p>El alumno no existe</p>'))
            }

        })
}

function getAlumnoNuevo(req, res) { 

    if(!req.body.hasOwnProperty('nombre')){
        res.send(views.formAlumnoNuevo())
    }
}

function postAgregarAlumno(req, res) {
    const newAlumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año,
        legajo: req.body.legajo,
        id: req.body.id
      };
          
            if(newAlumno) {
                services.addAlumno(newAlumno)
                .then(function (newAlumno) {
                    res.send(views.createPage('Alumno creado', `<p>El alumno ${newAlumno.nombre} ha sido creado con el legajo ${newAlumno.legajo}</p>`))
                })
            }else{
                res.send(views.formAlumnoNuevo('Error: Faltan datos'))
            }
}

function getAlumnoEdit(req, res) {
    const id = req.params.id

    services.getAlumnoById(id)
        .then(function (alumno) {
            if (alumno) {
                res.send(views.editAlumnoPage(alumno))
            }
            else {
                res.send(views.createPage('Alumno no encontrado', '<p>El alumno no existe</p>'))
            }

        })
}

function postAlumnoEdit(req, res) {
    const newAlumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: req.body.año,
        legajo: req.body.legajo,
        id: req.body.id
      };
            
            if(newAlumno) {
                 services.editAlumno(newAlumno.id, newAlumno)
                .then(function (newAlumno) {
                    res.send(views.createPage('Alumno editado', `<p>El alumno ${newAlumno.nombre} ha sido editado</p>`))
                })
            }else{
                res.send(views.createPage('Error', '<p>Ups, algo salio mal</p>'))
            }
}

function getAlumnoDelete(req, res) {
    const id = parseInt(req.params.id)

    services.deleteAlumno(id)
        .then(function (alumno) {
            if (alumno) {
                res.send(views.createPage('Alumno eliminado', `<p>El alumno ${alumno.nombre} ha sido eliminado</p>`))
            }
            else {
                res.send(views.createPage('Alumno no encontrado', '<p>El alumno no existe</p>'))
            }

        })
}
    

export {
    getAlumnos,
    getAlumnoDetail,
    getAlumnoNuevo,
    postAgregarAlumno,
    getAlumnoEdit,
    postAlumnoEdit,
    getAlumnoDelete
}