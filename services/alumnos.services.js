import { readFile, writeFile } from 'node:fs/promises'
import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("DB_AHT")




async function getAlumnos(filter = {}) {
    await client.connect()

    return db.collection("Alumnos").find({ deleted: {$ne: true} }).toArray()

}

async function getAlumnoById(legajo) {
    return getAlumnos()
        .then(function (alumnos) {
            let alumno = null
            for (let i = 0; i < alumnos.length; i++) {
                if (alumnos[i].legajo == legajo) {
                    alumno = alumnos[i]
                    break
                }
            }

            return alumno
        })
}

async function addAlumno(newAlumno) {
    const alumnos = await getAlumnos()

        const nuevoAlum = {
            ...newAlumno,
        }
        alumnos.push(nuevoAlum)
        
        await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
        
        return alumnos
}

async function editAlumno(legajo, alumno) {
    let alumnos = await getAlumnos()

    console.log(legajo)
    
    for (let i = 0; i < alumnos.length; i++) {
        console.log(alumnos[i].legajo)
        if (legajo == alumnos[i].legajo) {
            console.log('Alumno modificado correctamente')
            alumnos[i] = alumno
            await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
            break
        }
    }
    
    return alumno
}

async function deleteAlumno(legajo) {
    let alumnos = await getAlumnos()
    let alumno = null

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].legajo == legajo) {
            alumnos[i].deleted = true
            alumno = alumnos[i]
            break
        }
    }

    if(alumno){
        await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
    }


    return alumno
}

async function btnUndeleted(legajo) {
    const alumnos = getAlumnos({deleted: false})

    for (let i = 0; i < alumnos.length; i++) {
        if (alumnos[i].legajo == legajo) {
            alumnos[i].deleted = false
            alumno = alumnos[i]
            break
        }
    }

    if(alumno){
        await writeFile('./data/alumnos.json', JSON.stringify(alumnos))
    }

    return alumno
}

export {
    getAlumnos,
    getAlumnoById,
    addAlumno,
    editAlumno,
    deleteAlumno,
    btnUndeleted
}