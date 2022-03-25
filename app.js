const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

let items = ["Buy food", "Cook food", "Eat food"]
let workItems = []

app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  let today = new Date()
  let currentDate = today.getDay()
  let day = ""
  
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };

  day = today.toLocaleDateString('en-US', options)


  res.render("list", {ListTitle: day, newListItems: items})

})

app.post('/', (req, res) => {
  let item = req.body.newItem

  items.push(item)
  
  res.redirect('/')

})

app.get('/work', (req, res) => {
  res.render('list', {ListTitle: "Work List", newListItems: workItems})
})

app.post('/work', (req, res) => {
  let item = req.body.newItem
  workItems.push(item)
  res.redirect("/work")
})

app.listen(port, () => {
  console.log("You are listening to the port 3000")
})