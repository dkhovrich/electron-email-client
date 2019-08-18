import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
    dotenv.config();
}

interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
}

interface IElectonConfig {
    width: number;
    height: number;
}

interface IConfig {
    firebase: IFirebaseConfig;
    electron: IElectonConfig;
}

const config: IConfig = {
    electron: {
        height: 768,
        width: 1024,
    },
    firebase: {
        apiKey: process.env.FIREBASE_API_KEY as string,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
        projectId: process.env.FIREBASE_PROJECT_ID as string,
    },
};

export default config;
