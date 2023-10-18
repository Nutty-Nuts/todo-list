import { useState, useEffect } from "react";
import Tasks from "./Tasks";

export default function Views({ tasks, check }) {
    const now = new Date(2023, 10, 17);
    const [daysLeft, setDaysLeft] = useState(1);
    const [renderTasks, setRenderTasks] = useState({});

    const handleClick = (days) => {
        setDaysLeft(() => days);
    };

    useEffect(() => {
        let temp = {};
        Object.entries(tasks).map(([key, value]) => {
            const timeDifference = value.due.getTime() - now.getTime();
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
