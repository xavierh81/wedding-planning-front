// Helpers
import { loadConfig } from 'helpers/global';

// Load config
const config = loadConfig();

// Define main result type
export type Poi = {
    id: number,
    position: number,
    name: string,
    description: string,
    imageUrl: string
}

// Function that retrieve all pois
export const retrievePois = async () : Promise<Poi[]> => {
    return new Promise((resolve,reject) => {
        fetch(`${config.api.url}${config.api.endpoints.retrievePois}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            response.json().then((result) => {
                if(result.success === true) {
                    const data : Poi[] = result.data;
                    
                    resolve(data);
                }
                else {
                    reject(result.error)
                }
            })
            .catch(() => {
                reject("unknown error")
            })
        })
    })
}