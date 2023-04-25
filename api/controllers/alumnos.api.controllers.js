import * as services from '../../services/alumnos.services.js'

function getAlumnos(req, res) {
    services.getAlumnos({deleted: true})
        .then(function (alumnos) {
            res.status(200).json(alumnos)
        })
}

function createAlumno(req, res) {
    const newAlumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: parseInt(req.body.año),
        legajo: parseInt(req.body.legajo)
      }
          
    services.addAlumno(newAlumno)
        .then(function(newAlumno){
            res.status(201).json(newAlumno)
        })
}

function getAlumnoById(req, res) {
    const legajo = req.params.legajo

    services.getAlumnoById(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno #${legajo} no encontrado.` } })
            }
        })
}

function replaceAlumno(req, res) {
    const legajo = parseInt(req.params.legajo)
    const alumno = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        año: parseInt(req.body.año),
        legajo: parseInt(req.body.legajo)
    }

    services.editAlumno(legajo, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno #${legajo} no encontrado.` } })
            }
        })
}

function updateAlumno(req, res) {
    const legajo = parseInt(req.params.legajo)
    const alumno = {}

    if (req.body.nombre) {
        alumno.nombre = req.body.nombre
    }

    if (req.body.apellido) {
        alumno.apellido = req.body.apellido
    }

    if (req.body.año) {
        alumno.año = parseInt(req.body.año)
    }

    if (req.body.legajo) {
        alumno.legajo = parseInt(req.body.legajo)
    }
    

    services.editAlumno(legajo, alumno)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno #${legajo} no encontrado.` } })
            }
        })
}

function deleteAlumno(req, res) {
    const legajo = parseInt(req.params.legajo)

    services.deleteAlumno(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno #${legajo} no encontrado.` } })
            }
        })
}

function backUpAlumnos(req, res) {
    services.getAlumnos({deleted: false})
        .then(function (alumnos) {
            res.status(200).json(alumnos)
        })
}

function btnUndeleted(req, res) {
    const legajo = parseInt(req.params.legajo)

    services.btnUndeleted(legajo)
        .then(function (alumno) {
            if (alumno) {
                res.status(200).json(alumno)
            }
            else {
                res.status(404).json({ error: { message: `Alumno #${legajo} no encontrado.` } })
            }
        })
}

export {
    getAlumnos,
    createAlumno,
    getAlumnoById,
    replaceAlumno,
    updateAlumno,
    deleteAlumno,
    backUpAlumnos,
    btnUndeleted
}