#Line Reader API
NodeJS and Express server that serves lines of text out of a file to clients.
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
So in other words we are passing down this flow of data to the pipes, and we can do something with these chunks of data or just wait until the Stream has finished processing the file to log a message to the user.
There are 5 files include in the server:
```
processor.js - process the text file, indexes each text line and outputs the text file the server will use to serve on the network.
stream.js - module that include the streams server uses to read, find and send the lines requested
server.js - app module, runs the server on port 8080
test.js - small text file using Supertest, Mocha and Chai to run a few test in the sample.txt provided.
sample.txt - text file with 100 lines.
```
##Access
`GET /lines`
- Returns the number of lines in file.
`GET /Lines/<line index>`
- Returns the line requested along with the line number.
```
{
  line: 23,
  text: "leverman unruined unpilgrimlike aulacocarpous Winchester galvanofaradization imprecation Psychozoic"
}
```
##Installation
I included a small text file `sample.txt` to run and test the server.
```
$ npm install - to install dependencies.
```
##Use
The system will take and process a single file of any size, you just need to be at the `root folder` of the server and provide the path of your file.
```
$ node processor.js /path/of-your-file/ && npm start - pre-process file and launch server, need to be in server root to run it.
$ npm start - run the server with sample file.
$ npm test - if you want to run some basic tests with sample file.
```
###Tools
I decided to use Node for this project because I had some familiarity with the system and it uses Javascript, and its simplicity and configuration options allow me to build a prototype of the project in a very short time. In total I believe I've spent around 8 - 9 hours over the span of two days, documenting, testing and building the project. There are still some performance issues as the files gets bigger the system response time decreases considerable, the biggest file I tested was around `1,000,000` lines, it ran ok but the performance was considerable slow.
If I had more time I would definitely work in improve the algorithm to read and write the lines so the response time does not decrease dramatically as the file gets bigger, another point is to create a better way to handle the GET requests and some helper methods to pause/resume the requests if the system gets too busy or a single client ask too many times.
Here are some of the libraries/modules I use for this project:

- [highland - a high level stream library](https://www.npmjs.com/package/highland)
- [EventStream - to work with streams](https://github.com/dominictarr/event-stream)
- [through2 - a nodejs stream wrapper](https://github.com/rvagg/through2)
- [morgan - HTTP request logger](https://www.npmjs.com/package/morgan)
- [mocha - testing framework](https://mochajs.org/)
- [chai - assertion library](http://chaijs.com/)
- [supertest - good library to use with node to test HTTP requests](https://www.npmjs.com/package/supertest)
