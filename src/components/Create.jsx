import { useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

export default function Create({ submit }) {
    const [taskData, setTaskData] = useState({
        id: uuid(),
        name: "task name",
        created: new Date(),
        due: new Date(),
        completed: false,
    });

    const handleTextChange = ({ target }) => {
        setTaskData((prev) => ({ ...prev, [target.id]: target.value }));
    };

    const handleDateChange = ({ target }) => {
        setTaskData((prev) => ({
            ...prev,
            [target.id]: new Date(target.value),
        }));
        console.log(taskData.due);
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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
}

function taskDataTemplate() {
    return {
        id: uuid(),
        name: "task name",
        created: new Date(),
        due: new Date(),
        completed: false,
    };
}

Create.propTypes = {
    submit: PropTypes.func.isRequired,
};
