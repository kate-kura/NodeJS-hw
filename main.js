const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let expenses = [];
let dailyLimit = null;

app.post('/expenses', (req, res) => {
  const { name, amount, date, category } = req.body;
  if (!name || !amount || !date) {
    return res.status(400).send('Name, amount and date are required');
  }
  const expense = { name, amount, date: new Date(date), category };
  expenses.push(expense);
  res.send(expense);
});

app.get('/expenses', (req, res) => {
  res.send(expenses);
});

app.post('/expenses/search', (req, res) => {
  const { date } = req.body;
  if (!date) {
    return res.status(400).send('Date is required');
  }
  const filteredExpenses = expenses.filter(expense =>
    expense.date.toDateString() === new Date(date).toDateString()
  );
  res.send(filteredExpenses);
});

app.post('/daily-limit', (req, res) => {
  const { limit } = req.body;
  if (!limit) {
    return res.status(400).send('Limit is required');
  }
  dailyLimit = limit;
  res.send({ limit: dailyLimit });
});

app.get('/daily-limit', (req, res) => {
  res.send({ limit: dailyLimit });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
