const express = require("express"); 
const app       = express();
const mongoose  = require("mongoose");
bodyParser	= require('body-parser');
const dotenv = require("dotenv"); 
const ejs   = require("ejs");


dotenv.config(); 
mongoose.connect(process.env.DATABASEURL, {useUnifiedTopology: true,  useNewUrlParser: true}, () => console.log("DB Connected!")); 

app.set("view engine", "ejs");        
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); 
const PORT = process.env.PORT || 9000;

// Mongooose  / Model configuration
let userSchema = new mongoose.Schema({
    email: "String"
});
let User = mongoose.model("User", userSchema); 

app.get('/', (req, res) =>{
    res.render("index"); 
})

// RESTful Routes
// Index route

app.get("/users", (req, res) =>{
  res.render("show")
    User.find()
    .then( function(users) {
        res.render("index", {users: users})
    })  
    .catch( function(err){
        res.send(err)
        console.log(err)
    })
  });


  app.post("/users", (req, res) => {

      const entry = {
          email: req.body.email
        }; 

    User.create(entry)
    .then( function(entry) {
        res.redirect("/users")
        console.log(entry) 
        
    })
    .catch( function(err) {
        res.send(err); 
    }) 
  })



app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
