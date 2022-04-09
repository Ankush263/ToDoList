const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const _ = require('lodash')


app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.set('view engine', 'ejs')

mongoose.connect("mongodb+srv://Ankush1234:<password>@cluster0.3c3fb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/todolistDB")

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

const item3 = new Item({
  name: "Milk"
})

const defaultItems = [item1, item2, item3]

const ListSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", ListSchema)

app.get('/', (req, res) => {


  Item.find({}, (err, foundItems) => {
    
    if(foundItems.length === 0) {
      Item.insertMany(defaultItems, (err) => {
        if(err) {
          console.log(err)
        } else {
          console.log("Successfully Items saved in database")
        }
        res.redirect('/')
      })
    } else {
      res.render("index", {ListTitle: "Today", newListItems: foundItems})
    }
    
    
  })


})

app.post('/', (req, res) => {
  const itemName = req.body.newItem
  const listName = req.body.list

  const item = new Item ({
    name: itemName
  })

  if(listName === "Today") {
    item.save()

    res.redirect("/")
  } else {
    List.findOne({name: listName}, (err, foundList) => {
      foundList.items.push(item)
      foundList.save()
      res.redirect('/' + listName)
    })
  }

  
})

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

  if(listName === "Today") {
    Item.findByIdAndRemove(checkedItemId, (err) => {
      if(!err) {
        console.log("Successfully deleted checked item")
        res.redirect('/')
      }
    })
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, (err, foundList) => {
      if(!err) {
        res.redirect('/' + listName)
      }
    })
  }

})

app.get('/:customListName', (req, res) => {
  const customListName = _.capitalize(req.params.customListName)

  List.findOne({name: customListName}, (err, foundList) => {
    if(!err) {
      if(!foundList){

        const list = new List({
          name: customListName,
          items: defaultItems
        })
        
        list.save()
        res.redirect('/' + customListName)
      }
      else {
        res.render("index", {ListTitle: foundList.name, newListItems: foundList.items})
      }
    }
  })

  
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