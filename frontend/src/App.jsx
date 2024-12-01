import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Calendar from "./Components/Calender";
import ToDoList from "./Components/Todo.jsx";
// import Stickynotes from "./Components/Stickynotes.jsx";
import Deleted from "./Components/Deleted.jsx";
import Sidebar from "./Components/Sidebar.jsx";
// import Note from "./Components/Note.jsx";


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/deleted" element={<Deleted />} />
      </Routes>
    </Router>
  );
}


export default App;
