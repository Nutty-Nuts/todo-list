import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export default function Create({ submit }) {
    const [taskData, setTaskData] = useState(taskDataTemplate());

    const handleTextChange = ({ target }) => {
        setTaskData((prev) => ({ ...prev, [target.id]: target.value }));
    };

    const handleDateChange = ({ target }) => {
        console.log("target", target.value);
        let date = target.value.split("-").map(Number);
        date[1] = date[1] - 1;
        setTaskData((prev) => ({
            ...prev,
            [target.id]: date,
        }));
        console.log("due", taskData.due);
    };

    const handleSubmit = () => {
        const { id, name, created, due, completed } = taskData;
        submit(id, name, created, due, completed);
        setTaskData(() => taskDataTemplate());
    };

    return (
        <div>
            <input
                id="name"
                type="text"
                value={taskData.name}
                onChange={handleTextChange}
            />
            <input
                id="due"
                type="date"
                value={dateToString(taskData.due)}
                onChange={handleDateChange}
            />
            <button type="button" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
}

function dateToString(date) {
    console.log("date", date);
    const day = date[2].toString().padStart(2, "0");
    const month = (date[1] + 1).toString().padStart(2, "0");
    const year = date[0];

    console.log(day, month, year);

    return `${year}-${month}-${day}`;
}

function taskDataTemplate() {
    const date = new Date(2023, 9, 19);
    const now = [date.getFullYear(), date.getMonth(), date.getDate()];

    return {
        id: uuid(),
        name: "task name",
        created: now,
        due: now,
        completed: false,
    };
}

Create.propTypes = {
    submit: PropTypes.func.isRequired,
};