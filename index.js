const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

app.get('/echo', (req, res) =>
  res.set('Content-Type', 'text/plain').send(req.query.s)
);
app.get('/shuffle', (req, res) =>
  axios.get(req.query.url).then(response => {
    const lines = response.data.split(/\r?\n/);
    shuffle(lines);
    res.set('Content-Type', 'text/plain').send(lines.join('\r\n'));
  })
);

app.listen(port, () => console.log(`Express app listening on port ${port}.`));
