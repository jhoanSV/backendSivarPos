import mysql from 'mysql2/promise';
import { config, configSivarPos } from './config';

//const client = mysql.createConnection(config);

export const connect = async () => {
    return await mysql.createConnection(config);
};

export const connectDBSivarPos = async () => {
    return await mysql.createConnection(configSivarPos)
};