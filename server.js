const express = require('express');
const app = express();
const port = 3000;

app.get('/hello', (req, res) => {
  res.send('Hello World!')
  console.log('Hello World!');
})

app.get('/lisa', (req, res) => {
    res.send('lalisa!')
    console.log('lalisa!');
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})