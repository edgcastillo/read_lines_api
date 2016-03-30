var fs = require('fs');
var stream = require('stream');
var es = require('event-stream');
var through2 = require('through2');
var path = process.argv.slice(1);
var output = fs.createWriteStream('sample.txt');
var index = 1;

var readStream = fs.createReadStream(path[1]).setEncoding('utf8')
  .pipe(es.split())
  .pipe(through2.obj(function(chunk, enc, callback){
    if(chunk){
      this.push(index.toString() + ":" + chunk + "\n");
      index += 1;
    }

    callback();
  }))
  .on('data', function(data){
    console.log("Reading Line:", index);
    output.write(data);
  })
  .on('error', function(){
    console.log("Error");
  })
  .on('end', function(){
    console.log("Finished reading file,", index, "Lines read");
  })
