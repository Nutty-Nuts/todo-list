export default class TaskGroup {
    constructor(name, id) {
        this.name = name;
        this.tasks = [];
        this.id = id;
    }

    setName(value) {
        this.name = value;
    }

    setID(value) {
        this.id = value;
    }

    setTasks(task) {
        this.tasks.push(task);
    }

    setTasksArray(array) {
        this.tasks = array;
    }

    getName() {
        return this.name;
    }

    getTaskItem(index) {
        return this.tasks[index];
    }

    getTaskLength() {
        return this.tasks.length;
    }

    getTaskArray() {
        return this.tasks;
    }
}
