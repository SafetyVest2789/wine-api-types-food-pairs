const express = require('express')
const bodyParser = require('body-parser')
const { Mongoclient } = require('mongodb')
const app = express()
const cors = require('cors')
const PORT = 8000
require('dotenv').config()

app.use(cors())

const wines= {
    'zinfandel':{
        'typeWine': 'red',
        'tanninsTaste': 'high',
        'priceDollar': '5.99',
        'foodPair':'chicken salad',
        'otherName': 'Red zinfendel, sweet wine, high level alcohol'
    },
    'champagne':{
        'typeWine': 'white',
        'tanninsTaste': 'low',
        'priceDollar': '9.99',
        'foodPair':'chicken salad',
        'otherName': 'sparkling wine, prosecco, cava, fancy drink'
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
    'mascato':{
        'typeWine': 'white',
        'tanninsTaste': 'low',
        'priceDollar': '8.99',
        'foodPair':'brunch',
        'otherName': 'Sweet white, Summer drink'
    },
    'merlot':{
        'typeWine': 'red',
        'tanninsTaste': 'mid',
        'priceDollar': '8.99',
        'foodPair':'brunch',
        'otherName': 'Sweet red wine, party wine'
    },
    'cabernet sauvignon':{
        'typeWine': 'red',
        'tanninsTaste': 'high',
        'priceDollar': '9.99',
        'foodPair':'meat, heavy meals, complex meals',
        'otherName': 'Flavor town, complex, main ingredient in red blends'
    },
    'red blend':{
        'typeWine': 'red',
        'tanninsTaste': 'mid',
        'priceDollar': '4.99',
        'foodPair':'complex meals, meats, spicy foods',
        'otherName': 'generic wine, wine for beginners'
    },
    'red box wine':{
        'typeWine': 'red',
        'tanninsTaste': 'mid',
        'priceDollar': '12.99',
        'foodPair':'spicy meals, frozen food meals',
        'otherName': '3 liter wine, event party wine, spacebag wine'
    },
    'white box wine':{
        'typeWine': 'white',
        'tanninsTaste': 'mid',
        'priceDollar': '12.99',
        'foodPair':'light meals like chicken, seafood, fancy party cheese',
        'otherName': '3 liter wine, event party wine, spacebag wine, '
    },
    // 'white box wine ':{
    //     'typeWine': 'white',
    //     'tanninsTaste': 'mid',
    //     'priceDollar': '12.99',
    //     'foodPair':'light meals like chicken, seafood, fancy party cheese',
    //     'otherName': '3 liter wine, event party wine, spacebag wine, cheap pinot grigio'
    // },
    'cheap horrible choice':{
        'typeWine': 'red',
        'tanninsTaste': 'mid',
        'priceDollar': '3.49',
        'foodPair':'pizza',
        'otherName': '2 dollar wine, gift for people you dislike'
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