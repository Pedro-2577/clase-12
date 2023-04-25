import * as services from '../services/alumnos.services.js'
import * as views from '../views/alumnos.views.js'


function getAlumnos(req, res) {

    services.getAlumnos({ deleted: true })
        .then(function (alumnos) {
            res.send(views.createAlumnoListPage(alumnos))
        })
}


function getAlumnoDetail(req, res) {
    const legajo = req.params.legajo

    services.getAlumnoById(legajo)
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
        legajo: req.body.legajo
      };
          
            if(newAlumno) {
                services.addAlumno(newAlumno)
                .then(function (newProduct) {
                    res.send(views.createPage('Alumno creado', `<p>El alumno ${newAlumno.nombre} ha sido creado con el legajo ${newAlumno.legajo}</p>`))
                })
            }else{
                res.send(views.formAlumnoNuevo('Error: Faltan datos'))
            }
}

function getAlumnoEdit(req, res) {
    const legajo = req.params.legajo

    services.getAlumnoById(legajo)
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
        legajo: req.body.legajo
      };
            
            if(newAlumno) {
                 services.editAlumno(newAlumno)
                .then(function (newAlumno) {
                    res.send(views.createPage('Alumno editado', `<p>El alumno ${newAlumno.nombre} ha sido editado</p>`))
                })
            }else{
                res.send(views.createPage('Error', '<p>Ups, algo salio mal</p>'))
            }
}

function getAlumnoDelete(req, res) {
    const legajo = parseInt(req.params.legajo)

    services.deleteAlumno(legajo)
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