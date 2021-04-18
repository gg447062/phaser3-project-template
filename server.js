const express = require('express');
const path = require('path');

const app = express();

const DIST_DIR = path.join(__dirname, '/dist');
const HTML = path.join(DIST_DIR, 'index.html');

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
  res.send(HTML);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`serving it up on port ${PORT}`);
});
