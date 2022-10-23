const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect(
  "mongodb+srv://giabao032002:susu0404@cluster0.6kz6xww.mongodb.net/?retryWrites=true&w=majority", 
  (e) => {
    if (!e) return console.log("Connected database");
    else return console.log("Unconnected database");
  }
);

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})