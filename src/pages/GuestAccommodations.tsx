// Imports
import React, { useEffect } from 'react';
import { t, Trans } from '@lingui/macro';

// Ant Design
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { GuestAccommodationListItem } from 'components/GuestAccommodationListItem';
import { PageLoader } from 'components/PageLoader';


// APIs
import { GuestAccommodation, retrieveGuestAccommodations } from 'services/GuestAccommodationsService';

// Helpers
import { loadConfig } from 'helpers/global';

// Config
import { DEFAULT_SMALL_GRID } from 'config/constants';
// Load config
const config = loadConfig();

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

                        <span className="desc">
                            <Trans id="guest_accommodations_additional_places"><a href={config.weddingSettings.guestAccommodationsPDFLink} rel="noreferrer" target="_blank"></a></Trans>
                        </span>

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