import { app, BrowserWindow } from 'electron';
import installExtension, {
    ExtensionReference,
    REACT_DEVELOPER_TOOLS,
    REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import path from 'path';
import url from 'url';

import config from './config';

let win: BrowserWindow | null;

const installExtensions = async (): Promise<void | string[]> => {
    const extensions: ExtensionReference[] = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
    return Promise.all(extensions.map((name) => installExtension(name, true))).catch(console.error);
};

const createWindow = async (): Promise<void> => {
    if (process.env.NODE_ENV !== 'production') {
        await installExtensions();
    }

    win = new BrowserWindow({
        height: config.electron.height,
        width: config.electron.width,
        webPreferences: { nodeIntegration: true },
    });

    if (process.env.NODE_ENV !== 'production') {
        win.loadURL(`http://localhost:8080`);
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist', 'index.html'),
            protocol: 'file:',
            slashes: true,
        }));
    }

    win.on('closed', () => {
        win = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
