
function createAlumnoListPage(alumnos) {
    let html = '<h2>Lista de alumnos</h2>'
    html += '<ul>'

    for (let i = 0; i < alumnos.length; i++) {
        html += `<li>${alumnos[i].nombre} ${alumnos[i].apellido} <a href="/alumnos/${alumnos[i].legajo}">Ver</a> - <a href="/edit/${alumnos[i].legajo}">Editar</a> - <a href="/delete/${alumnos[i].legajo}">Borrar</a></li>`
    }

    html += '</ul>'

    return createPage('Lista de alumnos', html)
}

function createAlumnoPage(alumno) {
    let html = `<h2>${alumno.nombre} ${alumno.apellido}</h2>`
    html += `<p>Año: ${alumno.año}</p>`
    html += `<p>Legajo: ${alumno.legajo}</p>`

    return createPage(alumno.nombre, html)
}

function createPage(title, content) {
    let html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'

    html += '<title>' + title + '</title></head><body>'

    html += '<h1><a href= "/#" >Mi espectacular pagina web!</a></h1>'

    html += content

    html += '</body></html>'

    return html
}

function formAlumnoNuevo(error) {
    let html = ''

    html += '<h2>Formulario de nuevo alumno</h2>'

    if(error) {
        html += `<p>${error}</p>`
    }
    html += `
 
        <form action="/alumnos/nuevo" method="POST" enctype="apptication/x-www-form-urlencoded">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre">
        <label for="apellido">Apellido</label>
        <input type="text" name="apellido" id="apellido">
        <label for="año">Año</label>
        <input type="text" name="año" id="año">
        <label for="legajo">Legajo</label>
        <input type="text" name="legajo" id="legajo">
        <input type="submit" value="Enviar">
        </form>
    `

    return createPage('Formulario de nuevo alumno', html)
}

function editAlumnoPage(alumno) {
    let html = ''

    html += '<h2>Formulario de edición de alumno</h2>'

    html += `
 
        <form action="/edit" method="POST" enctype="apptication/x-www-form-urlencoded">
        <label for="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" value="${alumno.nombre}">
        <label for="apellido">Apellido</label>
        <input type="text" name="apellido" id="apellido" value="${alumno.apellido}">
        <label for="año">Año</label>
        <input type="text" name="año" id="año" value="${alumno.año}">
        <input type="hidden" name="legajo" id="legajo" value="${alumno.legajo}">
        <input type="submit" value="Enviar">
        </form>
    `

    return createPage('Formulario de edición de alumno', html)
}

export {
    createAlumnoListPage,
    createAlumnoPage,
    createPage,
    formAlumnoNuevo,
    editAlumnoPage
}