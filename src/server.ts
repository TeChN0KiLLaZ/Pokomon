import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Serve static HTML files (for the form)
app.use(express.static('public'));

// Route to handle form submission via GET
app.get('/submit-form', (req: Request, res: Response) => {
    // Access query parameters from the request object
    const { name, email } = req.query;

    // Simple response back with the submitted data
    res.send(`Received form submission: Name - ${name}, Email - ${email}`);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
