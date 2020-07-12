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
    res.redirect("/users"); 
})

// RESTful Routes
// Index route

app.get("/users", (req, res) =>{
    User.find()
    .then( function(users) {
        res.render("index", {users: users})
    })  
    .catch( function(err){
        res.send(err)
        console.log(err)
    })
  });


//   app.get("/users", (req, res) =>{
//     User.find({}, (err, users) =>{
//         if(err){
//             console.log("big fuck up")
//         } else{
//             res.render("index", {users: users})
//         }
//     }); 
// });


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

  
//   app.post("/users", (req, res) =>{
//     User.create(req.body.user, (err, newUser) =>{
//         if(err){
//             res.send(err)
//         } else{
//             res.redirect("/users")
//             console.log(newUser) 
//         }
//     }); 
// });


app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`);
});
