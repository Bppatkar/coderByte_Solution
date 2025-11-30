import React, { useCallback, useEffect, useState } from 'react';
import { todoApi } from '../api.js';
import TodoList from '../components/TodoList.jsx';
import TodoForm from '../components/TodoForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const fetchTodos = useCallback(async () => {
    if (!token) {
      setError('No authentication token found');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await todoApi.getAllTodo();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);

      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        logout();
        navigate('/login');
      } else if (error.response?.status === 404) {
        // No todos found is okay, set empty array
        setTodos([]);
      } else {
        setError(error.response?.data?.message || 'Failed to fetch todos');
      }
    } finally {
      setLoading(false);
    }
  }, [token, logout, navigate]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (newTodo) => {
    try {
      const response = await todoApi.addTodo(newTodo);
      // console.log('✅ Todo added response:', response.data);
      setTodos((prev) => [...prev, response.data.newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };

  const handleUpdateTodo = async (id, updatedData) => {
    try {
      const response = await todoApi.updateTodo(id, updatedData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? response.data.todo : todo))
      );
    } catch (error) {
      console.error('Error updating todo:', error);
      alert(error.response?.data?.message || 'Error updating todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert(error.response?.data?.message || 'Error deleting todo');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #ddd',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>My Todo List</h1>
          {user && (
            <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
              Welcome, {user.name}!
            </p>
          )}
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <TodoForm onAdd={handleAddTodo} />

      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Loading your todos...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            color: 'red',
            padding: '1rem',
            marginBottom: '1rem',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#fee',
          }}
        >
          {error}
          <button
            onClick={fetchTodos}
            style={{
              marginLeft: '1rem',
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <TodoList
          todos={todos}
          onDelete={handleDeleteTodo}
          onUpdate={handleUpdateTodo}
        />
      )}
    </div>
  );
};

export default TodoPage;
