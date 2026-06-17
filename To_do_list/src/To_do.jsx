

import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "./api";
import "./Todo.css";

export default function To_do() {
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTodos(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();

    if (location.state?.todo) {
      const todo = location.state.todo;

      setItem(todo.name);
      setDate(todo.date.split("T")[0]);
      setPriority(todo.priority);
      setEditId(todo._id);
    }
  }, [location.state]);

  const addTodo = async (e) => {
    e.preventDefault();

    // Validation
    if (item.trim() === "") {
      alert("Task Name is required");
      return;
    }

    if (item.trim().length < 3) {
      alert("Task should be at least 3 characters");
      return;
    }

    if (date === "") {
      alert("Please select a date");
      return;
    }

    try {
      if (editId) {
        await API.put(`/update/${editId}`, {
          name: item,
          date,
          priority,
        });

        alert("Task Updated Successfully");
        setEditId(null);
      } else {
        await API.post("/add", {
          name: item,
          date,
          priority,
        });

        alert("Task Added Successfully");
      }

      setItem("");
      setDate("");
      setPriority("Medium");

      fetchTasks();

      navigate("/list");

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="todo-container">

      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="todo-form">

        <input
          type="text"
          placeholder="Enter Task"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button className="add-btn" type="submit">
          {editId ? "Update" : "Add"}
        </button>

      </form>

      <Link to="/list">
        <button className="view-btn">
          View Todos
        </button>
      </Link>

    </div>
  );
}

