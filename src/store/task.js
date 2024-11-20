import { create } from 'zustand';
import { taskApi } from '../api/taskApi';

const useTaskStore = create((set) => ({
  tasks: [],
  
  fetchTasks: async () => {
    try {
      const response = await taskApi.getTasks();
      console.log('Fetched tasks in store:', response);
      
      // Adjust based on your backend response structure
      if (response && response.tasks) {
        set({ tasks: response.tasks });
      } else {
        set({ tasks: response });
      }
    } catch (error) {
      console.error('Failed to fetch tasks in store:', error);
      set({ tasks: [] });
    }
  },

  addTask: (task) => {
    set((state) => ({
      tasks: [...state.tasks, task]
    }));
  },

  toggleTaskStatus: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map(task => 
        task._id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    }));
  },

  deleteTask: (taskId) => {
    set((state) => ({
      tasks: state.tasks.filter(task => task._id !== taskId)
    }));
  }
}));

export default useTaskStore;