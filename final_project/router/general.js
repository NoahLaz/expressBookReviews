const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', async function (req, res) {
  try {
    await res.send(JSON.stringify(books, null, 3));
  } catch (error) {
    console.log(error)
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    await res.send(books[isbn]);
  } catch (error) {
    console.log(error)
  }
 });
  
// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  //Write your code here
  const author = req.params.author;
  try {
    for (const key in books) {
      if (books[key].author === author) {
        res.send(books[key]);
      }
    }
    res.send({ message: 'author not found' });

  } catch (error) {
    console.log(error)
  }

});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  for (const key in books) {
    if (books[key].title === title) {
      res.send(books[key]);
    }
  }
  res.send({ message: 'title not found' });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
