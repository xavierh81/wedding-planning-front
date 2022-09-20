// Imports
import React, { useEffect } from 'react';
import { t } from '@lingui/macro';

// Ant Design
import { Row, Col } from 'antd';

// Components
import MainLayout from 'components/layouts/MainLayout';
import { PoiListItem } from 'components/PoiListItem';
import { PageLoader } from 'components/PageLoader';


// APIs
import { Poi, retrievePois } from 'services/PoisService';

// Config
import { DEFAULT_SMALL_GRID } from 'config/constants';

//
// Core
//

// Define main state type
type ThingsToDoState = {
    pois: Poi[],
    loading: boolean
}

function ThingsToDo() {

    // Define state variables
    const [state, setState] = React.useState<ThingsToDoState>({ pois: [], loading: true });

    // On page load
    useEffect(() => {
        retrievePois().then((data) => {
            // Sort data by distance
            data.sort((a, b) => a.position - b.position)

            // Save data in local state
            setState(prevState => ({ ...prevState, pois: data, loading: false}))
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
                        <span className="title">{t`thingstodo_top_title`}</span>
                        <span className="desc">{t`thingstodo_top_desc`}</span>

                        {state.loading === true && 
                            <PageLoader />
                        }

                        {state.loading === false && 
                            <div className="poisList">
                                {state.pois.map((entry) => {
                                    return <PoiListItem key={`poi_${entry.id}`}  poi={entry} />
                                })}
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </MainLayout>
    )
}

export default ThingsToDo;