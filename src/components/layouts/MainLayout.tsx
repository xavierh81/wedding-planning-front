
// Imports
import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Layout} from 'antd';
const { Header, Footer, Content } = Layout;
import moment from 'moment';

// Components
import DecorationBanner from 'components/DecorationBanner';

// Helpers
import { isStringEmpty } from 'helpers/string';
import { loadConfig } from 'helpers/global';

// Config 
import { SiteRoutes } from 'config/constants';
import { Plural, t } from '@lingui/macro';

const config = loadConfig();

// Define main props types
type MainLayoutProps = {
  children: ReactNode,
  title?: string | null
}

// Define main state type
type MainLayoutState = {
    currentMenuSelected: string,
}

const MainLayout : React.FunctionComponent<MainLayoutProps> = ({children, title}) => {
  // Load hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Define state variables
  const [state, setState] = React.useState<MainLayoutState>({ currentMenuSelected: getSelectedMenuKey() });

  // Apply page title, if needed
  useEffect(() => {
    if(title !== undefined && isStringEmpty(title) === false) {
      document.title = `${title} | ${t`site_title`}`;
    }
    else {
      document.title = t`site_title`
    }

  }, [title]);

  // 
  // Get the selected menu key from Query Path
  //
  function getSelectedMenuKey() : string {
    switch(location.pathname) {
      case SiteRoutes.HOME:
        return "home";

      case SiteRoutes.RSVP_FORM:
        return "rsvp";

      default:
        return "";
    }
  }

  //
  // UI Functions
  //

  //
  // Rendering
  //

  function formatWeddingDate(format = "LL") : string {

    return moment(config.weddingSettings.date, "YYYY-MM-DD").format(format);
  }

  function getWeddingDaysCount() : number {
    const weddingDate = moment(config.weddingSettings.date, "YYYY-MM-DD")

    const isToday = weddingDate.isSame(moment(), 'day');

    if(isToday) return 0;

    const nbDays = Math.ceil(weddingDate.diff(moment(), 'days', true))
    return nbDays > 0 ? nbDays : 0
  }

  // Main rendering
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <DecorationBanner />
        <div className="weddingDetails">
          <h1>Valentine & Xavier</h1>
          <span>{formatWeddingDate()} • {config.weddingSettings.place}</span>
          <span><Plural id="wedding_detais_days_counter" value={getWeddingDaysCount()} /></span>
        </div>
      </Header>
      <Content>{children}</Content>
      <Footer>
        <div className="weddingDetails">
          <span className="initials">V&X</span>
          <span className="date">{formatWeddingDate("DD.MM.YYYY")}</span>
          <span className="copyright">{t`wedding_details_created_by`}</span>
        </div>
        <DecorationBanner reverse={true} />
      </Footer>
    </Layout>
  )
}

export default MainLayout