import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [dark, setDark] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    const theme = JSON.parse(localStorage.getItem("dark"));
    if (saved) setTodos(saved);
    if (theme) setDark(theme);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("dark", JSON.stringify(dark));
  }, [todos, dark]);

  const addTodo = () => {
    if (task.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...todos];
      updated[editIndex].text = task;
      setTodos(updated);
      setEditIndex(null);
    } else {
      setTodos([...todos, { text: task, completed: false }]);
    }
    setTask("");
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const editTodo = (index) => {
    setTask(todos[index].text);
    setEditIndex(index);
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <header>
        <h1>📝 Todo App</h1>
        <button className="theme" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </header>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "done" : ""}>
            <span onClick={() => toggleComplete(index)}>
              {todo.text}
            </span>
            <div className="actions">
              <button onClick={() => editTodo(index)}>✏️</button>
              <button onClick={() => deleteTodo(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
