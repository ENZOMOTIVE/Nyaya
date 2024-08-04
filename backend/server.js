// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let cases = [];

app.post('/send-case', (req, res) => {
  const caseData = req.body;
  cases.push(caseData);
  res.send({ message: 'Case sent to police' });
});

app.get('/cases', (req, res) => {
  res.send(cases);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
