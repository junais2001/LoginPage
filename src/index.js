// importing requirements for the code like libaries

const express = require("express");
const app = express();

const path = require("path");
const hbs = require("hbs");
const templatePath = path.join(__dirname, "../templates");
const collection = require("./mongodb");
const { cp } = require("fs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../styles")));
app.use(express.json());

app.set("view engine", "hbs");
app.set("views", templatePath);

// api creation
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    username: req.body.username,
    password: req.body.password,
  };
  await collection.insertMany([data]);
  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ username: req.body.username });
    if (check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("invalid password");
    }
  } catch {
    res.send("invalid details");
  }
});


// Task 8: Add/Modify a book review
app.post('/books/:id/review', (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  const existingReview = reviews.find(r => r.bookId == id);

  if (existingReview) {
    existingReview.review = review;
    res.status(200).json({ message: 'Review updated', review: existingReview });
  } else {
    reviews.push({ bookId: id, review });
    res.status(201).json({ message: 'Review added', review: { bookId: id, review } });
  }
});


// setting the port and port number
const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log("the server is running !");
});

// Task 9: Delete book review
app.delete('/books/:id/review', (req, res) => {
  const { id } = req.params;
  const reviewIndex = reviews.findIndex(r => r.bookId == id);

  if (reviewIndex !== -1) {
    reviews.splice(reviewIndex, 1);
    res.status(200).json({ message: 'Review deleted' });
  } else {
    res.status(404).json({ message: 'No review found for this book' });
  }
});

const axios = require('axios');

// Task 10: Get all books using async/await
app.get('/async/books', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3003/books'); // Simulating external API call
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error });
  }
});

// Task 11: Search by ISBN using Promises
app.get('/promise/books/isbn/:isbn', (req, res) => {
  const { isbn } = req.params;

  axios.get(`http://localhost:3003/books/isbn/${isbn}`)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(404).json({ message: 'Book not found', error });
    });
});

// Task 12: Search by Author using async/await
app.get('/async/books/author/:author', async (req, res) => {
  const { author } = req.params;

  try {
    const response = await axios.get(`http://localhost:3003/books/author/${author}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(404).json({ message: 'No books found by this author', error });
  }
});
// Task 13: Search by Title using Promises
app.get('/promise/books/title/:title', (req, res) => {
  const { title } = req.params;

  axios.get(`http://localhost:3003/books/title/${title}`)
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(error => {
      res.status(404).json({ message: 'Book not found by this title', error });
    });
});
