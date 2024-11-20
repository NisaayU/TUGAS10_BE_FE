import express from 'express';
import taskController from '../controllers/taskController.js';  // Pastikan path ini benar
import auth from '../middleware/auth.js';  // Pastikan path ini benar

const router = express.Router();

// Route untuk membuat task baru
/**
 * @swagger
 * /api/tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create new task
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post('/', auth, taskController.createTask);  // Memastikan `auth` dan `createTask` sudah benar

// Route untuk mendapatkan semua tasks
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks retrieved successfully
 */
router.get('/', auth, taskController.getUserTasks);

// Route untuk mengupdate task status ke 'done'
/**
 * @swagger
 * /api/tasks/{id}/done:
 *   patch:
 *     tags: [Tasks]
 *     summary: Update task to done
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.patch('/:id/done', auth, taskController.updateTaskStatus);

// Route untuk menghapus task
/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete('/:id', auth, taskController.deleteTask);

export default router;
