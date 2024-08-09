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
  console.log('Received case data:', caseData);  // Log the case data
  
  // Add an id to each case
  const newCase = { id: generateUniqueId(), ...caseData };
  cases.push(newCase);
  
  res.send({ message: 'Case sent to police', caseId: newCase.id });
});

app.get('/cases', (req, res) => {
  res.send(cases);
});

// Endpoint to notify user (you'll need to implement the notification logic)
app.post('/notify-user', (req, res) => {
  const { caseId } = req.body;
  console.log('Notify user about FIR registration for caseId:', caseId);
  res.send({ message: 'User notified' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}
