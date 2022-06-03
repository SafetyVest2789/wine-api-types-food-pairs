const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const wines= {
    'zinfandel':{
        'typeWine': 'white',
        'tanninsTaste': 'high',
        'priceDollar': '5.99',
        'foodPair':'chicken salad',
        'otherName': 'Rose, Zinfendel'
    },
    'champagne':{
        'typeWine': 'white',
        'tanninsTaste': 'low',
        'priceDollar': '9.99',
        'foodPair':'chicken salad',
        'otherName': 'sparkling wine, prosecco, cava'
    },
    'riesling':{
        'typeWine': 'white',
        'tanninsTaste': 'low',
        'priceDollar': '4.99',
        'foodPair':'chicken salad',
        'otherName': 'Riesling, white wine'
    },
    'pinot noir':{
        'typeWine': 'red',
        'tanninsTaste': 'mid',
        'priceDollar': '7.99',
        'foodPair':'steak',
        'otherName': 'Red Blend, Best Choice'
    },
    'cheap horrible choice':{
        'typeWine': 'red',
        'tanninsTaste': 'mid',
        'priceDollar': '2.99',
        'foodPair':'pizza',
        'otherName': '2 dollar wine, Spacebag wine'
    },
}

app.get('/', (request, response)=> {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request,response)=> {
    const winesName = request.params.name.toLowerCase()
    if(wines[winesName]) {
        response.json(wines[winesName])
    } else {
        response.json(wines['cheap horrible choice'])
    }

})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}! You betta go catch it!`)
})