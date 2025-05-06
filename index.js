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



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  // Jika tidak ada parameter, pakai tanggal saat ini
  if (!dateParam) {
    date = new Date();
  } 
  // Jika semua karakter angka (Unix timestamp dalam milidetik atau detik)
  else if (/^\d+$/.test(dateParam)) {
    // Jika panjang angka hanya 10 digit, berarti detik, ubah ke milidetik
    date = new Date(dateParam.length === 10 ? parseInt(dateParam) * 1000 : parseInt(dateParam));
  } 
  // Jika string tanggal (misalnya "2015-12-25")
  else {
    date = new Date(dateParam);
  }

  // Cek validitas tanggal
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
