import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';

const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4000/posts');

    setPosts(res.data);
    console.log('Fetched Posts:', posts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className='card-header'>
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className='flex-wrap flex-row d-flex justify-content-between'>
      {renderedPosts}
    </div>
  );
};

export default PostList;
