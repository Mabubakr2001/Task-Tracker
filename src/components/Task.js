import { FaTimes } from "react-icons/fa";

const Task = ({ theTask, toggleTheReminder, deleteTheTask }) => {
  return (
    <div
      className={`task ${theTask.reminder ? "reminder" : ""}`}
      id={theTask.id}
      onDoubleClick={() => toggleTheReminder(theTask.id)}
    >
      <h3>
        {theTask.title}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => deleteTheTask(theTask.id)}
        />
      </h3>
      <p>{theTask.day}</p>
    </div>
  );
};

export default Task;
