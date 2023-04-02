//hero div
let hero=document.createElement("h1");
hero.className="hero";
hero.innerText="The Rick and Morty";


//create container and row
let container=document.createElement("div");
let row=document.createElement("div");

//set class name
container.className="container";
row.className="row";

//append 
container.append(row);


//create container
let pagination_containre = document.createElement("div");
pagination_containre.className = "pg_container";


//create previous page
let previous = document.createElement("div");
previous.className = "previous";
previous.innerText = "<<";
pagination_containre.append(previous);


//create next page
let next = document.createElement("div");
next.className = "next";


//container for number
let num_container = document.createElement("div");
num_container.className = "num_container";
pagination_containre.append(num_container)

let count=1;//counting the next and previous


//page value
let page_value=1;


//create page number box
function pagination_function(page) {
    num_container.innerText="";

    //display for previous and next
    if (page == 1) {
        previous.style.display = "none";
    } else {
        previous.style.display = "block";
    }


    if (page == 11) {
        next.style.display = "none";
    }else {
        next.style.display = "block";
    }

    for(let i=(1+(4*(count-1)));i<=(4*count);i++){

        if(i<=42){
            let num = document.createElement("div");
            num.className = "num";
            num.innerText = i;
            num.setAttribute("id",i);
            num.addEventListener("click",()=>{page_value=num.innerText;pagination_function(count);pg_heighligh(page_value);fetch_data(page_value);});
            num_container.append(num);
        }
    }
}

pagination_function(count);

//to highligh the fist page number onload
window.addEventListener("load", function() {
    pg_heighligh(((1+(4*(count-1)))))
    fetch_data((1+(4*(count-1))));
  });
  

//event listner for previous and next
previous.addEventListener("click",()=>{count=count-1;pagination_function(count);pg_heighligh((1+(4*(count-1))));fetch_data((1+(4*(count-1))))});
next.addEventListener("click",()=>{count=count+1;pagination_function(count);pg_heighligh((1+(4*(count-1))));fetch_data((1+(4*(count-1))));});

//page highliting
function pg_heighligh(pagevalue){
    let number_box=document.getElementById(pagevalue);
number_box.style.backgroundColor="red";
}

next.innerText = ">>";
pagination_containre.append(next);


//the main function
async function fetch_data(pagevalue){
    //clear row
    row.innerText="";
try{
    //fetch data
    let respoce=await fetch(`https://rickandmortyapi.com/api/character?page=${pagevalue}`);
    let result=await respoce.json();
    result=result.results;

    
    //create col 
for(let i=0;i<result.length;i++){

    //create col
    let col=document.createElement("div");
    


    //dead or alive
    let dot="blue";
    if(result[i].status=="Alive"){
        dot="lawngreen";
    }else{
        dot="red";
    }


    //set class name
    col.classList.add("col-md-6");

    //inner value
    col.innerHTML+=`
    <div class="card1" >
    <div class="left">
  <img class="card-img-top" src="${result[i].image}" alt="Card image cap">
  </div>
  <div class="card-body">
    <h1 class="name">${result[i].name}</h1>
    <div class="status"><span style="color:${dot}">•</span> ${result[i].status}-${result[i].species}</div>
    <div class="label">First seen in:</div>
    <div>${result[i].origin.name}</div>
    <div class="label">Last known location:</div>
    <div>${result[i].location.name}</div>
  </div>
</div>
    `;

    //append col
    row.append(col);

}
}
catch(error){
    console.log(error);
    alert(error);
}
    
    
}

//fetch_data(1);

document.body.append(hero,pagination_containre,container);