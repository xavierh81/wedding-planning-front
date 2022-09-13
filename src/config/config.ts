const config = {
    test: { },
    development: {
        googleMapsApiKey: process.env.REACT_APP_WEDDING_PLANNING_GOOGLE_MAPS_API_KEY,
        weddingSettings: {
            date: "2023-07-01",
            place: "Château de Mauriac",
            rsvpDeadline: "2022-12-01",
            guestAccommodationsPDFLink: "https://wedding-planning-xv.s3.eu-west-3.amazonaws.com/Chateau.de.Mauriac.guest.accomodations.pdf"
        },
        api: {
            url: "https://dg1k71yitl.execute-api.eu-west-3.amazonaws.com/Development",
            endpoints: {
                rsvpRequest: "/rsvp_request",
                rsvpResults: "/rsvp_results",
                retrieveGuestAccommodations: "/guest_accommodations"
            }
        },
        rsvpResultsSecretKey: process.env.REACT_APP_WEDDING_PLANNING_RESULTS_SECRET_KEY
    },
    production: {
        googleMapsApiKey: process.env.REACT_APP_WEDDING_PLANNING_GOOGLE_MAPS_API_KEY,
        weddingSettings: {
            date: "2023-07-01",
            place: "Château de Mauriac",
            rsvpDeadline: "2022-12-01",
            guestAccommodationsPDFLink: "https://wedding-planning-xv.s3.eu-west-3.amazonaws.com/Chateau.de.Mauriac.guest.accomodations.pdf"
        },
        api: {
            url: "https://dg1k71yitl.execute-api.eu-west-3.amazonaws.com/Development",
            endpoints: {
                rsvpRequest: "/rsvp_request",
                rsvpResults: "/rsvp_results",
                retrieveGuestAccommodations: "/guest_accommodations"
            }
        },
        rsvpResultsSecretKey: process.env.REACT_APP_WEDDING_PLANNING_RESULTS_SECRET_KEY
    }
}

export default config;