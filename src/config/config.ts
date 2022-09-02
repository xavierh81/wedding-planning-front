const config = {
    test: { },
    development: {
        googleMapsApiKey: process.env.REACT_APP_WEDDING_PLANNING_GOOGLE_MAPS_API_KEY,
        weddingSettings: {
            date: "2023-07-01",
            place: "Château de Mauriac"
        },
        api: {
            url: "https://dg1k71yitl.execute-api.eu-west-3.amazonaws.com/Development",
            endpoints: {
                rsvpRequest: "/rsvp_request"
            }
        }
    },
    production: {
        googleMapsApiKey: process.env.REACT_APP_WEDDING_PLANNING_GOOGLE_MAPS_API_KEY
    }
}

export default config;