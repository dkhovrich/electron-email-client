import firebase from 'firebase';
import { Category, IEmail, Email } from '../types/email';
import config from '../config';

type Firestore = firebase.firestore.Firestore;
type CollectionReference = firebase.firestore.CollectionReference;
type Query = firebase.firestore.Query;
type QuerySnapshot = firebase.firestore.QuerySnapshot;

class FireBaseClient {
    private readonly dataBase: Firestore;

    constructor() {
        firebase.initializeApp(config.firebase);
        this.dataBase = firebase.firestore();
    }

    public async getEmails(category: Category): Promise<IEmail[]> {
        try {
            const emailsRef: CollectionReference = this.dataBase.collection('emails');
            const query: Query = emailsRef.where('category', '==', category).orderBy('date', 'desc');
            const snapshot: QuerySnapshot = await query.get();

            return snapshot.docs.map((doc) => Email.fromFirebase(doc.data() as IEmail));
        } catch (err) {
            console.error('Error getting emails', err);
            return [];
        }
    }
}

const client = new FireBaseClient();
export default client;
