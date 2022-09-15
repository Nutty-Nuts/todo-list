// native modules
import TaskGroup from "./modules/group";
import Task from "./modules/task";

// node modules
import { format } from "date-fns";

var taskGroups = [];
var taskList = [];

var isGroupEmpty = true;

var activeGroup = 0;

var counterID = 1;

let today = new TaskGroup("Today", 1);
let thisWeek = new TaskGroup("This Week", 2);
let thisMonth = new TaskGroup("This Month", 3);

if (localStorage.getItem("today") === null) {
    console.log("Empty");
} else {
    console.log("Occupied");
    today = JSON.parse(localStorage.getItem("today"));
    thisWeek = JSON.parse(localStorage.getItem("thisWeek"));
    thisMonth = JSON.parse(localStorage.getItem("thisMonth"));
}

taskGroups.push(today, thisWeek, thisMonth);

console.table(taskGroups);

renderGroup();

console.table(today);

document.querySelector(".tasks-area").append(createTask());

renderTask();

function setToday() {
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let today = year + "-" + month + "-" + day;
    return today;
}

function createTask() {
    let container = document.createElement("div");
    container.classList.add("task-form");
    container.innerHTML = `
    <br/>
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

    taskGroups[activeGroup].tasks = taskList;

    localStorage.setItem("today", JSON.stringify(today));
    localStorage.setItem("thisWeek", JSON.stringify(thisWeek));
    localStorage.setItem("thisMonth", JSON.stringify(thisMonth));

    console.table(JSON.parse(localStorage.getItem("today")));

    renderTask();
}

function initGroup() {
    // initialize group on click

    renderTask();
}

function renderGroup() {
    // renders the elements of a task group

    if (isGroupEmpty) {
        isGroupEmpty = !isGroupEmpty;
    } else {
        document.getElementById("groups").remove();
    }

    let groups = document.createElement("div");
    groups.classList.add("groups");
    groups.setAttribute("id", "groups");

    let today = document.createElement("div");
    today.classList.add("group");
    today.innerHTML = `
        <button>Today</button>
        <br/>
        <br/>
    `;
    today.addEventListener("click", () => {
        activeGroup = 0;
        console.log("Today is Active");
        console.log(activeGroup);

        initGroup();
    });

    let thisWeek = document.createElement("div");
    thisWeek.classList.add("group");
    thisWeek.innerHTML = `
        <button>This Week</button>
        <br/>
        <br/>
    `;
    thisWeek.addEventListener("click", () => {
        activeGroup = 1;
        console.log("This Week is Active");
        console.log(activeGroup);

        initGroup();
    });

    let thisMonth = document.createElement("div");
    thisMonth.classList.add("group");
    thisMonth.innerHTML = `
        <button>This Month</button>
        <br/>
        <br/>
    `;
    thisMonth.addEventListener("click", () => {
        activeGroup = 2;
        console.log("This Month is Active");
        console.log(activeGroup);

        initGroup();
    });

    groups.append(today, thisWeek, thisMonth);

    document.querySelector(".groups-area").append(groups);
}

function renderTask() {
    let existID = document.getElementById("tasks");

    if (existID !== null) {
        document.getElementById("tasks").remove();
    }

    taskList = taskGroups[activeGroup].tasks;

    console.table(taskGroups);

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

    document.querySelector(".tasks-area").append(tasks);
}

// document.querySelector(".groups-area").append(createGroup());
