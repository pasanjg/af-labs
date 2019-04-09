const os = require('os');
const fs = require('fs');
const fileName = __dirname + '/test.txt';
const http = require('http');

console.log('Architecture ' + os.arch());
console.log('CPUs ' + os.cpus().length);
console.log('OS ' + os.platform());

console.log('Hello world');

fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log(data.toString());
    }
});

const data = fs.readFileSync(fileName);
console.log(data.toString());

// Variables containing source and destination
const fileName2 = __dirname + '/test.txt';
const outFileName = __dirname + 'test-copy.txt';

// Create read stream and write stream from the source file and destination file respectively
const readStream = fs.createReadStream(fileName2);
const writeStream = fs.createWriteStream(outFileName);

// Pipe the read stream to write stream
readStream.pipe(writeStream);

// listen to the data event of the read stream and print the output
readStream.on('data', data => {
    console.log(data.toString());
});


// http.createServer((req, res) => {
//     res.setHeader('Content-Type', 'text/html');
//     res.write('<h1>Hello World</h1>');
//     res.end();
// }).listen(3000);


http.createServer((req, res) => {

    res.setHeader('Content-Type', 'text/html');

    switch (req.method) {
        case 'GET':
            res.write('<h1>Hello World</h1>');
            res.end();
            break;
        case 'POST':
            req.on('data', data => {
                res.write('<h1>Hello ' + data + '</h1>');
                res.end();
            });
            break;
    }

}).listen(3000, (err) => {
    console.log('Server is listening to port 3000')
});




