const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000



app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/todolistDB")

const itemsSchema = {
  name: String
}

const Item = mongoose.model('Item', itemsSchema)

const item1 = new Item({
  name: "Chicken"
})

const item2 = new Item({
  name: "Paneer"
})

const Item3 = new Item({
  name: "Milk"
})

app.get('/', (req, res) => {

  res.render("index", {ListTitle: "Today", newListItems: items})

})

app.post('/', (req, res) => {
  let item = req.body.newItem

  if(req.body.list === "Work") {
    workItems.push(item)
    res.redirect("/work")
  }else {
    items.push(item)
    res.redirect("/")
  }

  
  res.redirect('/')

})

app.get('/work', (req, res) => {
  res.render('index', {ListTitle: "Work List", newListItems: workItems})
})

app.post('/work', (req, res) => {
  let item = req.body.newItem
  workItems.push(item)
  res.redirect("/work")
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.listen(port, () => {
  console.log("You are listening to the port 3000")
})