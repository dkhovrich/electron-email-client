import uuid from 'uuid/v4';
import truncate from 'lodash/truncate';

import { IEmail, Category } from '../types/email';

const emails: IEmail[] = [];

const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

for (const category of Object.values(Category)) {
    for (let i = 0; i < 25; i++) {
        emails.push({
            id: uuid(),
            date: new Date(),
            from: 'test@test.com',
            subject: 'Hello, World!',
            preview: truncate(content, { length: 64 }),
            content,
            isRead: false,
            isDeleted: false,
            category,
        });
    }
}

export const fetchEmailsStub = (category: Category): Promise<IEmail[]> => new Promise((resolve) => {
    setTimeout(() => {
        resolve(emails.filter((email: IEmail) => email.category === category));
    }, 300);
});
