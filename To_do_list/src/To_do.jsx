import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Todo.css";
import { useLocation } from "react-router-dom";
export default function To_do({ todos, setTodos }) {
  const [item, setItem] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editId, setEditId] = useState(null);
  const location = useLocation();
  const nav = useNavigate()
  useEffect(() => {
  if (location.state?.todo) {
    const todo = location.state.todo;

    setItem(todo.text);
    setDate(todo.date);
    setPriority(todo.priority);
    setEditId(todo.id);
  }
}, [location.state]);

//   const addTodo = (e) => {
//     e.preventDefault();

//     if (item.trim() === "") return;

//     if (editId) {
//       const updated = todos.map((todo) =>
//         todo.id === editId
//           ? {
//               ...todo,
//               text: item,
//               date,
//               priority,
//             }
//           : todo
//       );

//       setTodos(updated);
//       setEditId(null);
//       alert("Todo Updated Successfully");
//     } else {
//       const newTodo = {
//         id: Date.now(),
//         text: item,
//         date,
//         priority,
//       };

//       setTodos([...todos, newTodo]);
//       alert("Todo Added Successfully");
//     }

//     setItem("");
//     setDate("");
//     setPriority("Medium");
//   };
const addTodo = (e) => {
  e.preventDefault();

  const today = new Date().toISOString().split("T")[0];

  // Task Required
  if (item.trim() === "") {
    alert("Task name is required.");
    return;
  }

  // Minimum Length
  if (item.trim().length < 3) {
    alert("Task must be at least 3 characters.");
    return;
  }

  // Maximum Length
  if (item.trim().length > 50) {
    alert("Task cannot exceed 50 characters.");
    return;
  }

  // Date Required
  if (date === "") {
    alert("Please select a due date.");
    return;
  }

  // Past Date Validation
  if (date < today) {
    alert("Past dates are not allowed.");
    return;
  }

  // Duplicate Task Validation
  const exists = todos.some(
    (todo) =>
      todo.text.toLowerCase() === item.toLowerCase() &&
      todo.id !== editId
  );

  if (exists) {
    alert("Task already exists.");
    return;
  }

  if (editId) {
    const updatedTodos = todos.map((todo) =>
      todo.id === editId
        ? {
            ...todo,
            text: item,
            date,
            priority,
          }
        : todo
    );

    setTodos(updatedTodos);
    setEditId(null);
    alert("Todo updated successfully!");
    setTimeout(()=>{
         nav('/list')
    },200)
  } else {
    const newTodo = {
      id: Date.now(),
      text: item,
      date,
      priority,
    };

    setTodos([...todos, newTodo]);
    alert("Todo added successfully!");
  }

  setItem("");
  setDate("");
  setPriority("Medium");
};
  return (
    <div className="todo-container">
      <h1>Todo App</h1>

      <form onSubmit={addTodo} className="todo-form">
        <input
          placeholder="Enter Todo"
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
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button className="add-btn">
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