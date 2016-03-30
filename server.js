var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var stream = require('./stream');
var port = 8080;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/lines', function(req, res){
  stream.getLength('sample.txt', function(counter){
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({totalLines: counter});
  })
});

app.get('/lines/:id', function(req, res){
  var line_no = req.params.id;
  stream.getLine('sample.txt', line_no, function(result){
    if(result) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({line: result.index, text: result.text});
    } else {
      res.status(413).send({error: "EOF"});
    }
  });
});

app.listen(port, function(){
  console.log("Listening on port", port);
})

module.exports = app;
