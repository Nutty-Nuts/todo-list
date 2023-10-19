import PropTypes from "prop-types";

export default function Task({
    name,
    // created,
    due,
    completed,
    check,
    id,
    // value,
}) {
    return (
        <div id={id}>
            <label className="task">
                <input type="checkbox" onChange={check} checked={completed} />
                {name}
                {`${due[1] + 1}/${due[2]}/${due[0]}`}
            </label>
        </div>
    );
}

Task.propTypes = {
    name: PropTypes.string.isRequired,
    created: PropTypes.array.isRequired,
    due: PropTypes.array.isRequired,
    completed: PropTypes.bool.isRequired,
    check: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};
