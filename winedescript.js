const express = require('express');
const bodyParser = require('body-parser');
// const apicache = require('apicache');
const app = express();
//future api design and cache//
// let cache = apicache.middleware;
// app.use(cache('5 minutes'));
//wines data in a database
const wines = [
    { wineType: "merlot", priceDollar: 45, foodPair: "steak", occasion: "fancy dinner", inventory: 30 },
    { wineType: "riesling", priceDollar: 25, foodPair: "chicken", occasion: "dinner", inventory: 37 },
    { wineType: "pinot noir", priceDollar: 15, foodPair: "meat", occasion: "dinner", inventory: 25 },
    { wineType: "champagne", priceDollar: 100, foodPair: "fancycheese", occasion:["dinner","event"], inventory: 14 },
    { wineType: "cabernet", priceDollar: 50, foodPair: "steak", occasion: "dinner", inventory: 80 },
    { wineType: "pinot grigio", priceDollar: 20, foodPair: "fancycheese", occasion: ["dinner", "event"], inventory: 46 },
    { wineType: "port", priceDollar: 20, foodPair: "dessert", occasion: "dinner", inventory: 10 },
    { wineType: "redblend", priceDollar: 15, foodPair: "anything", occasion: "any occasion", inventory: 46 },
    { wineType: "boxwine", priceDollar: 15, foodPair: "anything", occasion: "event", inventory: 20 },
    { wineType: "chardonnay", priceDollar: 15, foodPair: "seafood", occasion: ["dinner", "event", "any occasion"], inventory: 44 },
    { wineType: "zinfandel", priceDollar: 25, foodPair: "smokey and salty", occasion: "dinner", inventory: 30 },

]

const foods = [
    { wineType: "merlot", priceDollar: 45, foodPair: "steak", occasion: "fancy dinner", inventory: 30 },
    { wineType: "riesling", priceDollar: 25, foodPair: "chicken", occasion: "dinner", inventory: 37 },
    { wineType: "pinot noir", priceDollar: 15, foodPair: "meat", occasion: "dinner", inventory: 25 },
    { wineType: "champagne", priceDollar: 100, foodPair: "fancycheese", occasion:["dinner","event"], inventory: 14 },
    { wineType: "cabernet", priceDollar: 50, foodPair: "steak", occasion: "dinner", inventory: 80 },
    { wineType: "pinot grigio", priceDollar: 20, foodPair: "fancycheese", occasion: ["dinner", "event"], inventory: 46 },
    { wineType: "port", priceDollar: 20, foodPair: "dessert", occasion: "dinner", inventory: 10 },
    { wineType: "redblend", priceDollar: 15, foodPair: "anything", occasion: "any occasion", inventory: 46 },
    { wineType: "boxwine", priceDollar: 15, foodPair: "anything", occasion: "event", inventory: 20 },
    { wineType: "chardonnay", priceDollar: 15, foodPair: "seafood", occasion: ["dinner", "event", "any occasion"], inventory: 44 },
    { wineType: "zinfandel", priceDollar: 25, foodPair: "smokey and salty", occasion: "dinner", inventory: 30 },
]

const prices = [
    { wineType: "merlot", priceDollar: 45, foodPair: "steak", occasion: "fancy dinner", inventory: 30 },
    { wineType: "riesling", priceDollar: 25, foodPair: "chicken", occasion: "dinner", inventory: 37 },
    { wineType: "pinot noir", priceDollar: 15, foodPair: "meat", occasion: "dinner", inventory: 25 },
    { wineType: "champagne", priceDollar: 100, foodPair: "fancycheese", occasion:["dinner","event"], inventory: 14 },
    { wineType: "cabernet", priceDollar: 50, foodPair: "steak", occasion: "dinner", inventory: 80 },
    { wineType: "pinot grigio", priceDollar: 20, foodPair: "fancycheese", occasion: ["dinner", "event"], inventory: 46 },
    { wineType: "port", priceDollar: 20, foodPair: "dessert", occasion: "dinner", inventory: 10 },
    { wineType: "redblend", priceDollar: 15, foodPair: "anything", occasion: "any occasion", inventory: 46 },
    { wineType: "boxwine", priceDollar: 15, foodPair: "anything", occasion: "event", inventory: 20 },
    { wineType: "chardonnay", priceDollar: 15, foodPair: "seafood", occasion: ["dinner", "event", "any occasion"], inventory: 44 },
    { wineType: "zinfandel", priceDollar: 25, foodPair: "smokey and salty", occasion: "dinner", inventory: 30 },
]

const occasion = [
    { wineType: "merlot", priceDollar: 45, foodPair: "steak", occasion: "fancy dinner", inventory: 30 },
    { wineType: "riesling", priceDollar: 25, foodPair: "chicken", occasion: "dinner", inventory: 37 },
    { wineType: "pinot noir", priceDollar: 15, foodPair: "meat", occasion: "dinner", inventory: 25 },
    { wineType: "champagne", priceDollar: 100, foodPair: "fancycheese", occasion:["dinner","event"], inventory: 14 },
    { wineType: "cabernet", priceDollar: 50, foodPair: "steak", occasion: "dinner", inventory: 80 },
    { wineType: "pinot grigio", priceDollar: 20, foodPair: "fancycheese", occasion: ["dinner", "event"], inventory: 46 },
    { wineType: "port", priceDollar: 20, foodPair: "dessert", occasion: "dinner", inventory: 10 },
    { wineType: "redblend", priceDollar: 15, foodPair: "anything", occasion: "any occasion", inventory: 46 },
    { wineType: "boxwine", priceDollar: 15, foodPair: "anything", occasion: "event", inventory: 20 },
    { wineType: "chardonnay", priceDollar: 15, foodPair: "seafood", occasion: ["dinner", "event", "any occasion"], inventory: 44 },
    { wineType: "zinfandel", priceDollar: 25, foodPair: "smokey and salty", occasion: "dinner", inventory: 30 },
]

