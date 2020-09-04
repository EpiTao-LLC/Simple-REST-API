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

app.get("/articles", function (req,res) {

    Article.find({}, function(err, foundArticles) {
        console.log (foundArticles);
    });
});

//process.env.PORT is for heroku  5500 is local port

let port = process.env.PORT;

if (port == null || port == ""){
  port = 5500;
}

app.listen(port, function () {
  console.log ("Server started on port:  ", port);
});