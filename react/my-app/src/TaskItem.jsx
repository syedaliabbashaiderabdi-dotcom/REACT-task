import { useState } from 'react';

function TaskItem({ todo, toggleDone, startEdit, deleteTodo, saveEdit, cancelEdit, editingId, editText, setEditText, editPriority, setEditPriority }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteTodo(todo.id);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggleDone(todo.id)}
      />
      {editingId === todo.id ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
            autoFocus
          />
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={saveEdit}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <span className={todo.done ? 'completed-text' : ''}>{todo.text}</span>
          <span className={`priority ${todo.priority || 'medium'}`}>{(todo.priority || 'medium').toUpperCase()}</span>
          <button onClick={() => startEdit(todo.id, todo.text, todo.priority || 'medium')}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
      {showConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this task?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </li>
  );
}

export default TaskItem;
