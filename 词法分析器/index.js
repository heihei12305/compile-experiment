var fs = require("fs")
var basicData = require("./const")

let kindCode = basicData.kindCode;
fs.readFile('词法分析器/source.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    //去除/n
    data = data.toString().replace(/\n/g,' ');
    //将 ‘;’ 变为‘ ; ’  并分隔开 并除去无效空格
    data = data.replace(/;/g,' ; ').split(' ').filter((item)=>item!=='');
    
    let binary = [];
    data.forEach((item)=>{
        let tmp = [];
        if(kindCode.hasOwnProperty(item)){
            tmp[0] = kindCode[item];
            tmp[1] = '-';
        }else{
            if(!Number.isNaN(Number(item))){
                tmp[0] = kindCode['int-const'];
                //转化为二进制
                tmp[1] = parseInt(item).toString(2)
            }else{
                tmp[0] = kindCode['char-const'];
                tmp[1] = item;
            }
        }
        binary.push(tmp);
    })

    console.log(binary);
 });

