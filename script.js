const toDoList = document.getElementById("toDoList");
const toDoInput = document.getElementById("toDoInput");
const addButton = document.getElementById("addButton");
const masterList = document.getElementById("masterList");

//localStorage.clear();

//retrieve task list from json, if empty then empty array
let toDoObject = JSON.parse(localStorage.getItem("tasks")) || [];

//check for each element in toDoOject, retrieve task name and checked state. Add all tasks to html list
for (let x in toDoObject) {
    //console.log(toDoObject[x].task);
    addToList(toDoObject[x].task, toDoObject[x].checked, false);
}

//on button click
addButton.addEventListener("click", function(){
    let toDoString = toDoInput.value;
    toDoString.trim();
    if(toDoString.trim().length > 0){
        addToList(toDoInput.value, false, true);
        toDoInput.value = "";
    } else {
        toDoInput.value = "";
    }
});

//on submit enter keypress
toDoInput.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        let toDoString = toDoInput.value;
        toDoString.trim();
        if(toDoString.trim().length > 0){
            addToList(toDoInput.value, false, true);
            toDoInput.value = "";
        } else {
            toDoInput.value = "";
        }
    }
});

function addToList(taskValue, taskChecked, saveToObject){
    //create all elements
    let newTask = document.createElement("li");
    let taskDiv = document.createElement("div");
    let taskCheckbox = document.createElement("input");
    let taskSpan = document.createElement("span");
    let taskButton = document.createElement("input");

    taskDiv.className = "listElement";
    taskCheckbox.type = "checkbox";
    taskCheckbox.className = "toDoCheck";
    taskCheckbox.checked = taskChecked;
    taskSpan.textContent = taskValue;
    taskButton.type = "image";
    taskButton.src = "trash.png";
    taskButton.className = "toDoButton";

    taskButton.addEventListener("click", function(){
        //find object index in array and splice it
        toDoObject.splice(toDoObject.findIndex(x => x.task == taskSpan.textContent), 1);
        localStorage.setItem("tasks", JSON.stringify(toDoObject));
        newTask.remove();
    });

    taskCheckbox.addEventListener("change", function(){
        toDoObject[toDoObject.findIndex(x => x.task == taskSpan.textContent)].checked = taskCheckbox.checked;
        localStorage.setItem("tasks", JSON.stringify(toDoObject));
    });

    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(taskButton);
    newTask.appendChild(taskDiv);
    masterList.appendChild(newTask);

    //save only if new task, not if from storage
    if (saveToObject == true) {
        toDoObject.push({task: taskSpan.textContent, checked: taskChecked});
        localStorage.setItem("tasks", JSON.stringify(toDoObject));
    }
}