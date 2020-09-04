//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");
const mongoose = require ("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);

mongoose.connect("mongodb://localhost:2m7017/wikiDB", { useNewUrlParser: true });

// Article.find({}, function(err, articles) {
//     console.log (articles);
// });


app.route("/articles")

    .get(function (req, res) {
        Article.find({title: req.params.title}, function(err, foundArticles) {
            if(!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })

    .post(function(req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save(function(err){
            if (!err) {
                res.send("Successfully added new article.");
            } else {
                res.send(err);
            }
        });
    })

    .delete(function(req, res){
        Article.deleteMany(function(err) {
            if (!err) {
                res.send("Succeessfully deleted all articles.");
            } else {
                res.send(err);
            }
        })
    });


//process.env.PORT is for heroku  5500 is local port

let port = process.env.PORT;

if (port == null || port == ""){
  port = 5500;
}

app.listen(port, function () {
  console.log ("Server started on port:  ", port);
});