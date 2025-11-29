import React, { useState } from 'react';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  const [loadingId, setLoadingId] = useState(null);

  const handleToggleStatus = async (todo) => {
    setLoadingId(todo._id);
    try {
      await onUpdate(todo._id, { isActive: !todo.isActive });
    } catch (error) {
      console.error('Error toggling status:', error);
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    setLoadingId(id);
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      setLoadingId(null);
    }
  };

  if (todos.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
        <p>No todos yet. Create your first todo above!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Todos ({todos.length})</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: todo.isActive ? '#fff' : '#f9f9f9',
              opacity: loadingId === todo._id ? 0.6 : 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
              }}
            >
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: '0 0 0.5rem 0',
                    textDecoration: todo.isActive ? 'none' : 'line-through',
                    color: todo.isActive ? '#333' : '#999',
                  }}
                >
                  {todo.title}
                </h3>
                <p
                  style={{
                    margin: '0 0 1rem 0',
                    color: todo.isActive ? '#666' : '#aaa',
                  }}
                >
                  {todo.description}
                </p>
                <div
                  style={{
                    fontSize: '0.875rem',
                    color: '#999',
                    marginBottom: '0.5rem',
                  }}
                >
                  Status:{' '}
                  <strong
                    style={{ color: todo.isActive ? '#28a745' : '#6c757d' }}
                  >
                    {todo.isActive ? 'Active' : 'Completed'}
                  </strong>
                </div>
              </div>

              <div
                style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}
              >
                <button
                  onClick={() => handleToggleStatus(todo)}
                  disabled={loadingId === todo._id}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: todo.isActive ? '#28a745' : '#ffc107',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loadingId === todo._id ? 'not-allowed' : 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {todo.isActive ? '✓ Complete' : '↻ Reactivate'}
                </button>

                <button
                  onClick={() => handleDelete(todo._id)}
                  disabled={loadingId === todo._id}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loadingId === todo._id ? 'not-allowed' : 'pointer',
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
