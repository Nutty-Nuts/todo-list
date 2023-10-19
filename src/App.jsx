import { useState } from "react";
import "./styles/App.css";
import { v4 as uuid } from "uuid";
import Views from "./components/Views";
import Create from "./components/Create";

export default function App() {
    const [tasks, setTasks] = useState({
        [uuid()]: {
            name: "Study Programming",
            created: [2023, 9, 15],
            due: [2023, 9, 17],
            completed: false,
        },
        [uuid()]: {
            name: "Study Programming",
            created: [2023, 9, 15],
            due: [2023, 9, 29],
            completed: false,
        },
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(JSON.parse(localStorage.getItem("tasks")));

    const handleCheck = (event) => {
        const grandparent = event.target.parentElement.parentElement;
        const id = grandparent.id;
        const completed = tasks[id].completed;
        const rest = tasks[id];

        setTasks((prev) => ({
            ...prev,
            [id]: { ...rest, completed: !completed },
        }));
    };

    const handleSubmit = (id, name, created, due, completed) => {
        setTasks((prev) => ({
            ...prev,
            [id]: {
                name: name,
                created: created,
                due: due,
                completed: completed,
            },
        }));
    };

    return (
        <div>
            <Views tasks={tasks} check={handleCheck} />
            <Create submit={handleSubmit} />
        </div>
    );
}
