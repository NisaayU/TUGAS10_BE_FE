import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Task from '../models/Task.js';
import { mongodbUri } from '../config/env.js';

dotenv.config();

const users = [
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        photo_url: 'https://example.com/john.jpg'
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        photo_url: 'https://example.com/jane.jpg'
    }
];

const createTasks = async (userId) => {
    const tasks = [
        {
            title: 'Complete project documentation',
            isDone: false,
            userId
        },
        {
            title: 'Review pull requests',
            isDone: true,
            userId
        },
        {
            title: 'Setup development environment',
            isDone: false,
            userId
        }
    ];

    await Task.insertMany(tasks);
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(mongodbUri);

        await User.deleteMany();
        await Task.deleteMany();

        console.log('Previous data cleared');

        const createdUsers = await User.create(users);
        console.log('Users seeded');

        for (const user of createdUsers) {
            await createTasks(user._id);
        }
        console.log('Tasks seeded');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();