app.use(bodyParser.json());

app.get('/wines', (req, res) => {
    const { wineType, priceDollar, foodPair, occasion, inventory } = req.query;
    let results = [...wines];
    if (wineType) {
        results = results.filter(r => r.wineType === wineType);
    }

    if (priceDollar) {
        results = results.filter(r => +r.priceDollar === +priceDollar)
    }

    if (foodPair) {
        results = results.filter(r => r.foodPair === foodPair)
    }

    if (occasion) {
        results = results.filter(r => r.occasion === occasion)
    }

    if (inventory) {
        results = results.filter(r => r.inventory === inventory)
    }
    res.json(results);
});

app.get('/foods', (req, res) => {
    const { wineType, priceDollar, foodPair, occasion, inventory } = req.query;
    let results = [...foods];
    if (wineType) {
        results = results.filter(r => r.wineType === wineType);
    }

    if (priceDollar) {
        results = results.filter(r => +r.priceDollar === +priceDollar)
    }

    if (foodPair) {
        results = results.filter(r => r.foodPair === foodPair)
    }

    if (occasion) {
        results = results.filter(r => r.occasion === occasion)
    }

    if (inventory) {
        results = results.filter(r => r.inventory === inventory)
    }
    res.json(results);
});

app.get('/prices', (req, res) => {
    const { wineType, priceDollar, foodPair, occasion, inventory } = req.query;
    let results = [...prices];
    if (wineType) {
        results = results.filter(r => r.wineType === wineType);
    }

    if (priceDollar) {
        results = results.filter(r => +r.priceDollar === +priceDollar)
    }

    if (foodPair) {
        results = results.filter(r => r.foodPair === foodPair)
    }

    if (occasion) {
        results = results.filter(r => r.occasion === occasion)
    }

    if (inventory) {
        results = results.filter(r => r.inventory === inventory)
    }
    res.json(results);
});

app.get('/occasion', (req, res) => {
    const { wineType, priceDollar, foodPair, occasion, inventory  } = req.query;
    let results = [...occasion];
    if (wineType) {
        results = results.filter(r => r.wineType === wineType);
    }

    if (priceDollar) {
        results = results.filter(r => +r.priceDollar === +priceDollar)
    }

    if (foodPair) {
        results = results.filter(r => r.foodPair === foodPair)
    }

    if (occasion) {
        results = results.filter(r => r.occasion === occasion)
    }

    if (inventory) {
        results = results.filter(r => r.inventory === inventory)
    }
    res.json(results);
});

app.get('/inventory', (req, res) => {
    const { wineType, priceDollar, foodPair, occasion, inventory } = req.query;
    let results = [...inventory];
    if (wineType) {
        results = results.filter(r => r.wineType === wineType);
    }

    if (priceDollar) {
        results = results.filter(r => +r.priceDollar === +priceDollar)
    }

    if (foodPair) {
        results = results.filter(r => r.foodPair === foodPair)
    }

    if (occasion) {
        results = results.filter(r => r.occasion === occasion)
    }

    if (inventory) {
        results = results.filter(r => r.inventory === inventory)
    }
    res.json(results);
});
//app.listen(4000, () => console.log('Sever go BrRRRrrRrr'));

module.exports = {
    wines : wines,
}
// EXAMPLE OF A FETCH from MDN
//https://developer.mozilla.org/en-US/docs/Web/API/fetch

// const myImage = document.querySelector('img');

// const myRequest = new Request('flowers.jpg');

// fetch(myRequest)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     return response.blob();
//   })
//   .then((response) => {
//     myImage.src = URL.createObjectURL(response);
//   });


//What it should outine if we use CRUD method

//wines route for API
// app.get('/wines', (req, res) => {
//     const articles = [];
//     // code to retrieve an article...
//     res.json(articles);
// });

// app.post('/wines', (req, res) => {
//     // code to add a new article...
//     res.json(req.body);
// });

// app.put('/wines/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update an article... res.json(req.body);
// });

// app.delete('/wines/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
// });

//Foods route for API

// app.get('/foods', (req, res) => {
//     const articles = [];
//     // code to retrieve an article...
//     res.json(articles);
// });

// app.post('/foods', (req, res) => {
//     // code to add a new article...
//     res.json(req.body);
// });

// app.put('/foods/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update an article... res.json(req.body);
// });

// app.delete('/foods/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
// });

// Prices route for API

// app.get('/prices', (req, res) => {
//     const articles = [];
//     // code to retrieve an article...
//     res.json(articles);
// });

// app.post('/prices', (req, res) => {
//     // code to add a new article...
//     res.json(req.body);
// });

// app.put('/prices/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update an article... res.json(req.body);
// });

// app.delete('/prices/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
// });

// Occasion route for API

// app.get('/occasion', (req, res) => {
//     const articles = [];
//     // code to retrieve an article...
//     res.json(articles);
// });

// app.post('/occasion', (req, res) => {
//     // code to add a new article...
//     res.json(req.body);
// });

// app.put('/occasion/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update an article... res.json(req.body);
// });

// app.delete('/occasion/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
// });