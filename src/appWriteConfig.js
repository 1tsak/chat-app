import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '64a7a9de41faa2219e14';
export const DATABASE_ID = '64a7aaab0f47724f6955';
export const COLLECTION_ID_MESSAGES = '64a7aaba8c7a57d2d625';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64a7a9de41faa2219e14');

export const databases = new Databases(client);

export default client;