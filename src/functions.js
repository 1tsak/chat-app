import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from './appWriteConfig'
import { ID } from "appwrite"
export const getMessages = async () => {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MESSAGES)
        return response.documents;
    } catch (e) {
        console.log(e);
    }
}
export const createMessage = async (payload) => {
    try {
        const response = await databases.createDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, ID.unique(), payload)
    } catch (e) {
        console.log(e);
    }

}