const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/status', (req, res) =>
  res.status(200).json({
    status: 'pass',
  })
);

app.get('/', (req, res) => res.status(200).send('bar'));

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
