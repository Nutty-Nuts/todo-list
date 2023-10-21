import { IonIcon } from "@ionic/react";

export default function ViewButton({
    id,
    classname,
    icon,
    text,
    setter,
    days,
    eventHandler,
}) {
    return (
        <button
            id={id}
            className={`btn ${classname}`}
            onClick={() => {
                setter(days);
                eventHandler(event);
            }}
        >
            <IonIcon className="icons" icon={icon} />
            {text}
        </button>
    );
}
