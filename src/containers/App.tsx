import React, { useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetch } from '../actions/emailsActions';
import { selectEmails } from '../reducers/emailsReducer';

const Application: React.FC = () => {
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(fetch.request());
    }, [dispatch]);

    const emails: any[] = useSelector(selectEmails);
    console.table(emails);

    return (
        <div>
            <h1>Hello, Electron!</h1>
        </div>
    );
};

export default Application;
