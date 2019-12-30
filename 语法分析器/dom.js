export function up_down_func (arr){
  let tbody_up_down = document.createElement("tbody");
  let upDown = document.getElementById("up-down")
  let children = upDown.children;
  upDown.removeChild(children[1])
  upDown.appendChild(tbody_up_down);

  arr.forEach((item,index)=>{
    let tr = document.createElement("tr");
    tbody_up_down.appendChild(tr);

    let td0 = document.createElement("td");
    td0.innerText = index+1;

    let td1 = document.createElement("td");
    td1.innerText = item[0];

    let td2 = document.createElement("td");
    td2.innerText = item[1];

    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
  })
  
}

export function down_up_func (arr){
  let tbody_down_up = document.createElement("tbody");
  let upDown = document.getElementById("down-up")
  let children = upDown.children;
  upDown.removeChild(children[1])
  upDown.appendChild(tbody_down_up);

  arr.forEach((item,index)=>{
    let tr = document.createElement("tr");
    tbody_down_up.appendChild(tr);

    let td0 = document.createElement("td");
    td0.innerText = index+1;

    let td1 = document.createElement("td");
    td1.innerText = item[0];

    let td2 = document.createElement("td");
    td2.innerText = item[1];

    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)
  })
  
}