// native modules
import TaskGroup from "./modules/group";
import Task from "./modules/task";

// node modules
import { format } from "date-fns";

// import { createTask } from "./modules/ui";
// import { renderTask } from "./modules/ui";

var taskGroups = [];
var taskList = [];

var isTaskEmpty = true;
var isGroupEmpty = true;
var isReversed = false;

var activeGroup;

var counterID = 1;

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

function createGroup() {
    // creates a new group of tasks
    let container = document.createElement("div");
    container.classList.add("group-form");
    container.innerHTML = `
    <form action="">
        <input 
            type="text" 
            name="groupName" 
            id="group-name" 
            placeholder="Group Name" 
        />

    </form>
    <br/>
    `;

    let button = document.createElement("button");

    button.classList.add("create-group");
    button.innerHTML = "Create Group";
    button.addEventListener("click", handleGroup);

    container.appendChild(button);

    return container;
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

function handleGroup() {
    // handles element creating for task groups
    let name = document.getElementById("group-name").value;
    document.getElementById("group-name").value = "";

    let newGroup = new TaskGroup(name, counterID);
    counterID = counterID + 1;

    taskGroups.push(newGroup);

    renderGroup();
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

function initGroup() {
    // initialize group on click
    console.log("Init Group");
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

    for (let i = taskGroups.length - 1; i >= 0; i--) {
        let group = document.createElement("div");
        group.classList.add("group");
        group.innerHTML = `
        <p>
            <a><b>${taskGroups[i].name}</b></a>
        </p>
        `;

        group.addEventListener("click", initGroup);
        group.setAttribute("data-id", taskGroups[i].id);

        groups.appendChild(group);
    }

    document.querySelector(".groups-area").append(groups);
}

function renderTask() {
    if (isTaskEmpty) {
        isTaskEmpty = !isTaskEmpty;
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

    document.querySelector(".tasks-area").append(tasks);
}

document.querySelector(".groups-area").append(createGroup());
document.querySelector(".tasks-area").append(createTask());
