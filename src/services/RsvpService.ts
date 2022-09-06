/* eslint-disable @typescript-eslint/no-explicit-any */

// Helpers
import { loadConfig } from 'helpers/global';

// Load config
const config = loadConfig();

// Function that create an RSVP Request 
export const createRsvpRequest = async (data: any) : Promise<any> => {
    return new Promise((resolve,reject) => {
        fetch(`${config.api.url}${config.api.endpoints.rsvpRequest}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then((response) => {
            response.json().then((result) => {
                if(result.success === true) {
                    resolve(true)
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