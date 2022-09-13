/* eslint-disable @typescript-eslint/no-explicit-any */

// Helpers
import { loadConfig } from 'helpers/global';

// Load config
const config = loadConfig();

// Define details type (used for guest accommodation)
type RsvpPerson = {
    kind: string,
    firstname: string,
    lastname: string,
    coming: boolean,
    special_diet?: boolean,
    special_diet_note?: string
}

// Define main result type
export type RsvpResponse = {
    requestId: number,
    requestDate: string,
    contact_mail: string,
    contact_address?: string,
    notes?: string,
    people: RsvpPerson[]
}

//
// Functions
//

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

export const retrieveRsvpResults = async () : Promise<RsvpResponse[]> => {
    return new Promise((resolve,reject) => {
        fetch(`${config.api.url}${config.api.endpoints.rsvpResults}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            response.json().then((result) => {
                if(result.success === true) {
                    const data : RsvpResponse[] = result.data;
                    
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