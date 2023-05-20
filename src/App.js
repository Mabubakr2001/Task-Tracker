import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [isAddTaskDivOpened, setAddTaskDivState] = useState(false);
  const [tasks, setTasks] = useState([]);

  // In order to load the tasks when the page load
  // useEffect deal with side effects
  useEffect(
    () => {
      async function getTasksFromServer() {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      }

      getTasksFromServer();
    },
    [] /* Dependency array */
  );

  async function fetchTasks() {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      if (!response.ok)
        throw new Error(`Something went wrong (${response.status})`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function addTask(task) {
    try {
      const response = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });
      if (!response.ok)
        throw new Error(`Something went wrong (${response.status})`);
      const data = await response.json();
      setTasks([...tasks, data]);
    } catch (error) {
      console.error(error);
    }
  }

  // Update task
  async function fetchTask(id) {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`);
      if (!response.ok)
        throw new Error(`Something went wrong (${response.status})`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleTheReminder(id) {
    try {
      const taskToUpdate = await fetchTask(id);
      const updatedTask = { ...taskToUpdate, reminder: !taskToUpdate.reminder };
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok)
        throw new Error(`Something went wrong (${response.status})`);
      const data = await response.json();
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTheTask(id) {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error(`Something went wrong (${response.status})`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <Header
        addTaskDivState={isAddTaskDivOpened}
        onClickAddBtn={() => setAddTaskDivState(!isAddTaskDivOpened)}
      />
      {isAddTaskDivOpened && <AddTask addTheTask={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          allTasks={tasks}
          toggleTheReminder={toggleTheReminder}
          deleteTheTask={deleteTheTask}
        />
      ) : (
        "There are no tasks!"
      )}
    </div>
  );
}

export default App;
