// Imports
import React, { Component } from 'react'; 

// Services
import { Poi } from 'services/PoisService';

// Define props type
type PoiListItemProps = {
    poi: Poi,
}

// Define component
export class PoiListItem extends Component<PoiListItemProps, {}> {

    // render will know everything!
    render() {
        const {poi} = this.props;

        return (
            <div className="poiListItem">
                <div className="imageContainer">
                    <img src={poi.imageUrl} alt={poi.name} />
                </div>
                <span className="title">{poi.name}</span>
                <span className="desc">{poi.description}</span>
            </div>
        )
    }
}