import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tasks from "./Tasks";

export default function Views({ tasks, check }) {
    const [daysLeft, setDaysLeft] = useState(1);
    const [renderTasks, setRenderTasks] = useState({});

    const handleClick = (days) => {
        setDaysLeft(() => days);
    };

    useEffect(() => {
        let temp = {};
        let now = new Date();

        Object.entries(tasks).map(([key, value]) => {
            let due = new Date(value.due[0], value.due[1], value.due[2]);

            const timeDifference = due.getTime() - now.getTime();
            const dayDifference = timeDifference / (1000 * 3600 * 24);

            if (dayDifference <= daysLeft) {
                temp = { ...temp, [key]: value };
            }
        });

        setRenderTasks(() => temp);
    }, [tasks, daysLeft]);

    return (
        <div>
            <div>
                <button type="button" onClick={() => handleClick(Infinity)}>
                    All
                </button>
                <button type="button" onClick={() => handleClick(1)}>
                    Today
                </button>
                <button type="button" onClick={() => handleClick(7)}>
                    This Week
                </button>
                <button type="button" onClick={() => handleClick(30)}>
                    This Month
                </button>
            </div>
            <Tasks tasks={renderTasks} check={check} />
        </div>
    );
}

Views.propTypes = {
    tasks: PropTypes.object.isRequired,
    check: PropTypes.func.isRequired,
};
