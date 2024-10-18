// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
// import Tasks from './Tasks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/tasks" element={<Tasks />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
