import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 8080;
export const mongodbUri = "mongodb://localhost:27017/task_management";
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
