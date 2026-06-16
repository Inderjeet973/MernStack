import { useNavigate } from "react-router-dom";
import "./Todo.css";

export default function Todo_List({ todos, setTodos }) {
  const navigate = useNavigate();

  const deleteTodo = (id) => {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
  };

  const editTodo = (todo) => {
    navigate("/", {
      state: {
        todo,
      },
    });
  };

  return (
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

          {todos.map((todo) => (

            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.text}</td>
              <td>{todo.date}</td>
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
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>

              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}