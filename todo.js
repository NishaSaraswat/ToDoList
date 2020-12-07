

//selectors
let mainDiv = document.querySelector(".main");
let input = document.querySelector("input");
let doneTaskUl = document.querySelector(".doneTasks");
let doneTaskDiv = document.querySelector(".doneDiv");
document.querySelector("form").addEventListener("submit",submitForm);
document.querySelector("ul").addEventListener("click",handlingButtonEvents);
doneTaskUl.addEventListener("click",handlingButtonEvents);
let errorMessages = "";
let errors = document.querySelector(".errors");


// Error Class
class Validators{

    formValidation(){
        errorMessages += "*Vänligen ange en uppgift";
        errors.innerHTML = errorMessages;
    }
    //button Error functions
    editButtonValidation(){
        errorMessages += "*Du kan redigera och spara uppgiften men kan inte lämna den tom";
        errors.innerHTML = errorMessages;
        
    }
    doneButtonValidation(){
        errorMessages += "*Vänligen spara uppgiften först";
        errors.innerHTML = errorMessages;

    }
    removeErrorMessage(){
        errorMessages = "";
        errors.innerHTML = errorMessages;
    }
}

//Helper Class constructing todo list items 
    class Helper{
        addToDo(todo){
        let ul = document.querySelector("ul");
        let todoList = document.createElement("li");
        todoList.classList.add("to-do-list");

        todoList.innerHTML = `<input type = "text" id="todo-item" disabled = "true" value = "${todo}"></input>
            <button type="button" id = "editButton"><text>Ändra</text></button>
            <button  type= "button" id = "doneButton"><text>Färdig</text></button>
            <button  type= "button" id = "deleteButton">Radera</button>`;
        

        ul.appendChild(todoList);
    }
}
let listMaker = new Helper();

let validation = new Validators();

//Start function
    function submitForm(e){
        e.preventDefault(); 
        if(input.value.trim() != ""){
            validation.removeErrorMessage();
            listMaker.addToDo(input.value); 
            input.value = "";
        
    }else {
        validation.removeErrorMessage();
        validation.formValidation();      
    }
}


//Class to handle Button Events
class ButtonsEvents{
    editTask(e){
        let item = e.target.parentNode;
    
        if(item.firstElementChild.disabled == true){
        item.firstElementChild.disabled = false;
        item.querySelector("text").innerHTML = "Spara";
    }else{
        item.firstElementChild.disabled = true;
        item.querySelector("text").innerHTML = "Ändra";
        validation.removeErrorMessage(); 
    }
    if(item.firstElementChild.value.trim() == ""){
        validation.editButtonValidation();        
        item.firstElementChild.disabled = false;
        item.querySelector("text").innerHTML = "Spara";
    }
        
    }
    doneTask(e){
        let item = e.target.parentNode;

        if(item.querySelector("text").innerHTML == "Spara" ){
            
            validation.removeErrorMessage(); 
            validation.doneButtonValidation();
        } else{
            let completedTaskList = document.createElement("li");
            completedTaskList.classList.add("done-List");
            completedTaskList.appendChild(item.querySelector("#todo-item"));
            completedTaskList.appendChild(item.querySelector("#editButton"));
            completedTaskList.appendChild(item.querySelector("#deleteButton"));
            //append all
            doneTaskUl.appendChild(completedTaskList);
            doneTaskDiv.appendChild(doneTaskUl);
            item.remove();
        }
    }
    deleteTask(e){
    let item = e.target.parentNode;
    item.remove();
    validation.removeErrorMessage();
    }
    }

    let buttonEvents = new ButtonsEvents();
    
    //functions to Edit tasks
    function handlingButtonEvents(e){
    let task = e.target;
    if(task.id == "editButton"){
        buttonEvents.editTask(e);
    }
    if(task.id == "doneButton"){
        buttonEvents.doneTask(e);
        
    }
    if(task.id == "deleteButton"){
        buttonEvents.deleteTask(e);   
    }   
}





