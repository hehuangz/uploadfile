
//将网络这块功能单独拿出来
//函数功能：找到本地的ip地址
const os=require("os")
var myurl=()=>{
    var info=os.networkInterfaces()
    let address=""
    let flag=true
    for(let i in info){//遍历对象
        if(flag){
            if(info[i]){
                var arr=info[i].filter(val=>val.family==="IPv4");
                if(arr[0]){
                    address=arr[0].address
                    flag=false
                }
            }
        }
    }
    return address
}
//函数功能：自动打开网页
var openurl=(url,port)=>{
    const child_process=require("child_process")
    let way=os.platform()=="win32"?"explorer":"open"
    let link="http://" +url+":"+port
    //定义网页中内容
    child_process.spawnSync(way,[link])//打开
}
module.exports={myurl,openurl}