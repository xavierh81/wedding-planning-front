/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */

import config from 'config/config';

export const loadConfig = () : any => {
    const env = process.env.NODE_ENV || "development";
    return config[env]
}