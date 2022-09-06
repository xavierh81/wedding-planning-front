// Helpers
import { loadConfig } from 'helpers/global';

// Load config
const config = loadConfig();

// Define contact type (used for guest accommodation)
type GuestAccommodationContact = {
    name?: string,
    phone?: string,
    mail?: string
}

// Define details type (used for guest accommodation)
type GuestAccommodationDetails = {
    rooms: number,
    capacity: number,
    notes?: string
}

// Define main result type
export type GuestAccommodation = {
    id: number,
    name: string,
    distance: number,
    imageUrl: string,
    link: string,
    address: string,
    contact: GuestAccommodationContact,
    details: GuestAccommodationDetails
}

// Function that retrieve all guest accomodations
export const retrieveGuestAccommodations = async () : Promise<GuestAccommodation[]> => {
    return new Promise((resolve,reject) => {
        fetch(`${config.api.url}${config.api.endpoints.retrieveGuestAccommodations}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })
        .then((response) => {
            response.json().then((result) => {
                if(result.success === true) {
                    const data : GuestAccommodation[] = result.data;
                    
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