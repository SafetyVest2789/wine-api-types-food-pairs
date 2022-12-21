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

// const options = {
//     host: 'localhost',
//     port: 3000,
//     path: '/wines',
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };
  

// async function getWine (options) {
//   const port = options.port == 3000 ? http : http;
//   console.log ('options = ', options)
//   let output = '';

//   const req = await port.request(options, (res) => {
//     res.setEncoding('utf8');
//     console.log('tracer1')

//     res.on('data', (chunk) => {
//       output += chunk;
//     });
//     console.log('tracer2')

//     res.on('end', () => {
//       let obj = JSON.parse(output);
//       console.log('obj = ', obj)
//       output = obj;
//       return (res.statusCode, obj);
//     });
//   });
//   console.log('tracer3')

//   //error handling//
//   req.on('error', (err) => {
//     console.log('err.message = ', err.message)
//     // res.send('error: ' + err.message);
//   });
//   console.log('tracer4')

//   req.end();
// };


// let promise = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve("done!"), 1000);
// });

// // resolve runs the first function in .then
// promise.then(
//   result => alert(result), // shows "done!" after 1 second
//   error => alert(error) // doesn't run
// );


// async function getWines () {
  // console.log('in getWines')
  getWine = async () => {
    console.log('GettIN wine')
    const location = 'localhost';
    const settings = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    };
    try {
        const fetchResponse = await fetch(`http://${location}:3000/wines/`, settings);
        const data = await fetchResponse.json();
        return data;
    } catch (err) {
        return err;
    }    
}


getWine().then(function(result){
  console.log('result = ', result)
});
// console.log('result = ', result)

// async function tester (options) {
//   console.log('tester testing') 
//   result = await getWine(options)
//   console.log('resultUno = ', result) 
// }


// result = tester(options).then(function(result){
//   console.log('resultDeuce = ', result) 
// });

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
