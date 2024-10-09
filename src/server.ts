import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

const app = express();
const mongoUrl = 'mongodb://localhost:27017/my-session-db2'; // Replace with your MongoDB URL
//mongod --dbpath /path/to/dbdir --logpath /path/to/mongodb.log --fork
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Session configuration using MongoDB
app.use(session({
  secret: 'your-secret-key2', // Use a strong secret in production
  resave: false,             // Avoid resaving sessions that haven't changed
  saveUninitialized: false,  // Don't save uninitialized sessions
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24,  // 1 day session expiry
    secure: false                 // Set to true if using HTTPS
  },
  store: MongoStore.create({ 
    mongoUrl: mongoUrl,          // Use the MongoDB URL directly here
    collectionName: 'sessions',  // Optional, defaults to 'sessions'
  })
}));

// Example route to set a session value
app.get('/set-session', (req, res) => {
  req.session.username = 'JohnDoe'; // Set a session variable
  res.send('Session set for username');
});

// Example route to access session value
app.get('/get-session', (req, res) => {
  const username = req.session?.username;
  res.send(`Session Username: ${username}`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
