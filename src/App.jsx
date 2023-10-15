import { useState } from "react";
import "./styles/App.css";
import { v4 as uuid } from "uuid";
import Tasks from "./components/Tasks";

export default function App() {
    const [count, setCount] = useState(0);

    const [tasks, setTasks] = useState({
        [uuid()]: {
            name: "Study Programming",
            created: new Date(2023, 10, 15),
            due: new Date(2023, 10, 20),
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

    return (
        <div>
            <Tasks tasks={tasks} check={handleCheck} />
        </div>
    );
}
