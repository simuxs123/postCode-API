class postCodes {
    searchPostCode(){
        press.addEventListener("click",()=>{
            postApi();
            reset();
        });
    }
    searchAddress(){
        press2.addEventListener("click",()=>{
            addressApi();
            reset();
        });
    }
}
const miestas   =document.querySelector("#miestas"),
      adresas   =document.querySelector("#adresas"),
      press     =document.querySelector("#press"),
      press2    =document.querySelector("#press2"),
      tbod      =document.querySelector(".tableBody"),
      postKodas =document.querySelector("#postKodas"),
      rasta     =document.querySelector(".rasta"),
      paieska   =new postCodes;


main();

function main(){
    paieska.searchPostCode();
    paieska.searchAddress();
}
async function postApi(){
    try {
        const adr=adresas.value,
              miest=miestas.value;
        let responsive=await fetch("https://postit.lt/data/v2/?city="+
        miest+"&limit=20&address="+adr+"&key=ds3iSsiRzeqhQNFJgBNy");
        let datas=await responsive.json();
        if(datas.status==="error")
            alert(datas.message);
        rasta.innerHTML="<h5>Rasta: "+datas.total+"</h5>";
        createFullList(datas.page.total,"",miest,adr);
    }
    catch(err){
        console.log(err);
    }
}
async function addressApi(){
    try {
        const postCode=postKodas.value;
        let responsive=await fetch("https://postit.lt/data/v2/?post_code="+postCode+"&limit=20&key=ds3iSsiRzeqhQNFJgBNy");
        let datas=await responsive.json();
        if(datas.status==="error")
            alert(datas.message);
        rasta.innerHTML="<h5>Rasta: "+datas.total+"</h5>";
        createFullList(datas.page.total,postCode,"","");
    }
    catch(err) {
        console.log(err);
    }
    
}
async function createFullList(pg,pkod, m, a){
    for(let i=0; i<pg;i++){
        responsive=await fetch("https://postit.lt/data/v2/?city="+
        m+"&limit=20&page="+(i+1)+"&address="+a+"&post_code="+pkod+"&key=ds3iSsiRzeqhQNFJgBNy");
        datas=await responsive.json()
        for(let j=0; j<datas.data.length; j++){
            let postData=[datas.data[j].post_code,datas.data[j].post,datas.data[j].address,datas.data[j].municipality];
            createTableTrAndTd(postData);
        }
    }
}
function createTableTrAndTd(info){
    let tr, td,text;
    tr=document.createElement("TR");
    for(let i=0; i<info.length; i++){      
        td=document.createElement("TD");
        text=document.createTextNode(info[i]);
        td.appendChild(text);
        tr.appendChild(td);
    }
    tbod.appendChild(tr);
}
function reset(){
    miestas.value="";
    adresas.value="";
    postKodas.value="";
    if(tbod.getElementsByTagName("tr").length>0){
        for(let i=tbod.getElementsByTagName("tr").length-1; i>=0;i--){
            tbod.deleteRow(i);
        }
            
    }
    
}


