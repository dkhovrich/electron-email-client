import mockEmails from './mockEmails.json';

import { IEmail, Email, Category } from '../types/email';

const emails: IEmail[] = mockEmails.map((email) => Email.fromStub(email));

export const fetchEmailsStub = (category: Category): Promise<IEmail[]> => new Promise((resolve) => {
    setTimeout(() => {
        resolve(emails.filter((email: IEmail) => email.category === category));
    }, 500);
});
