import { useState } from 'react';

const TodoForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    isActive: true,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Other'];

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setError(null);

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onFileChange = (e) => {
    // console.log('🔍 Files array:', e.target.files);

    // Add null check for files
    if (!e.target.files || e.target.files.length === 0) {
      console.log('No file selected');
      setFile(null);
      return;
    }

    const selectedFile = e.target.files[0];
    // console.log('📁 Selected file:', selectedFile);

    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(selectedFile);
    setError(null);
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
      const submitData = new FormData();

      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('isActive', formData.isActive.toString());

      if (file) {
        submitData.append('attachment', file);
        // console.log('📤 File attached:', file.name);
      }

      await onAdd(submitData);
      setFormData({
        title: '',
        description: '',
        category: 'Other',
        isActive: true,
      });
      setFile(null);
      const fileInput = document.getElementById('file');
      if (fileInput) fileInput.value = '';
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
        <div
          style={{
            color: 'red',
            padding: '10px',
            marginBottom: '10px',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#fee',
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <div>
          <label
            htmlFor="title"
            style={{ display: 'block', marginBottom: '5px' }}
          >
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
          <label
            htmlFor="description"
            style={{ display: 'block', marginBottom: '5px' }}
          >
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

        <div>
          <label
            htmlFor="category"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={onChange}
            disabled={loading}
            style={{ width: '100%', padding: '8px' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="file"
            style={{ display: 'block', marginBottom: '5px' }}
          >
            Attachment (Optional)
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={onFileChange}
            disabled={loading}
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
            style={{ width: '100%', padding: '8px' }}
          />
          {file && (
            <small style={{ color: '#666' }}>
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </small>
          )}
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
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
