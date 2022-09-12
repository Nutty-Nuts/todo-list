import Task from "./task";

let todayTodo = new Task("Do Assignments", "9/12/2022", "9/14/2022");

export function createTask(onClick) {
    let container = document.createElement("div");
    container.innerHTML = `
    <form action="" onsubmit=${onClick}>
        <input 
            type="text" 
            name="taskName" 
            id="task-name" 
            placeholder="Task Name" 
        />

        <input
            type="date"
            name="madeDate"
            id="made-date"
            placeholder="Date Created"
        />

        <input
            type="date"
            name="dueDate"
            id="due-date"
            placeholder="Date Due"
        />

        <input type="submit" value="Create Task" />
    </form>
    `;

    container.classList.add("task-form");

    return container;
}

export function renderTask() {
    let container = document.createElement("div");

    let name = document.createElement("p");
    name.innerHTML = todayTodo.getProperty(1);

    let made = document.createElement("p");
    made.innerHTML = todayTodo.getProperty(2);

    let due = document.createElement("p");
    due.innerHTML = todayTodo.getProperty(3);

    container.append(name, made, due);

    return container;
}
