import React from 'react';

function TaskInput({ input, setInput, addTodo }) {
  const [priority, setPriority] = React.useState('medium');

  return (
    <div className="add-item">
      <label htmlFor="new-todo">Add New Task</label>
      <input
        type="text"
        id="new-todo"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo(priority)}
        placeholder="Enter task..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={() => addTodo(priority)}>Add</button>
    </div>
  );
}

export default TaskInput;
