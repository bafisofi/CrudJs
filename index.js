/****************************/
/* VARIABLES */
/****************************/

let form = document.querySelector('.form');
let table= document.querySelector('.company__table');
let msg= document.querySelector('#message');
let company=document.querySelector("#company");
let contact=document.querySelector("#contact");
let country=document.querySelector("#country");
let email=document.querySelector("#email");
let phone=document.querySelector("#phone");
let header=document.querySelector(".header");
let modal=document.querySelector(".modal");
let newRow = document.querySelector('#content');
let action='add';
let currentRow;
 

/****************************/
/* MODAL */
/****************************/

let closeModal=()=>{
  
  msg.classList.remove("message")
  msg.innerHTML=" "
  resetForm();
  modal.classList.remove("modal__active")
  table.classList.remove("is-blurred");
  header.classList.remove("is-blurred");
}

let openModal=()=>{
  
  table.classList.add("is-blurred");
  header.classList.add("is-blurred");
  modal.classList.add("modal__active")
}

document.querySelector("#show-modal").addEventListener("click", openModal);

document.querySelector(".modal__close").addEventListener("click", closeModal)
document.querySelector(".btn--close").addEventListener("click",(e)=>{
  e.preventDefault();
  closeModal();
})


 /****************************/
/* FORM */
/****************************/

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  formValidation();
  if(company.value!=='' && (phone.value!=='' || email.value!=='')){
    if (action==='add'){
      acceptData();
    }
    if (action==='edit'){
    editTable();
  }
}
})


function resetForm() {
  const inputs = document.querySelectorAll('#company, #contact, #country, #phone, #email');

  inputs.forEach(input => {
    input.value = '';
  });
}


function printAlert(message) {
   
  msg.classList.add("message")
  msg.innerHTML = message;
  setTimeout(() => {
    msg.classList.remove("message")
    msg.innerHTML=" "
  }, 3000);
}

let formValidation =()=>{
  
  if(company.value===''){
    message="Company Name can not be blank"
    printAlert(message)
    return
  }
  if(phone.value==='' && email.value===''){
    message="Phone Number or Email can not be blank"
    printAlert(message)
    return
  } 
  
};


let data= {};
let arrData= []
let i=1;


let acceptData=() => {
  action='add';
  data["key"]=i;
  data["company"]=company.value
  data["contact"]=contact.value
  data["country"]=country.value
  data["phone"]=phone.value
  data["email"]=email.value
  i++;
  arrData.push(data)
  if(arrData.length===1){
    createHeading();
    table.createTBody();
  }
  createTable()
 }


 function createHeading(){
  let arrHeader = ["Company Name", "Contact Name", "Country", "Phone Number", "Email", "Actions"];
  let thead = table.createTHead();

  arrHeader.forEach((element,index) =>{
  thead.appendChild(document.createElement("th")).
  appendChild(document.createTextNode(arrHeader[index]));
  });

  }

 let createTable =() =>{
  let tableLength=table.rows.length;
  let newRow = table.getElementsByTagName('tbody')[0].insertRow(tableLength);
  newRow.insertCell(0).innerHTML = data["company"];
  newRow.insertCell(1).innerHTML = data["contact"];
  newRow.insertCell(2).innerHTML = data["country"];
  newRow.insertCell(3).innerHTML = data["phone"];
  newRow.insertCell(4).innerHTML = data["email"];
  newRow.insertCell(5).innerHTML = 
    `<div class="company__actions">
      <button onClick="editRow(this)" >Edit</button>
      <button id="#delete" onClick="deleteRow(this)" >Delete</button>
    </div>`;
  resetForm();
  closeModal();
} 

let deleteRow= (el)=> {
  if(!confirm("Are you sure you want to delete?")) return;
    let row = el.parentNode.parentNode.parentNode.rowIndex;
    table.deleteRow(row);
    const target = data["key"];
    const result = arrData.filter(element => element===target); 
    if(table.rows.length<=0){
      table.deleteTHead();
    }  
}

let editRow= (e)=> {
  action ='edit';
  openModal();
    currentRow = e.parentNode.parentNode.parentNode;
    company.value=currentRow.cells[0].innerHTML;
    contact.value= currentRow.cells[1].innerHTML;
    country.value=currentRow.cells[2].innerHTML;
    phone.value= currentRow.cells[3].innerHTML;
    email.value= currentRow.cells[4].innerHTML; 
}

let editTable =() =>{
  currentIndex =  currentRow.rowIndex;
  currentRow.cells[0].innerHTML = company.value;
  currentRow.cells[1].innerHTML = contact.value;
  currentRow.cells[2].innerHTML = country.value;
  currentRow.cells[3].innerHTML = phone.value;
  currentRow.cells[4].innerHTML = email.value;
  currentRow.cells[5].innerHTML = 
    `<div class="company__actions">
      <button onClick="editRow(this)" >Edit</button>
      <button id="#delete" onClick="deleteRow(this)" >Delete</button>
    </div>`;
  
  
  const target = data["key"]; 
  for (const obj of arrData) {
    if (obj.key === target) {
      data.company = company.value;
      data.contact = contact.value;
      data.country = country.value;
      data.phone = phone.value;
      data.email = email.value;
      break;
      }
    }  
  resetForm();
  closeModal();
 
}
   

 




