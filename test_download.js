const http = require('http');

const noteId = "6a4b8dabec6a7b40184a1731";
const options = {
  hostname: 'localhost',
  port: 8080,
  path: `/download/${noteId}?force=true`,
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers, null, 2)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    // console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
