import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Calendar from "./Components/Calender";
import ToDoList from "./Components/Todo.jsx";
import Deleted from "./Components/Deleted.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Settings from "./Components/Setting.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/deleted" element={<Deleted />} />
        <Route path="/Setting" element={<Settings />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
