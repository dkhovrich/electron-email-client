import truncate from 'lodash/truncate';

export interface IEmail {
    id: string;
    date: Date | string;
    from: string;
    subject: string;
    preview: string;
    content: string;
    category: Category;
    isRead: boolean;
    isDeleted: boolean;
}

export class Email implements IEmail {
    public static fromStub(stub: any): Email {
        return {
            ...stub,
            date: new Date(stub.date),
            preview: truncate(stub.content, { length: 100 }),
        };
    }

    public id: string;
    public date: Date | string;
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
