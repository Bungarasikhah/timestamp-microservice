const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  let date;

  // If no date provided, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if it's a timestamp (only digits)
    if (/^\d+$/.test(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Check for invalid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
