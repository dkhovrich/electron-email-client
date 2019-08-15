import uuid from 'uuid/v4';

import { IEmail } from '../types/email';

const emails: IEmail[] = [];

for (let i = 0; i < 100; i++) {
    emails.push({
        id: uuid(),
        date: new Date(),
        from: 'test@test.com',
        subject: 'Hello, World!',
        preview: 'stub preview',
        content: 'stub content',
        isRead: false,
        isDeleted: false,
    });
}

export const fetchEmailsStub = (): Promise<IEmail[]> => new Promise((resolve) => {
    setTimeout(() => {
        resolve(emails);
    }, 300);
});
