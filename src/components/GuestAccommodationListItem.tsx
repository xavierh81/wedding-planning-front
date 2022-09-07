// Imports
import React, { Component } from 'react'; 
import { t } from '@lingui/macro';

// Ant Design
import { HomeOutlined, InfoCircleOutlined, LinkOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

// Services
import { GuestAccommodation } from 'services/GuestAccommodationsService';

// Load images
import DistanceIcon from 'assets/images/distance_icon.svg'
import RoomIcon from 'assets/images/room_icon.svg'
import PeopleIcon from 'assets/images/people_icon.svg'

// Define props type
type GuestAccommodationListItemProps = {
    guestAccommodation: GuestAccommodation,
}

// Define component
export class GuestAccommodationListItem extends Component<GuestAccommodationListItemProps, {}> {

    // Format distance from reception location
    // Note: distance in sent in meters
    formatDistance(distance: number) {
        if(distance > 1000) {
            return `${(distance / 1000.0).toFixed(1)} km`
        }

        return `${distance} m`
    }

    // render will know everything!
    render() {
        const {guestAccommodation} = this.props;

        return (
            <div className="guestAccommodation">
                <div className="imageContainer">
                    <img src={guestAccommodation.imageUrl} alt={guestAccommodation.name} />
                    <div className="overlayBox">
                        <div className="details">
                            <span className="name">{guestAccommodation.name}</span>
                            <span className="distance"><img className="icon" src={DistanceIcon} alt="distance" />&nbsp;&nbsp;{this.formatDistance(guestAccommodation.distance)}</span>
                        </div>
                    </div>
                </div>
                <div className="accommodationDetails">
                    <div className="convenienceList">
                        <Tooltip title={t({id: "guest_accommodations_capacity_count", values:{value: guestAccommodation.details.capacity}})}>
                            <div className="item capacity">
                                <img src={PeopleIcon} alt="capacity" />
                                <div className="count">{guestAccommodation.details.capacity}</div>
                            </div>
                        </Tooltip>
                        <Tooltip title={t({id: "guest_accommodations_rooms_count", values:{value: guestAccommodation.details.rooms}})}>
                            <div className="item rooms">
                                <img src={RoomIcon} alt="rooms" />
                                <div className="count">{guestAccommodation.details.rooms}</div>
                            </div>
                        </Tooltip>
                        {guestAccommodation.details.notes !== undefined && guestAccommodation.details.notes?.length > 0 && 
                            <Tooltip title={guestAccommodation.details.notes}>
                                <div className="item info">
                                    <InfoCircleOutlined />
                                </div>
                            </Tooltip>
                        }
                    </div>

                    <div className="inlineDetails">
                        <LinkOutlined /> <a href={guestAccommodation.link} target="_blank" rel="noreferrer">{t`guest_accommodations_website_link`}</a>
                    </div>
                    {guestAccommodation.contact.name && 
                        <div className="inlineDetails">
                            <UserOutlined /> {guestAccommodation.contact.name}
                        </div>
                    }
                    {guestAccommodation.contact.phone && 
                        <div className="inlineDetails">
                            <PhoneOutlined /> <a href={`tel:${guestAccommodation.contact.phone}`}>{guestAccommodation.contact.phone}</a>
                        </div>
                    }
                    {guestAccommodation.contact.mail && 
                        <div className="inlineDetails">
                            <MailOutlined /> <a href={`mailto:${guestAccommodation.contact.mail}`}>{guestAccommodation.contact.mail}</a>
                        </div>
                    }
                    <div className="inlineDetails">
                        <HomeOutlined />
                        <span dangerouslySetInnerHTML={{__html: guestAccommodation.address.replace(/\\n/g, "<br />")}}></span>
                    </div>
                </div>
            </div>
        )
    }
}