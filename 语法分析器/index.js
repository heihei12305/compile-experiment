import { predictiveAnalysisTable,grammarReverse,operatorPrecedence } from './const.js'
import { up_down_func, down_up_func }  from './dom.js'


window.analytics_up_down = function(val){
  let res = [];
  res[0] = ['#E',val];
  let i = 0;
  while(val!=='#'){
    let resStr = res[i][0];
    let spec = res[i][1][0];
    let resLen = resStr.length;
    if(!/[A-Z]/.test(resStr[resLen-1])){
      let len = 0;
      while(!/[A-Z]/.test(resStr[resStr.length-1-len])){
        if(resStr[resStr.length-1-len] === res[i][1][len]){
          len++;
        }else{
          alert('报错😯报错😢，自上而下分析失败！');
          return ;
        }
      }
      i++;
      res[i] = [];
      res[i][0] = res[i-1][0].slice(0,resLen-len);
      res[i][1] = res[i-1][1].slice(len);
      val = res[i][1];
      continue;
    }
    if(predictiveAnalysisTable[resStr[resLen-1]].hasOwnProperty(spec))
    {
      let r = predictiveAnalysisTable[resStr[resLen-1]][spec];
      if(r === 'K'){
        r  = '';
      }
      i++;
      res[i] = []
      res[i][0] =  resStr.slice(0,resLen-1)+r;
      res[i][1] =  res[i-1][1];
    }else{
      alert('报错😯报错😢，自上而下分析失败！')
      return ;
    }

    if(i>10000){
      alert('报错😯报错😢，自下而上分析循环次数大于10000！');
      return ;
    }
    
  }
  while(res[i][0]!=='#'){
    let resStr = res[i][0];
    let resLen = resStr.length;
    let spec = '#';
    if(predictiveAnalysisTable[resStr[resLen-1]].hasOwnProperty(spec))
    {
      let r = predictiveAnalysisTable[resStr[resLen-1]][spec];
      if(r === 'K'){
        r  = '';
      }
      i++;
      res[i] = []
      res[i][0] =  resStr.slice(0,resLen-1)+r;
      res[i][1] =  res[i-1][1];
    }else{
      alert('报错😯报错😢，自上而下分析失败！')
      return ;
    }

    if(i>10000){
      alert('报错😯报错😢，自下而上分析循环次数大于10000！')
      return ;
    }
  }

  res = res.map((item)=>{
    item[0] = item[0].split('').join(' ');
    item[1] = item[1].split('').join(' ');
    return item;
  })

  res = res.map((item)=>{
    let s = item[0];
    s = s.replace(/G/g,"E'");
    s = s.replace(/H/g,"T'");
    item[0] = s;
    return item;
  })
  up_down_func(res);
}




window.analytics_down_up = function(val){
  //用于语义分析
  let newtemp = 100;
  let semanticAnalysisVec = [];
  let semanticAnalysis = [];
  function semanticAnalysisFunc(specStack){
    if(specStack==='i'){
      semanticAnalysisVec.push(100);
    }else if(specStack !== '('){
      let len = semanticAnalysisVec.length;
      if(len>2){
        let tmp = [specStack,semanticAnalysisVec[len-2],semanticAnalysisVec[len-1],++newtemp]
        semanticAnalysis.push(tmp);
        semanticAnalysisVec.slice(0,len-2);
        semanticAnalysisVec.push(newtemp);
      }else{
        alert('报错😯报错😢，语义分析失败！');
        return ;
      }
    }
  }
  
  let res = [];
  res[0] = ['#',val];
  let i = 0;
  while(val !== '#'){
    let resStr = res[i][0];
    let resStrRev = resStr.split('').reverse().join('');
    let specStack = resStrRev[resStrRev.search(/[a-z^*()+#]/)]
    let specInput = res[i][1][0];
    if(operatorPrecedence[specStack].hasOwnProperty(specInput))
    {
      i++;
      res[i] = [];
      if(operatorPrecedence[specStack][specInput]==='<'){
        res[i][0] = res[i-1][0] + specInput;
        res[i][1] = res[i-1][1].slice(1);
      }else{
        semanticAnalysisFunc(specStack)
        let change = grammarReverse[specStack];
        res[i][0] = res[i-1][0].slice(0,res[i-1][0].length-change[1]);
        res[i][1] = res[i-1][1].slice(change[2]);
        res[i][0] += change[0];
      }
      val = res[i][1];
    }else{
      alert('报错😯报错😢，自下而上分析失败！');
      return ;
    }

    if(i>10000){
      alert('报错😯报错😢，自下而上分析循环次数大于10000！')
      return ;
    }
  }
  while(res[i][0] !== '#E'){
    let resStr = res[i][0];
    let resStrRev = resStr.split('').reverse().join('');
    let specStack = resStrRev[resStrRev.search(/[a-z^*()+#]/)]
    operatorPrecedence[specStack]['#']!=='<' && semanticAnalysisFunc(specStack)
    let change = grammarReverse[specStack];
    i++;
    res[i] = []
    res[i][0] = resStr.slice(0,resStr.length-change[1]);
    res[i][1] = res[i-1][1].slice(change[2]);
    res[i][0] += change[0];
    if(i>10000){
      alert('报错😯报错😢，自下而上分析循环次数大于10000！')
      return ;
    }
  }

  console.clown?console.clown(semanticAnalysis):console.log(semanticAnalysis)

  res = res.map((item)=>{
    item[0] = item[0].split('').join(' ');
    item[1] = item[1].split('').join(' ');
    return item;
  })

  down_up_func(res);

}