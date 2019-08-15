export interface IEmail {
    id: string;
    date: Date;
    from: string;
    subject: string;
    preview: string;
    content: string;
    category: Category;
    isRead: boolean;
    isDeleted: boolean;
}

export enum Category {
    Primary = 'primary',
    Social = 'social',
    Promotions = 'promotions',
    Updates = 'updates',
    Forums = 'forums',
}
