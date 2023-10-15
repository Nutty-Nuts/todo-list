export default function Task({
    name,
    created,
    due,
    completed,
    check,
    id,
    value,
}) {
    return (
        <div id={id}>
            <label className="task">
                <input type="checkbox" onChange={check} checked={completed} />
                {name}
            </label>
        </div>
    );
}
