import { useState, useEffect } from 'react';
import Header from './Header';
import TaskInput from './TaskInput';
import FilterBar from './FilterBar';
import TaskItem from './TaskItem';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const addTodo = (priority = 'medium') => {
    if (input.trim()) {
      const newTodo = { id: Date.now(), text: input.trim(), done: false, priority };
      setTodos([...todos, newTodo]);
      setInput('');
    }
  };

  const toggleDone = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text, priority) => {
    setEditingId(id);
    setEditText(text);
    setEditPriority(priority);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => todo.id === editingId ? { ...todo, text: editText.trim(), priority: editPriority } : todo));
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
    setEditPriority('medium');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.done;
    if (filter === 'completed') return todo.done;
    return true;
  });

  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.done).length;

  return (
    <div className="todo-container">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <TaskInput input={input} setInput={setInput} addTodo={addTodo} />
      <div className="counters">
        <span>Total: {totalTasks}</span>
        <span>Completed: {completedTasks}</span>
      </div>
      <FilterBar filter={filter} setFilter={setFilter} />
      <ul className="task-list">
        {filteredTodos.map(todo => (
          <TaskItem
            key={todo.id}
            todo={todo}
            toggleDone={toggleDone}
            startEdit={startEdit}
            deleteTodo={deleteTodo}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
            editingId={editingId}
            editText={editText}
            setEditText={setEditText}
            editPriority={editPriority}
            setEditPriority={setEditPriority}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
