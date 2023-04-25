import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://127.0.0.1:27017")

client.connect()
.then(function(){
    const db = client.db("DB_AHT")

    db.collection("Coleccion").insertOne({name: "Hola desde node"})




    console.log("Conectado a la base de datos...")
})
.catch(function(){
    console.log("No se puedo conectar...")
})