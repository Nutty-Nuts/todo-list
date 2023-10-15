import { useState } from "react";
import "./styles/App.css";
import Task from "./components/Task";
import { v4 as uuid } from "uuid";

export default function App() {
    const [count, setCount] = useState(0);

    const [tasks, setTasks] = useState({
        [uuid()]: {
            name: "Study Programming",
            created: "10/15/23",
            due: "10/20/23",
            completed: false,
        },
    });

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

    const mapTasks = Object.entries(tasks).map((entry) => {
        const [key, value] = entry;

        return (
            <Task
                name={value.name}
                created={value.created}
                due={value.due}
                completed={value.completed}
                check={handleCheck}
                id={key}
                key={key}
                value=""
            />
        );
    });

    return <div>{mapTasks}</div>;
}
