const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 3000

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())


app.get("/hello/:id", async (request, response) => {
    try {
        let name = request.params.id
        let age = request.query.age
        let result = "hello " + name + " you are " + age
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.Please get em`)
})


