var express = require('express');
var router = express.Router();

//can import code directly from file
var Posts = require('../db.json');
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{title:'Home',posts: Posts.posts});
});

/* GET all blog posts page. */
router.get('/posts', function(req, res, next) {
  res.render('posts', { title: 'Posts',posts: Posts.posts });
});


/* GET contact us page. */
router.get('/contact', function(req, res, next) {
  res.render('contact',{title:'Contact'});
});

/* GET sign in page. */
router.get('/signup', function(req, res, next) {
  res.render('signup',{title:'Sign In'});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login',{title:'Login'});
});

/* GET Edit Page. */
router.get('/edit/:id', function(req, res, next) {
  var id;
  var post = Posts.posts;

  for(var i = 0; i < post.length; i++){
    if(post[i].id == req.params.id){
      id = i;
    }
  }


  res.render('edit',{
    title:'Edit Page',
    posts : Posts.posts,
    id : id,
});
});

router.post("/edit/:id", function(req, res, next){
  console.log(req.params.id);
  request({
    url:"http://localhost:8000/posts/"+req.params.id,
    method:"PATCH",
    form:{
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    },
    function(error,response,body){
      res.render("index",{message:"successfully added"});
    }
  })
  res.redirect("/");
})

/* GET new post. */
router.get('/new', function(req, res, next) {
  res.render('new',{title:'New Post'});
});


/* GET delete post. */
router.get('/delete/:id', function(req, res, next) {
    request({
      url:"http://localhost:8000/posts/"+req.params.id,
      method:"DELETE",
      function(error,response,body){
        res.render("index",{message:"successfully added"});
      }
    })
    res.redirect("/");
});

/* GET view page. */
router.get('/view/:id', function(req, res, next) {
    request({
      url:"http://localhost:8000/posts/"+req.params.id,
      method:"GET",
    },  function(error,response,body){
        res.render("view", {posts:JSON.parse(body)});
    })
});


/* POST new page. */
router.post('/new', function(req, res, next) {
  // res.send(req.body)


// create variable to posts
let obj ={
  "title": req.body.title,
  "author": req.body.author,
  "datetime": req.body.datetime,
  "briefcontent": req.body.briefcontent,
  "content": req.body.content,

}
  //write logic that saves this data
  request.post({
    url:"http://localhost:8000/posts",
    body: obj,
    json: true
  }, function(error , response, body){
    //what to send when function has finished
    // res.redirect('/');
    res.redirect('/');
  });

  // console.log(req.body);
});

module.exports = router;
