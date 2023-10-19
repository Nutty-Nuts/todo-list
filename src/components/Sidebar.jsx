import Views from "./Views";
import "../styles/Sidebar.css";

export default function Sidebar({ tasks, change }) {
    return (
        <div className="sidebar">
            <Views tasks={tasks} change={change} />
        </div>
    );
}
