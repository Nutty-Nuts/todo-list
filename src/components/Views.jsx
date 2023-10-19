export default function Views({ tasks, change }) {
    const handleClick = (days) => {
        change(days);
    };

    return (
        <div className="views">
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
    );
}
