import { config as dotenv } from 'dotenv';
dotenv();

export const config = {
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password : process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE
}