const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

const books = [];

app.engine('hbs', expressHbs({ defaultLayout: 'main-layout', extname: 'hbs' }));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'Add Book' });
});

app.get('/books', (req, res, next) => {
  res.render('books', {
    pageTitle: 'Books',
    books: books,
    hasBooks: books.length > 0
  });
});

app.post('/add-book', (req, res, next) => {
  books.push({ name: req.body.bookname });
  res.redirect('/books');
});

app.listen(process.env.PORT || 3000);
