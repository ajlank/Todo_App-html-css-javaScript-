const container=document.querySelector(".container");
const form=document.querySelector(".todo-form");
const inputtodo=document.getElementById("inputtodo");
const button=document.getElementById("#addtodobtn");
const lists=document.querySelector(".lists");
const para=document.getElementById("para");
//getting input value and adding todo
const createtodo=(todoId,todovalue)=>{
 const todoelement=document.createElement("li");
 todoelement.classList.add("lists-style");
 todoelement.classList.add("cl-style");
 todoelement.id=todoId;
 todoelement.innerHTML=`
   <span> ${todovalue}</span>
   <span><button id="deletebtn"><i class="fa fa-trash"></i></button></span>
 `;
 lists.appendChild(todoelement);
 const deletebtn=todoelement.querySelector("#deletebtn");
 deletebtn.addEventListener("click",function(event){
   const selectedtodo=event.target.parentElement.parentElement.parentElement;
   lists.removeChild(selectedtodo);
   showMessage("todo is deleted","danger");
 });
  const todoid=selectedtodo.id;
  const todos=getTodosFromlocalStorage();
  todos=todos.filter((todo)=>todo.todoId !==todoid);
  localStorage.setItem("mytodos",JSON.stringify(todos));
}
const showMessage=(text,status)=>{
  para.textContent=text;
 para.classList.add(`bg-${status}`);
 setTimeout(()=>{
  para.textContent="";
  para.classList.remove(`bg-${status}`);
 },1000)
}
const getTodosFromlocalStorage=()=>{
  return localStorage.getItem("mytodos") ?
  JSON.parse(localStorage.getItem("mytodos")) : [];
}

const addtodo=(event)=>{
    event.preventDefault();
    const todovalue=inputtodo.value;
    const todoId=Date.now().toString();
    createtodo(todoId,todovalue);
    showMessage("todo is created","success");
    const todos=getTodosFromlocalStorage();
    todos.push({todoId,todovalue});
    localStorage.setItem("mytodos",JSON.stringify(todos));
}
const loadtodos=()=>{
 const todos=getTodosFromlocalStorage();
 todos.map((todo)=>createtodo(todo.todoId,todo.todoValue));
}
form.addEventListener("submit",addtodo);
window.addEventListener("DOMContentLoader",loadtodos)