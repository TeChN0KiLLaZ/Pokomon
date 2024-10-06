import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth'


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
//sudo mongod --fork --logpath /var/log/mongodb.log --dbpath /var/lib/mongodb
const mongoUrl = 'mongodb://localhost:27017/my-session-db'; // Replace with your MongoDB URL
mongoose.connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Session configuration using MongoDB
app.use(session({
  secret: 'your-secret-key', // Use a strong secret in production
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
app.use('/', authRoutes);


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

