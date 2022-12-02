const express = require('express')
const app = express()
const cors = require('cors')
//const {MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 8000

//VARIABLES FOR DATABASE//
/*let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'wines',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('basic')
    })*/

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.get("/search", async (request,response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path": "name",
                        "fuzzy": {
                            "maxEdits":2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        //console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
        //console.log(error)
    }
})
//This is refactored to pass a variable of any name for id.
app.get("/hello/:id", async (request, response) => {
    try {
        let name = request.params.id
        let result = "hello " + request.params.id
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.Please get em`)
})