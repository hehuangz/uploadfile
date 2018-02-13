//内置模块
const os=require("os")
const fs=require("fs")
const path=require("path")
const http=require("http")
//自写模块
const tool=require("./tool")

//服务器
const express=require("express")
const server=express()//创建一个服务器对象
server.engine(".html",require("ejs").__express)
server.set("view engine","html")
server.set("views",__dirname+"/view")

//中间件
const multer=require("multer")
const upload=multer({dest:"./uploadfile"})
var querystring = require("querystring")//用于解析中文

//函数功能：分页展示内容
server.use((req,res,next)=>{
    // console.log(req.url)
    if(req.url.indexOf(".")!==-1){
        //注意处理文字名有中文的情况，用querystring.unescape()不编译成16进制来处理
        res.sendFile(path.resolve(path.join('./uploadfile',querystring.unescape(req.url))))
    }else{
        next()
    }
})

server.get("/",(reg,res)=>{
    res.render("index",{files:fs.readdirSync("./uploadfile")})
})

//函数功能：分页展示内容
server.post("/upload",upload.single("file"),(req,res)=>{
    fs.rename(
        req.file.path,
        path.join(req.file.destination,req.file.originalname),
        (err)=>res.redirect('/')
    )
})

var port=8889
// const server=http.createServer(show)
server.listen(port,()=>{
    tool.openurl(tool.myurl(),port)
})
