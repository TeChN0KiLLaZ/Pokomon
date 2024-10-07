// src/routes/auth.ts
import express, { Router, Request, Response } from 'express';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/passwordUtils';

const router = Router();  // Ensure you're using Router() correctly
router.use(express.static('public'));
// Register Route
router.post('/register-be', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password        
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login Route
router.post('/login-be', async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare passwords
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    req.session.username = user.username;
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
  ;
});

router.post('/logout',(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
          // If there is an error destroying the session, handle it
          console.log(err);
          return res.status(500).send('Something went wrong while logging out.');
        }
    
        // Clear the session cookie
        res.clearCookie('connect.sid');
    
        // Redirect the user to the login page (or homepage)
        res.redirect('/login');  
    })
})


// router.get('/', (req, res)=>{
//     res.send(`
//     <a href='./set-session'>set</a>
//     <a href='./get-session'>get</a>
//     <a href='./unset-session'>unset</a>
//     <br />
//     <a href='./rock'>rock</a>
//     <a href='./rock2'>rock2</a>
//     <br />
//     <a href='./login'>login</a>
//     <a href='./logout'>logout</a>
//     <a href='./register'>register</a>
//         `)
// })
router.get('/api/user', (req, res) => {
    console.log(req.session)
    if (req.session.username) {
      res.json({ username: req.session.username });
    } else {
      res.json({ username: null });
    }
  });
  
// Example route to set a session value
router.get('/register', (req, res) => {
    //   req.session.username = 'JohnDoe'; // Set a session variable
      res.send(`
        <form action="/register-be" method="POST">
          <label for="username">Name:</label>
          <input type="text" id="username" name="username" required>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <button type="submit">Submit</button>
        </form>
      `);
    });

router.get('/login', (req, res) => {
//   req.session.username = 'JohnDoe'; // Set a session variable
    res.send(`
    <form action="/login-be" method="POST">
        <label for="username">Name:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <button type="submit">Submit</button>
    </form>
    `);
});

// Example route to set a session value
router.get('/set-session', (req, res) => {
//   req.session.username = 'JohnDoe'; // Set a session variable
  res.send(`
    <form action="/submit-form" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <button type="submit">Submit</button>
    </form>
  `);
});



// router.get('/submit-form',(req,res)=>{
    
// Route for handling form submissions
router.post('/submit-form', (req, res) => {
    const { name } = req.body;
    req.session.username = name; 
    res.send(`Hello, ${name}!<br><a href='./'>home</a>`);
})

// Example route to access session value
router.get('/get-session', (req, res) => {
  const username = req.session?.username??'nameless';
  res.send(`Session Username: ${username}`);
});

router.get('/unset-session', (req,res)=>{
    delete req.session.username;
    res.send('deleted yo')
})


export default router;  // Ensure you're exporting the router correctly