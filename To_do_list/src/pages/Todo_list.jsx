import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../api";
import "../../src/App.css";
import Navbar from "../components/Navbar";
import "../../src/navbar.css"
export default function Todo_List() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState([]);

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
  }, []);

  // Delete Task
  const deleteTodo = async (id) => {
    // const confirmDelete = window.confirm(
    //   "Are you sure you want to delete this task?"
    // );
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This task will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    });

    if (!result) return;
    else {
      try {
        await API.delete(`/delete/${id}`);

        // alert("Task Deleted Successfully");
        Swal.fire({
          title: "Deleted!",
          text: "Task deleted successfully.",
          icon: "success",
        });

        fetchTasks();
      } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
      }
    };



  }
  // Edit Task
  const editTodo = (todo) => {
    navigate("/", {
      state: {
        todo,
      },
    });
  };
  return (
    <>
    <Navbar/>
      <div className="todo-container">
        <h1>All Todos</h1>

        <button
          className="add-btn"
          onClick={() => navigate("/")}
        >
          Back
        </button>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Date</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {todos.length > 0 ? (
              todos.map((todo, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  <td>{todo.name}</td>

                  <td>{todo.date.split("T")[0]}</td>

                  <td>{todo.priority}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => editTodo(todo)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty">
                  No Tasks Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>

  );
}

