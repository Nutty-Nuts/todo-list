import "../styles/Views.css";
import { IonIcon } from "@ionic/react";
import {
    appsSharp,
    todaySharp,
    calendarSharp,
    calendarNumberSharp,
    warning,
} from "ionicons/icons";

import ViewButton from "./ViewButton";

export default function Views({ tasks, change }) {
    const handleClick = (days) => {
        change(days);
    };

    const handleActive = (event) => {
        const buttons = document.getElementsByClassName("btn");
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        event.target.className += " active";
    };

    return (
        <div className="views">
            <ViewButton
                id={"all"}
                icon={appsSharp}
                text={"All"}
                days={Infinity}
                setter={handleClick}
                eventHandler={handleActive}
            />
            <ViewButton
                id={"overdue"}
                icon={warning}
                text={"Overdue"}
                days={-Infinity}
                setter={handleClick}
                eventHandler={handleActive}
            />
            <ViewButton
                id={"today"}
                classname={"active"}
                icon={todaySharp}
                text={"Today"}
                days={1}
                setter={handleClick}
                eventHandler={handleActive}
            />
            <ViewButton
                id={"week"}
                icon={calendarSharp}
                text={"This Week"}
                days={7}
                setter={handleClick}
                eventHandler={handleActive}
            />
            <ViewButton
                id={"month"}
                icon={calendarNumberSharp}
                text={"This Month"}
                days={30}
                setter={handleClick}
                eventHandler={handleActive}
            />
        </div>
    );
}
