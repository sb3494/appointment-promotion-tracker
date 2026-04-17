const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const schedule = require('node-schedule');

const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a sample table for appointments
db.serialize(() => {
  db.run(`CREATE TABLE appointments (id INTEGER PRIMARY KEY, time TEXT, description TEXT)`);
});

// Automated reminder job scheduling
schedule.scheduleJob('* * * * *', () => {
  console.log('Reminder job executed at ' + new Date().toISOString());
  // Here, you can add code to fetch appointments and send reminders
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});