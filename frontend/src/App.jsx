// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import StickyWall from './Components/Stickynotes';
import Upcoming from './Components/Upcoming';
import Calendar from './Components/Calender';
import ToDoList from './Components/Todo.jsx';
import Deleted from './Components/Deleted.jsx';
import Tasks from './Components/Tasks.jsx';
import Sidebar from './Components/Sidebar.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={< Tasks/>} />
        <Route path="/stickynotes" element={<StickyWall />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/deleted" element={<Deleted />} />
      </Routes>
    </Router>
  );
}

export default App;
