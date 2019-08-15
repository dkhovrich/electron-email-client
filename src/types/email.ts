export interface IEmail {
    id: string;
    date: Date;
    from: string;
    subject: string;
    preview: string;
    content: string;
    isRead: boolean;
    isDeleted: boolean;
}
