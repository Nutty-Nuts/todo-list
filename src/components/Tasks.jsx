import Task from "./Task";
import PropTypes from "prop-types";

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

Tasks.propTypes = {
    tasks: PropTypes.object.isRequired,
    check: PropTypes.func.isRequired,
};
