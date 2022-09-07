// Imports
import React, { useEffect } from 'react';
import { t } from '@lingui/macro';

// Ant Design
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { GuestAccommodationListItem } from 'components/GuestAccommodationListItem';
import { PageLoader } from 'components/PageLoader';


// APIs
import { GuestAccommodation, retrieveGuestAccommodations } from 'services/GuestAccommodationsService';

// Config
import { DEFAULT_SMALL_GRID } from 'config/constants';

//
// Core
//

// Define main state type
type GuestAccommodationsState = {
    accommodations: GuestAccommodation[],
    loading: boolean
}

function GuestAccommodations() {

    // Define state variables
    const [state, setState] = React.useState<GuestAccommodationsState>({ accommodations: [], loading: true });

    // On page load
    useEffect(() => {
        retrieveGuestAccommodations().then((data) => {
            // Sort data by distance
            data.sort((a, b) => a.distance - b.distance)

            // Save data in local state
            setState(prevState => ({ ...prevState, accommodations: data, loading: false}))
        })
        .catch(() => {
            setState(prevState => ({ ...prevState, loading: false}))
        });
    }, []);

    //
    // Main Render
    //
    return (
        <MainLayout>
            <Row className="mainTheme">
                <Col {...DEFAULT_SMALL_GRID}>
                    <div className="section">
                        <span className="title">{t`guest_accommodations_top_title`}</span>
                        <span className="desc">{t`guest_accommodations_top_desc`}</span>

                        <span className="desc">{t`guest_accommodations_additional_desc`}</span>

                        {state.loading === true && 
                            <PageLoader />
                        }

                        {state.loading === false && 
                            <div className="guestAccommodationsList">
                                {state.accommodations.map((entry) => {
                                    return <GuestAccommodationListItem key={`guest_accommodation_${entry.id}`}  guestAccommodation={entry} />
                                })}
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default GuestAccommodations;