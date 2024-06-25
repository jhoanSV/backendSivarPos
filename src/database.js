import mysql from 'mysql2/promise';
import { config } from './config';

//const client = mysql.createConnection(config);

export const connect = async () => {
    return await mysql.createConnection(config);
};