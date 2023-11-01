import CryptoJS from 'crypto-js';

const appConfig = {
    // pegular number = huggingface
    secret: sessionStorage.getItem('session-id') ?? '',
    HUGGING_FACE_AUTH_KEY: '',
    ENC_HUGGING_FACE_AUTH_KEY:
        'U2FsdGVkX1+Bh6kXioLxVlZ3BW+pFpLCh0CrLCmlSDIwkdbrFbvVxo/3HCJnq/rEfTVHqYhzgQXuDeLVFIvDcw==',
};
export const setCredentials = (secret: string = '') => {
    if (secret) {
        try {
            appConfig.HUGGING_FACE_AUTH_KEY =
                CryptoJS.AES.decrypt(appConfig.ENC_HUGGING_FACE_AUTH_KEY, secret).toString(CryptoJS.enc.Utf8);
            return !!appConfig.HUGGING_FACE_AUTH_KEY;
        } catch (e) {
            return false;
        }
    }
    return false;
};

export const getConfig = () => appConfig;
export default { getConfig, setCredentials };
