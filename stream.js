var express = require('express');
var fs = require('fs');
var highland = require('highland');
var app = express();


module.exports = {
  getLine: function (filename, line_no, cb){
      var result;
      highland(fs.createReadStream(filename, 'utf8'))
      .split()
      .filter(function(line){
        return line.split(":")[0] === line_no;
      })
      .each(function(data){
        result = {
          index: data.split(":")[0],
          text: data.split(":")[1]
        }
      })
      .on('end', function(){
        console.log(result);
        cb(result);
      })
    },
 getLength: function (filename, cb){
     var counter = 0;
     highland(fs.createReadStream(filename, 'utf8'))
       .split()
       .each(function(line){
         if(line){counter += 1};
       })
       .on('end', function(){
         cb(counter);
       });
     }
}
