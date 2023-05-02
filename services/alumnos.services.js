import { readFile, writeFile } from 'node:fs/promises'
import { MongoClient } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("DB_AHT")

async function getAlumnos(filter = {}) {
    await client.connect()
    return db.collection("Alumnos").find({ deleted: {$ne: true} }).toArray()
}

async function getAlumnoById(id) {
    await client.connect()
    return db.collection("Alumnos").findOne({ _id: new ObjectId(id) })
}

async function addAlumno(newAlumno) {
    await client.connect()
    return db.collection("Alumnos").insertOne(newAlumno)
}

async function editAlumno(id, alumno) {
    await client.connect()
    await db.collection("Alumnos").updateOne({ _id: new ObjectId(id) }, { $set: alumno })
    return alumno    
}

async function deleteAlumno(id) {
    await client.connect()
    await db.collection("Alumnos").deleteOne({ _id: new ObjectId(id) })
    return {
        id: id
    }
}

async function replaceAlumno(id, alumno) {
    await client.connect()
    await db.collection("Alumnos").replaceOne({ _id: new ObjectId(id) }, alumno)
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
    replaceAlumno,
    btnUndeleted  // <-- hacer que esto ando y pasarlo a db
}