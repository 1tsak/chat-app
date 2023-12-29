import { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from './appWriteConfig'
import { ID, Query } from "appwrite"
export const getMessages = async () => {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_MESSAGES,
            [
                Query.orderAsc('$createdAt'),
                Query.limit(100),
            ]
        )
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
export const deleteMessage = async (id) => {
    try {
        const response = await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, id);
    } catch (e) {
        console.log(e);
    }

}