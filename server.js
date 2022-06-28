const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
// const { response } = require('express')
// const { request } = require('http')
require('dotenv').config()
const PORT = 8000

//VARIABLES FOR DATABASE//
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'wines',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client =>{
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
        collection = db.collection('basic')
    })

//MIDDLEWARE SETUP FOR APP//
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
//THIS IS CRUD APP METHODS//
// app.get('/', (request,response) =>{
//     db.collection('basic').find().toArray()
//         .then(data => {
//             let wineList = data.map(item => item.name)
//             console.log(wineList)
//             response.render('index.ejs', { info: wineList })
//         })
//         .catch(error => console.error(error))
// })
//THis is experimental //
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

app.get("/get/:id", async (request, response) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.Please get em`)
})
//THis is experimental test//

// app.get('/', (request, response)=> {
//     response.sendFile(__dirname + '/index.html')
// })

// app.get('/api/:name', (request,response)=> {
//     const winesName = request.params.name.toLowerCase()
//     if(wines[winesName]) {
//         response.json(wines[winesName])
//     } else {
//         response.json(wines['cheap horrible choice'])
//     }

// })

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`The server is running on port ${PORT}! You betta go catch it!`)
// })