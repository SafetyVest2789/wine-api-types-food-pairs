const _ = require('lodash')
const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const { request } = require('http')
const wineDescript = require('./winedescript')
require('dotenv').config()
const PORT = 3000

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())


app.get("/wines", async (request, response) => {
    try {
        console.log('get/wines')
        let result = wineDescript.wines
        await response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//https://www.geeksforgeeks.org/express-js-app-post-function/ used as reference 12/7/22
app.get("/wine/:id/prices", async (request, response) => {
    try {

        let id = request.params.id
        // add lodash filtering 
        
        let result;
        if (id == "merlot") {
            result = {price: 45};
        }
        else if (id == "champagne") {
            result = {white: 100}
        }
        else { 
            result = {message:'All out, sorry. Come back later'}
        }
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    // console.log("Ding Dong");
    }
})


// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server is running.Please get em`)
// })

//Am I using this instead? 12/7/22
// app.listen(PORT, function(err){
//     if (err) console.log(err);
//     console.log("Server listening on PORT", PORT);
// });

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is on like Donkey kong. 3000 Please get em`)
})

