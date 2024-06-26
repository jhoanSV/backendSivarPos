import { config as dotenv } from 'dotenv';
dotenv();

export const config = {
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password : process.env.BD_PASSWORD,
    database: process.env.BD_DATABASE
}

export const configSivarPos = {
    host: process.env.BD_SIVARPOS_HOST,
    user: process.env.BD_SIVARPOS_USER,
    password :  process.env.BD_SIVARPOS_PASSWORD,
    database: process.env.BD_SIVARPOS_DATABASE
}