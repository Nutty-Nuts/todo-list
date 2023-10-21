import { useEffect, useState } from "react";
import "./styles/App.css";
import Create from "./components/Create";
import Tasks from "./components/Tasks";
import Sidebar from "./components/Sidebar";

export default function App() {
    const [daysLeft, setDaysLeft] = useState(1);
    const [tasks, setTasks] = useState(
        localStorage.getItem("tasks")
            ? JSON.parse(localStorage.getItem("tasks"))
            : {}
    );
    const [renderTasks, setRenderTasks] = useState({});

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

    const handleCreateTask = (id, name, created, due, completed) => {
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

    const handleChangeViews = (days) => {
        setDaysLeft(() => days);
    };

    useEffect(() => {
        if (tasks !== null) {
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }, [tasks]);

    useEffect(() => {
        let temp = {};
        let now = new Date();

        Object.entries(tasks).map(([key, value]) => {
            let due = new Date(value.due[0], value.due[1], value.due[2]);

            const timeDifference = due.getTime() - now.getTime();
            const dayDifference = timeDifference / (1000 * 3600 * 24);

            if (
                dayDifference >= daysLeft &&
                dayDifference < -1 &&
                daysLeft === -Infinity
            ) {
                temp = { ...temp, [key]: value };
            } else if (
                dayDifference <= daysLeft &&
                (dayDifference >= -1 || daysLeft === Infinity)
            ) {
                temp = { ...temp, [key]: value };
            }
        });

        setRenderTasks(() => temp);
    }, [tasks, daysLeft]);

    return (
        <div className="app">
            <Sidebar tasks={tasks} change={handleChangeViews} />
            <div className="content-container">
                <div className="content">
                    <Create submit={handleCreateTask} />
                    <Tasks tasks={renderTasks} check={handleCheck} />
                </div>
            </div>
        </div>
    );
}
