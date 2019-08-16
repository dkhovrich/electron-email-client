import React, { Fragment } from 'react';
import { Skeleton, Divider } from 'antd';

const skeletons: number[] = new Array(4).fill(0);

const EmailSkeletons: React.FC = () => {
    return (
        <Fragment>
            {skeletons.map((_, index) => (
                <div key={index}>
                    <Skeleton active={true} />
                    <Divider />
                </div>
            ))}
        </Fragment>
    );
};

export default EmailSkeletons;
