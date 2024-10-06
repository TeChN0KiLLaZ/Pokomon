import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';

const app = express();
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

app.get('/', (req, res)=>{
    res.send(`
    <a href='./set-session'>set</a>
    <a href='./get-session'>get</a>
    <a href='./unset-session'>unset</a>
        `)
})

// Example route to set a session value
app.get('/set-session', (req, res) => {
//   req.session.username = 'JohnDoe'; // Set a session variable
  res.send(`
    <form action="/submit-form" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <button type="submit">Submit</button>
    </form>
  `);
  res.send('Session set for username');
});

app.get('/submit-form',(req,res)=>{
    req.session.username = 
})

// Example route to access session value
app.get('/get-session', (req, res) => {
  const username = req.session?.username??'nameless';
  res.send(`Session Username: ${username}`);
});

app.get('/unset-session', (req,res)=>{
    delete req.session.username;
    res.send('deleted yo')
})

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
