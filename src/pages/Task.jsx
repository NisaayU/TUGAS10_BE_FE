import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useTaskStore from '../store/task';
import useUserStore from '../store/user';
import { userApi } from '../api/userApi';
import { taskApi } from '../api/taskApi';

const Task = () => {
  const navigate = useNavigate();

  
  // Zustand store hooks
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const addTask = useTaskStore((state) => state.addTask);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const user = useUserStore((state) => state.user);
  const fetchProfile = useUserStore((state) => state.fetchProfile);

  const [newTask, setNewTask] = useState('');

  // Fetch user profile and tasks when component mounts
  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const data = await taskApi.addTask(newTask);
        addTask(data.task); // Use Zustand method to add task
        setNewTask('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDoneTask = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is missing');
      return;
    }
    
    try {
      const data = await taskApi.doneTask(taskId);
      if (data.success) {
        toggleTaskStatus(taskId);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    if (!taskId) {
      console.error('Task ID is missing');
      return;
    }
  
    try {
      const data = await taskApi.deleteTask(taskId);
      if (data.success) {
        deleteTask(taskId);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  const handleLogout = () => {
    userApi.signOut();
    navigate('/.login.jsx');
  };

  return (
    <div className="grid grid-cols-1 gap-y-4 sm:gap-4 justify-center items-center sm:grid-cols-4 sm:max-w-5xl">
      <div className="h-full bg-white flex flex-col justify-center items-center max-w-xs sm:max-w-md px-6 py-8 sm:px-10 sm:py-10 rounded-[20px] space-y-4 shadow-md hover:border hover:border-purple-500 transition duration-300">
        <img className="w-24 h-24 sm:w-28 sm:h-28 rounded-full hover:scale-105 transition duration-100" src="../../public/profile.jpg" />
        <h5 className="text-center">
          Welcome Back, <span className="font-semibold">{user?.name}</span>
        </h5>
        <Link to="/UpdateProfile">
          <button className="w-full flex justify-center items-center text-white bg-purple-100 hover:bg-purple-200 font-medium rounded-xl text-sm px-5 py-2.5 space-x-1 hover:scale-102 transition duration-500 hover:bg-white-500">
            <svg className="w-5 h-5 text-purple-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M5 8a4 4 0 1 1 7.796 1.263l-2.533 2.534A4 4 0 0 1 5 8Zm4.06 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h2.172a2.999 2.999 0 0 1-.114-1.588l.674-3.372a3 3 0 0 1 .82-1.533L9.06 13Zm9.032-5a2.907 2.907 0 0 0-2.056.852L9.967 14.92a1 1 0 0 0-.273.51l-.675 3.373a1 1 0 0 0 1.177 1.177l3.372-.675a1 1 0 0 0 .511-.273l6.07-6.07a2.91 2.91 0 0 0-.944-4.742A2.907 2.907 0 0 0 18.092 8Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-purple-600 font-medium">Edit Profile</p>
          </button>
        </Link>
        <Link to="/">
          <button className="w-full flex justify-center items-center text-white bg-purple-600 hover:bg-purple-600 font-medium rounded-xl text-sm px-5 py-2.5 space-x-1 hover:scale-102 transition duration-500 hover:bg-red-500">
            <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 19V5h4a1 1 0 0 1 1 1v11h1a1 1 0 0 1 0 2h-6Z" />
              <path fillRule="evenodd" d="M12 4.571a1 1 0 0 0-1.275-.961l-5 1.428A1 1 0 0 0 5 6v11H4a1 1 0 0 0 0 2h1.86l4.865 1.39A1 1 0 0 0 12 19.43V4.57ZM10 11a1 1 0 0 1 1 1v.5a1 1 0 0 1-2 0V12a1 1 0 0 1 1-1Z" clipRule="evenodd" />
            </svg>
            <p>Log Out</p>
          </button>
        </Link>
      </div>

      {/* Tasks section */}
      <div className="bg-white col-span-3 flex flex-col max-w-xs sm:max-w-5xl px-6 py-8 sm:px-10 sm:py-10 rounded-[20px] space-y-12 shadow-md hover:border hover:border-purple-500 transition duration-300">
        <input
          className="p-2 border border-purple-500 rounded-lg"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
        />
        <button className="w-full bg-purple-600 text-white rounded-lg py-2 hover:bg-purple-400" onClick={handleAddTask}>
          Add Task
        </button>

        <div>
        {tasks?.map((task) => (
  <div key={task._id} className="flex justify-between items-center py-2">
    <span>{task.title}</span>
    <div className="flex space-x-4">
      <button 
        onClick={() => handleDoneTask(task._id)}
        className="flex items-center gap-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        ✓ Done
      </button>
      <button 
        onClick={() => handleDeleteTask(task._id)}
        className="flex items-center gap-2 px-4 py-2 bg-purple-300 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        🗑️ Delete
      </button>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
};

export default Task;
