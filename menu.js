const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 8000
const http = require('http');
// const https = require('https');

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())


/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

const options = {
    host: 'localhost',
    port: 3000,
    path: '/wines',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  

async function getWine (options) {
  const port = options.port == 3000 ? http : http;
  console.log ('options = ', options)
  let output = '';

  const req = port.request(options, (res) => {
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = JSON.parse(output);
      console.log('obj = ', obj)
      return (res.statusCode, obj);
    });
  });

  req.on('error', (err) => {
    console.log('err.message = ', err.message)
    // res.send('error: ' + err.message);
  });

  req.end();
};

// function getWine (options, result) {
//     console.log('now in get wine')
//     console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);
    
//     //   res.statusCode = statusCode;
    
// res.send(result);
// };


let result = ''; 
result = await getWine (options);
console.log('result = ', result) 


// app.get("/search", async (request,response) => {
//     try {
//         let result = await collection.aggregate([
//             {
//                 "$search" : {
//                     "autocomplete" : {
//                         "query": `${request.query.query}`,
//                         "path": "name",
//                         "fuzzy": {
//                             "maxEdits":2,
//                             "prefixLength": 3
//                         }
//                     }
//                 }
//             }
//         ]).toArray()
//         //console.log(result)
//         response.send(result)
//     } catch (error) {
//         response.status(500).send({message: error.message})
//         //console.log(error)
//     }
// })

//This is refactored to pass a variable of any name for id.

app.get("/hello/:id", async (request, response) => {
    try {
        let name = request.params.id
        let age = request.query.age
        //console.log(" request.query.age = ", request.query.age )
        let result = "hello " + name + " you are " + age
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.Please get em`)
})

//Usig this as example to direct to kitchen.js
// fetch(url, options)
//     .then((res) => {
//       console.log(res);
//       if (res.status !== 200) throw res.json();
//       return res.json();
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// };
