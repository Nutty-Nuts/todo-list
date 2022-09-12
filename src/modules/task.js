export default class Task {
    // code here
    constructor(name, madeDate, dueDate) {
        this.name = name;
        this.madeDate = madeDate;
        this.dueDate = dueDate;
    }

    setProperty(selector, value) {
        switch (selector) {
            case 1:
                this.name = value;
                break;
            case 2:
                this.madeDate = value;
                break;
            case 3:
                this.dueDate = value;
            default:
                break;
        }
    }

    getProperty(selector, value) {
        switch (selector) {
            case 1:
                return this.name;
            case 2:
                return this.madeDate;
            case 3:
                return this.dueDate;
            default:
                break;
        }
    }
}
