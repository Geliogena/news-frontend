import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AddEditNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token');
      axios
        .get(`/api/news/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then((response) => {
          setTitle(response.data.title);
          setText(response.data.text);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, text };
    const token = localStorage.getItem('token'); 

    if (id) {
      axios
        .put(`/api/news/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then(() => navigate('/'))
        .catch((error) => console.error(error));
    } else {
      axios
        .post('/api/news', data, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        })
        .then(() => navigate('/'))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div>
      <h1>{id ? 'Редагувати новину' : 'Додати новину'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Текст новини"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">{id ? 'Зберегти' : 'Додати'}</button>
        <button type="button" onClick={() => navigate('/')}>Повернутись</button>
      </form>
    </div>
  );
}

export default AddEditNews;
