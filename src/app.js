import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import connectDB from './config/database.js'; 
import { port } from './config/env.js'; 
import errorHandler from './middleware/errorHandler.js'; 
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import morgan from 'morgan';

const app = express();

app.use(cors());

dotenv.config();

connectDB();

app.use(morgan('dev'));
app.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vocatask Task Management API',
            version: '1.0.0',
            description: 'API documentation for Task Management System'
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});
