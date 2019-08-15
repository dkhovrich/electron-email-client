import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Layout, Menu, Icon } from 'antd';

import './style.css';

import { Category } from '../../types/email';
import { fetch } from '../../actions/emailsActions';

const { Sider } = Layout;

interface ICategoryName {
    [key: string]: string;
}

const folderName: ICategoryName = {
    [Category.Primary]: 'Primary',
    [Category.Social]: 'Social',
    [Category.Promotions]: 'Promotions',
    [Category.Updates]: 'Updates',
    [Category.Forums]: 'Forums',
};

const folders: Category[] = [
    Category.Primary,
    Category.Social,
    Category.Promotions,
    Category.Updates,
    Category.Forums,
];

const defaultSelectedKeys: Category[] = [Category.Primary];

const Sidebar: React.FC = () => {
    const dispatch: Dispatch = useDispatch();
    const [category, setCategory] = useState<Category>(Category.Primary);

    useEffect(() => {
        dispatch(fetch.request(category));
    }, [dispatch, category]);

    const onMenuClick = useCallback((event) => {
        setCategory(event.key);
    }, []);

    return (
        <Sider className="sider-container">
            <Menu theme="dark" mode="inline" defaultSelectedKeys={defaultSelectedKeys}>
                {folders.map((folder) => (
                    <Menu.Item key={folder} onClick={onMenuClick}>
                        <Icon type="folder" />
                        <span>{folderName[folder]}</span>
                    </Menu.Item>
                ))}
            </Menu>
        </Sider>
    );
};

export default Sidebar;
