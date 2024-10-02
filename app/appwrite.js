import {Client} from 'appwrite';
import {Account} from 'appwrite'

export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID);


export const account = new Account(client);

export {ID} from 'appwrite';
