//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const res = require("express/lib/response");
const _ = require("lodash")
const app = express();

// Mongoose setup
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://kelvindelvin:blogwebapp123@cluster0-blogwebapp.5apffpg.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});

// App setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Data base setup


//const posts = []
// App schema
const postSchema = {
  title : String,
  content : String
}
// App model
const postModel = mongoose.model("Post",postSchema)

// Home

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

app.get("/",(req,res)=>{
  postModel.find({},(err,posts)=>{
    if(err){
      console.log(err)
    }else{
      res.render("home",{home : homeStartingContent, posts: posts})
    }
  })
})

// about
app.get("/about",(req,res)=>{
  res.render("about",{about : aboutContent})
})

// contact
app.get("/contact",(req,res)=>{
  res.render("contact",{contact : contactContent})
})

//compose
app.get("/compose",(req,res)=>{
  res.render("compose")
})

//routing ***IN PROGRESS***
app.get("/posts/:postID",(req,res)=>{
  const postID = req.params.postID
  postModel.findOne({_id: postID},(err,foundPost)=>{
    res.render("post",{title : foundPost.title, content : foundPost.content})
  })
})

//posting
app.post("/compose",(req,res)=>{
  const post = new postModel({
    title : req.body.postTitle,
    content : req.body.postContent
  })
  post.save()
  res.redirect("/")
})

// Listen 
app.listen(process.env.PORT);
// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 8000;
// }
// app.listen(port);

// app.listen(port, ()=> {
//   console.log("Server started on host");
// });
