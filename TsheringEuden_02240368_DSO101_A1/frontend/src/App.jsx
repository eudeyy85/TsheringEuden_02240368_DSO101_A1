import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchTasks = async () => {
    const res = await axios.get(`${API_URL}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    if (editId) {
      const task = tasks.find((t) => t.id === editId);

      await axios.put(`${API_URL}/tasks/${editId}`, {
        title,
        completed: task.completed,
      });

      setEditId(null);
    } else {
      await axios.post(`${API_URL}/tasks`, { title });
    }

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  const editTask = (task) => {
    setTitle(task.title);
    setEditId(task.id);
  };

  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/tasks/${task.id}`, {
      title: task.title,
      completed: !task.completed,
    });

    fetchTasks();
  };

  return (
    <div className="container">
      <h1>To-Do-List App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button type="submit">{editId ? "Update Task" : "Add Task"}</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              onClick={() => toggleComplete(task)}
              className={task.completed ? "done" : ""}
            >
              {task.title}
            </span>

            <button onClick={() => editTask(task)}>Edit</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
