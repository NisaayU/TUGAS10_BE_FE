import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Task from './pages/Task.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';

function App() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/task" element={<Task />} />
          <Route path="/updateProfile" element={<UpdateProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
