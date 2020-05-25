//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require('path');
const _ = require("lodash");



const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'ejs');

let posts=[];


const homeStartingContent = "Welcome! Feel free to post anything what is going on your head. To access to an especific review, go head /posts/andthenameofthereview";
const aboutContent = "Hac habitasse platea dictumst ";
const contactContent = "Scelerisque eleifend donec pretium v";





app.get("/", function(req, res){

    res.render("home", {StartingContent: homeStartingContent, vector:posts });
    
    });

app.get("/post", function(req, res){
        res.render("review");
        
    });



    
app.post("/post", function(req, res){
  //si pongo .postBody guarda lo que se envia en el textarea
        
        
    const post={
    title:req.body.postTitle,
    text:req.body.postText
    };
    console.log(post.title);
 
  if(post.title==='' && post.text ===''){
    console.log("you cant do that");
  }
    
  else{
    posts.push(post);
        
    res.redirect("/");
  }
    


        
    });

   

    app.get("/posts/:postName", function(req, res){
      const requestedTitle =_.lowerCase(req.params.postName);
    
      posts.forEach(function(post){
        const storedTitle = _.lowerCase(post.title);
    
      if(storedTitle === requestedTitle){
        res.render("post", {
          title: post.title,
          content: post.text
        });
      }
    
    
      });
      });



app.listen(3000, ()=>{
    console.log("the server is running on port 3000");
})