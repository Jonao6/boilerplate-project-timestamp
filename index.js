// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api", (req, res) => {
  let date = new Date()
  
  let result = {
    unix: date.getTime(),
    uct: date.toUTCString()
  }
  res.send(result)
})

app.get('/api/:date', (req, res) => {
  const { date } = req.params;
  let result = {};

  if (!date) {
    const currentTime = new Date();
    result.utc = currentTime.toUTCString();
    result.unix = currentTime.getTime();
  } else if (/^\d+$/.test(date)) {
    const timestamp = parseInt(date);
    result.unix = timestamp;
    result.utc = new Date(timestamp).toUTCString();
  } else {
    const parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      result.unix = parsedDate.getTime();
      result.utc = parsedDate.toUTCString();
    } else {
      result.error = 'Invalid Date';
    }
  }
  if (result.error) {
    res.status(400).json(result);
  } else {
    res.json(result);
  }
});
