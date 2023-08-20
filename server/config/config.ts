import dotenv from 'dotenv';

dotenv.config();

const dbUrl: string | undefined = process.env.MONGO_DB_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;
const MONGO_URL = `${dbUrl}/${dbName}`;

export const config = {
    mongo: {
        url: MONGO_URL
    }
};