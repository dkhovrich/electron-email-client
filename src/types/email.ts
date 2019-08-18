import truncate from 'lodash/truncate';

type Timestamp = firebase.firestore.Timestamp;

export interface IEmail {
    id: string;
    date: Date | Timestamp;
    from: string;
    subject: string;
    preview: string;
    content: string;
    category: Category;
    isRead: boolean;
    isDeleted: boolean;
}

export class Email implements IEmail {
    public static fromFirebase(email: IEmail): Email {
        return {
            ...email,
            date: (email.date as Timestamp).toDate(),
            preview: truncate(email.content, { length: 100 }),
        };
    }

    public id: string;
    public date: Date | Timestamp;
    public from: string;
    public subject: string;
    public preview: string;
    public content: string;
    public category: Category;
    public isRead: boolean;
    public isDeleted: boolean;
}

export enum Category {
    Primary = 'primary',
    Social = 'social',
    Promotions = 'promotions',
    Updates = 'updates',
    Forums = 'forums',
}
