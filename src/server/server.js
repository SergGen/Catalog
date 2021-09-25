const path = require('path');
const express = require('express');
const app = express();
//const bodyParser = require('body-parser');


const fs = require('fs');

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../public')));

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});



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
    } else {
      res.send(JSON.stringify({empty: 1}));
    }
  });
});

app.post('/add', (req, res) => {
  cartUpdate(res, req.body);
  logging('Added 1 good - ');
});

app.post('/subtract', (req, res) => {
  cartUpdate(res,req.body);
  logging('Subtracted 1 good - ');
});

app.post('/remove', (req, res) => {
  cartUpdate(res,req.body);
  logging('Removed 1 good - ');
});

function logging(action){
  let data = action + String(new Date()) + `\n`;
  fs.appendFile('./data/log.log', data, (err) => { console.log(err); });
}

function cartUpdate(res, data){
  fs.writeFile('./data/cart.json', JSON.stringify(data), (err) => {
    if (!err) {
      res.send(JSON.stringify({"result": 1}));
    } else {
      console.log(err);
    }
  });
}