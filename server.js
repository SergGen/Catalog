const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});

app.use(express.static('.'));

app.get('/catalog', (req, res) => {
  fs.readFile('./data/catalog.json', 'utf-8', (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

app.get('/get-cart', (req, res) => {
  fs.readFile('./data/cart.json', 'utf-8', (err, data) => {
    if (!err) {
      res.send(data);
    }
  });
});

app.post('/add', (req, res) => {
  cartUpdate(res,JSON.parse(req.data));
  logging('Added 1 good');
});

app.post('/subtract', (req, res) => {
  cartUpdate(res,JSON.parse(req.data));
  logging('Subtracted 1 good');
});

app.post('/remove', (req, res) => {
  cartUpdate(res,JSON.parse(req.data));
  logging('Removed 1 good');
});

function logging(action){
  let data = action + String(new Date()) + `\n`;
  fs.appendFile('./data/log.log', data, (err) => { });
}

function cartUpdate(res, data){
  fs.writeFile('./data/cart.json', data, (err, data) => {
    if (!err) {
      res.send(JSON.stringify({"result": 1}));
    }
  });
}