import Task from "./Task";

export default function Tasks({ tasks, check }) {
    const tasksList = Object.entries(tasks).map(([key, value]) => {
        return (
            <Task
                name={value.name}
                created={value.created}
                due={value.due}
                completed={value.completed}
                check={check}
                id={key}
                key={key}
            />
        );
    });

    return <div>{tasksList}</div>;
}
