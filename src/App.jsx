import React, { useState, useEffect } from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);         // Store posts data
  const [loading, setLoading] = useState(false);   // Show loading text
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10;                         // Set items per page

  // Fetch data
  useEffect(() => {
    setLoading(true); // Start loading
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data); // Update posts data
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [currentPage]); // Re-run whenever currentPage changes

  // Handle page change
  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) => prevPage + direction);
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial" }}>
      <h2>Pagination and Loading effect</h2>

      {/* Loading text */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0}}>
          {posts.map((post) => (
            <li key={post.id} style={{ margin: "25px 10px",boxShadow: "10px 10px 5px #aaaaaa",}}>
              <h2>{post.id}</h2>
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: "0 15px" }}>Page {currentPage}</span>
        <button onClick={() => handlePageChange(1)} disabled={posts.length < itemsPerPage}>Next</button>
      </div>
    </div>
  );
};

export default App;
