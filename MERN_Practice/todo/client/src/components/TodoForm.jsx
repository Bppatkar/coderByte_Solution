import { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError(null);

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await onAdd(formData);
      setFormData({ title: '', description: '', isActive: true });
    } catch (error) {
      console.error('Error adding todo:', error);
      setError(error.response?.data?.message || 'Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Add New Todo</h2>
      {error && (
        <div style={{ 
          color: 'red', 
          padding: '10px', 
          marginBottom: '10px',
          border: '1px solid red',
          borderRadius: '4px',
          backgroundColor: '#fee'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={onChange}
            disabled={loading}
            placeholder="Enter todo title"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
            Description *
          </label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={onChange}
            disabled={loading}
            placeholder="Enter todo description"
            rows="4"
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            name="isActive"
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={onChange}
            disabled={loading}
          />
          <label htmlFor="isActive">Mark as Active</label>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;