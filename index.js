import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

let posts = [];

app.get("/", (req,res) => {
    res.render(__dirname + "/views/index.ejs", {posts : posts});
});

app.post("/create", (req, res) => {
    posts.push(
        {id : req.body["number"], title : req.body["title"], body : req.body["body"]}
    );
    res.render(__dirname + "/views/index.ejs", {posts : posts});
});


app.post("/check-edit", (req, res) => {
    const id = req.body["id"];
    const post = posts.find(p => p.id == id);
    if (post) {
        res.render(__dirname + "/views/edit.ejs", {post: post, posts: posts});
    } else {
        res.render(__dirname + "/views/index.ejs", {posts: posts}); 
    }
});

app.post("/edit", (req, res) => {
    const id = req.body["id"]; 
    const index = posts.findIndex(p => p.id == id);
    if (index !== -1) {
        posts[index] = {
            id: id,
            title: req.body["title"],
            body: req.body["body"]
        };
    }
    res.render(__dirname + "/views/index.ejs", {posts : posts});
});

app.post("/delete", (req, res) => {
    const deleteId = req.body["id"];
    posts = posts.filter(post => post.id !== deleteId);
    res.render(__dirname + "/views/index.ejs", {posts : posts});
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});