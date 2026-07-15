const roles = [
"DevOps Engineer",
"Site Reliability Engineer",
"AWS Cloud Engineer",
"Kubernetes Engineer",
"Platform Engineer"
];

let i = 0;
let j = 0;
let deleting = false;

const typing = document.getElementById("typing");

function type(){

let text = roles[i];

typing.innerHTML = text.substring(0,j);

if(!deleting){

j++;

if(j>text.length){

deleting=true;

setTimeout(type,1200);

return;

}

}else{

j--;

if(j==0){

deleting=false;

i=(i+1)%roles.length;

}

}

setTimeout(type,deleting?50:120);

}

type();
