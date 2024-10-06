import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route for displaying the form
app.get('/form', (req: Request, res: Response) => {
  res.send(`
    <form action="/submit-form" method="POST">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route for handling form submissions
app.post('/submit-form', (req: Request, res: Response) => {
  const { name } = req.body;
  res.send(`Hello, ${name}!`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${por t}`);
});
