const express=require("express");
const path=require("path");
const port=8080;
const app=express();
const {v4:uuidv4}=require("uuid");
const methodOverride=require("method-override");

//parse data ko samajhne k liye-urlencoded or json
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

//setting paths so that node can find these directories while runnig from outside the  main folder
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));


let data=[
    {
        id:uuidv4(),
        username: "Sapna",
        content: "Built a full-stack interview portal with custom slot booking.✨"
    },
    {
        id:uuidv4(),
        username: "Sapna",
        content: "Deployed my Node.js app locally — next up: hosting it live!😎"
    }
]

app.get("/post",(req,res)=>{
    res.render("index.ejs",{data});
})

app.post("/post",(req,res)=>{
    const { username, content } = req.body;
    let id= uuidv4();
    data.push({ id, username, content}); // add to array
    res.redirect(302,"/post");
})

app.get("/post/new",(req,res)=>{
    res.render("addNew.ejs");
})

app.get("/post/:id",(req,res)=>{
    let id=req.params.id;
    let post=data.find((item)=>id===item.id);
    res.render("post.ejs",{post});
})

app.delete("/post/:id/delete",(req,res)=>{
    let {id}=req.params;
    data=data.filter((item)=>item.id!==id);
    res.redirect("/post");
})

app.get("/post/:id/edit", (req,res)=>{
    let {id}=req.params;
    let post=data.find((item)=>id===item.id);
    res.render("edit.ejs",{post})
})

app.patch("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=data.find((item)=>id===item.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/post")
})

app.listen(port,()=>{
    console.log("listening on port 8080");
})

