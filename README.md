> ### 应对极简编译实验

<br/>

* #### 词法分析

获取文件填表即可，核心代码：

```
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


```
* #### 语法分析

  * 自上而下语法分析
  * 自下而上语法分析

  采用html简单网页形式进行互动。
  
  网页链接：[https://heihei12305.github.io/compile-experiment/%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90%E5%99%A8/index.html](https://heihei12305.github.io/compile-experiment/%E8%AF%AD%E6%B3%95%E5%88%86%E6%9E%90%E5%99%A8/index.html)


* #### 语义分析

耦合在自下而上语法分析中，在console.log中显示，值得一一提的是本次还把console.log定制了一下呢！可打开上述网站，使用自下而上语法分析，打开console查看
