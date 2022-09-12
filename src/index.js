import Task from "./modules/task";
import { format } from "date-fns";

// import { createTask } from "./modules/ui";
// import { renderTask } from "./modules/ui";

var taskList = [];
var isEmpty = true;
var isReversed = false;

function createTask() {
    let container = document.createElement("div");
    container.classList.add("task-form");
    container.innerHTML = `
    <form action="">
        <input 
            type="text" 
            name="taskName" 
            id="task-name" 
            placeholder="Task Name" 
        />

        <input
            type="date"
            name="madeDate"
            value=${setToday()}
            id="made-date"
            placeholder="Date Created"
        />

        <input
            type="date"
            name="dueDate"
            id="due-date"
            placeholder="Date Due"
        />
    </form>
    <br/>
    `;

    let button = document.createElement("button");

    button.classList.add("create-task");
    button.innerHTML = "Create Task";
    button.addEventListener("click", handleTask);

    container.appendChild(button);

    return container;
}

function handleTask() {
    let name = document.getElementById("task-name").value;
    document.getElementById("task-name").value = "";

    let madeDate = document.getElementById("made-date").value;
    document.getElementById("made-date").value = setToday();

    let dueDate = document.getElementById("due-date").value;
    document.getElementById("due-date").value = "";

    let newTask = new Task(name, madeDate, dueDate);

    taskList.push(newTask);

    renderTask();
}

function setToday() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let today = year + "-" + month + "-" + day;
    return today;
}

function renderTask() {
    if (isEmpty) {
        isEmpty = !isEmpty;
    } else {
        document.getElementById("tasks").remove();
    }

    let tasks = document.createElement("div");
    tasks.classList.add("tasks");
    tasks.setAttribute("id", "tasks");

    for (let i = taskList.length - 1; i >= 0; i--) {
        let task = document.createElement("div");
        task.classList.add("task");
        task.innerHTML = `
            <p>
                <input type = "checkbox"> <b>${taskList[i].name}</b>
                <br/>
                <small>Made at ${taskList[i].madeDate}</small>
                <br/>
                <small>Due at ${taskList[i].dueDate}</small>
            </p>
        `;

        tasks.appendChild(task);
    }

    document.querySelector(".container").append(tasks);
}

document.querySelector(".container").append(createTask());
