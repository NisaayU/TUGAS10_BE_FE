import Task from '../models/Task.js';
import ResponseAPI from '../utils/response.js';
import mongoose from 'mongoose';

const taskController = {
    async createTask(req, res) {
        try {
            const task = await Task.create({
                ...req.body,
                userId: req.user._id
            });

            ResponseAPI.success(res, task, 'Task created successfully', 201);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async getUserTasks(req, res) {
        try {
            const tasks = await Task.find({ userId: req.user._id });
            ResponseAPI.success(res, tasks);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async updateTaskStatus(req, res) {
        try {

            if (id) {
                return ResponseAPI.error(res, 'Task ID is required', 400);
            }

            // Validate if id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return ResponseAPI.error(res, 'Invalid task ID format', 400);
            }

            const task = await Task.findOne({
                _id: id,
                userId: req.user._id
            });

            if (!task) {
                return ResponseAPI.notFound(res, 'Task not found');
            }

            task.isDone = true;
            await task.save();

            ResponseAPI.success(res, task, 'Task status updated successfully');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async deleteTask(req, res) {
        try {
            const { id } = req.params;

            // Validate if id is provided
            if (!id) {
                return ResponseAPI.error(res, 'Task ID is required', 400);
            }

            // Validate if id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return ResponseAPI.error(res, 'Invalid task ID format', 400);
            }

            const task = await Task.findOneAndDelete({
                _id: id,
                userId: req.user._id
            });

            if (!task) {
                return ResponseAPI.notFound(res, 'Task not found');
            }

            ResponseAPI.success(res, null, 'Task deleted successfully');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

export default taskController;