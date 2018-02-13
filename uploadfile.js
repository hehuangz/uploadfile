//上传文件升级版
//内置模块
const os=require("os")
const fs=require("fs")
const path=require("path")
const http=require("http")
//自写模块
const tool=require("./tool")
let root=path.join(os.homedir(),"Desktop")
// console.log(__dirname)
//服务器
const express=require("express")
const server=express()//创建一个服务器对象
server.engine(".html",require("ejs").__express)
server.set("view engine","html")
server.set("views",__dirname+"/view")

//创建uploadfile文件夹
var rootPath=path.join(root,"uploadfile")
if(!fs.existsSync(rootPath)){
    fs.mkdir(rootPath)
}

//中间件
const multer=require("multer")
const upload=multer({dest:rootPath})//保存文件的路径
var querystring = require("querystring")//用于解析中文

//请求资源时
server.use((req,res,next)=>{
    // console.log(req.url)
    if(req.url.indexOf(".")!==-1){
        //注意处理文字名有中文的情况，用querystring.unescape()不编译成16进制来处理
        res.sendFile(path.join(rootPath,querystring.unescape(req.url)))
    }else{
        next()
    }
})
//请求主页
server.get("/",(reg,res)=>{
    res.render("index",{files:fs.readdirSync(rootPath)})
})

//上传文件时
console.log(1)
server.post("/upload",upload.single("file"),(req,res)=>{
    console.log(req.file)
    fs.rename(
        req.file.path,
        path.join(req.file.destination,req.file.originalname),
        (err)=>res.redirect('/')
    )
})

var port=8889
server.listen(port,()=>{
    tool.openurl(tool.myurl(),port)
})
