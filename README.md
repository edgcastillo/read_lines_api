#Line Reader API
NodeJS and Express server that serves lines of text out of a file to clients.__
##Description
The server runs with Express on top of NodeJS and is able to read large size of text files, and serve each line of text to clients by using GET requests: **/Lines/<line number>**. The system will pre-process the file and attach a number to each line that is terminated by the `\n` character, and it will create an output text file with the indexed lines for further use to the server.
Processing huge lines of text can become very expensive for the system and time consuming, fortunately with Node you can use `Streams` to easily read and write data. Instead of just loading the whole file into memory, with Streams you can create a continuous flow of data and handle or manipulate these individual chunks of data by using `pipes`.
Example:
```
fs.createReadStream(big-file, enconding)
  .pipe(split data)
  .pipe(do something else)
  .on('end', function(data){
    console.log(your data)
    })
```
So in other words we are passing down this flow of data to the pipes, and we can do something with these chunks of data or just wait until the Stream has finished processing the file to log a message to the user._
##Installation
```
$ npm Install

```
##Use
The system will take and process a single file of any size, you just need to be at the `root folder` of the server and provide the path of your file.
```
$ node processor.js /path/of-your-file/ && npm start
```
The command above will pre-process the file and launch the server, for this to work you need to be at the root folder of the server.__
#Test
I included a small text file `sample.txt` to run and test the server.
```
$ npm install
$ npm start
or if you want to run some basic tests
$ npm test
```
