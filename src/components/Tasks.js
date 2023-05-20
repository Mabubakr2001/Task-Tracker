import Task from "./Task";

const Tasks = ({ allTasks, toggleTheReminder, deleteTheTask }) => {
  return (
    <>
      {allTasks.map((task) => (
        <Task
          theTask={task}
          key={task.id}
          toggleTheReminder={toggleTheReminder}
          deleteTheTask={deleteTheTask}
        />
      ))}
    </>
  );
};

export default Tasks;
