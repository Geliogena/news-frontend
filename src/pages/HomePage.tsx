import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface News {
  id: string;
  title: string;
  text: string;
  userEmail: string;
}

function HomePage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    axios.get('/api/news')
      .then(response => setNews(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Новини</h1>
      <Link to="/add">Додати новину</Link>
      <div>
        {news.map((item) => (
          <div key={item.id} className="news-card">
            <h2>
              <Link to={`/news/${item.id}`}>{item.title}</Link>
            </h2>
            <p className="news-snippet">
              {item.text.length > 100 ? `${item.text.slice(0, 100)}...` : item.text}
            </p>
            <small>Автор: {item.userEmail}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;