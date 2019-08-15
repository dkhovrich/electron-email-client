import React from 'react';

import { IEmail } from '../../types/email';

interface IProps {
    email: IEmail;
}

const EmailListItem = ({ email }: IProps) => {
    return (
        <pre>Hello, World</pre>
    );
};

export default EmailListItem;
