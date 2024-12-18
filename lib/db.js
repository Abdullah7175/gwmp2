// /lib/db.js
import { Pool } from "pg";

const pool = new Pool ({
    user: 'root',
    host: '103.65.248.160',
    database: 'gmportal',
    password:'**@/#Abc1',
    port: '5432',
});

export const executeQuery = (text, params) => pool.query(text, params);
