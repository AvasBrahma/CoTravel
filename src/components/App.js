import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { getPosts } from '../api';
import {Home, Login} from '../pages';
import { Loader, Navbar } from './';

const Page404=()=>{
  return <h1>Page 404</h1>
}

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
        
         <Router>
         <Navbar />
        <Routes> {/* Wrap your Route components with Routes */}
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Page404 />} /> 
        </Routes>
      </Router>
      </div>
  );
}

export default App;
