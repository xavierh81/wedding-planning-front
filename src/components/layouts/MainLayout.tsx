
// Imports
import React, { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import moment from 'moment';

// AntDesign
import { Col, Layout, Menu, Row} from 'antd';
const { Header, Footer, Content } = Layout;
import { MenuOutlined } from '@ant-design/icons';
import { MenuInfo } from 'rc-menu/lib/interface';

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

type MenuItem = {
  label: string,
  key: string,
  path: string
}

// Define main state type
type MainLayoutState = {
    menuItems: MenuItem[],
    currentMenuSelected: string,
    responsiveMenuDisplayed: boolean,
}

const MainLayout : React.FunctionComponent<MainLayoutProps> = ({children, title}) => {
  // Load hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Define state variables
  const [state, setState] = React.useState<MainLayoutState>({ menuItems: getMenuItems(), currentMenuSelected: getSelectedMenuKey(), responsiveMenuDisplayed: false});

  // Apply page title, if needed
  useEffect(() => {
    if(title !== undefined && isStringEmpty(title) === false) {
      document.title = `${title} | ${t`site_title`}`;
    }
    else {
      document.title = t`site_title`
    }

  }, [title]);

  // Get menu items
  function getMenuItems() : MenuItem[] {
    const menuItems : MenuItem[] = [];

    menuItems.push({label: t`menu_homepage`, key: 'home', path: SiteRoutes.HOME})
    menuItems.push({label: t`menu_rsvp`, key: 'rsvp', path: SiteRoutes.RSVP_FORM})
    menuItems.push({label: t`menu_questions_answers`, key: 'questions_answers', path: SiteRoutes.QA})
    menuItems.push({label: t`menu_guest_accommodations`, key: 'guest_accommodations', path: SiteRoutes.GUEST_ACCOMMODATIONS})
    menuItems.push({label: t`menu_things_to_do`, key: 'things_to_do', path: SiteRoutes.THINGS_TO_DO})

    return menuItems;
  }

  // Get the selected menu key from Query Path
  function getSelectedMenuKey() : string {
    switch(location.pathname) {
      case SiteRoutes.HOME:
        return "home";

      case SiteRoutes.RSVP_FORM:
        return "rsvp";

      case SiteRoutes.QA:
        return "questions_answers";

      case SiteRoutes.GUEST_ACCOMMODATIONS:
        return "guest_accommodations";

      case SiteRoutes.THINGS_TO_DO:
        return "things_to_do";

      default:
        return "";
    }
  }

  //
  // UI Functions
  //

  // Catch menu item click
  const onMenuItemClick = (info: MenuInfo) => {
    setState(prevState => ({ ...prevState, responsiveMenuDisplayed: false}));

    const menuItem = state.menuItems.find(i => i.key === info.key);
    if(menuItem!== undefined && menuItem !== null)
    {
      navigate(menuItem.path)
    }
  }

  // Display / Hide the responsive menu
  const switchResponsiveMenuState = () => {
    setState(prevState => ({ ...prevState, responsiveMenuDisplayed: !state.responsiveMenuDisplayed}))
  }

  //
  // Rendering
  //

  const formatWeddingDate = (format = "LL") : string => {
    return moment(config.weddingSettings.date, "YYYY-MM-DD").format(format);
  }

  // Get the number of days before the wedding
  const getWeddingDaysCount = () : number => {
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
        <Row id="responsiveMenu">
          <Col xs={24} md={0}>
            <button className="menuSwitch" onClick={() => switchResponsiveMenuState()}>
              <MenuOutlined />
            </button>
            <span className="siteTitle">V&X</span>
            {state.responsiveMenuDisplayed &&
              <Menu className="mainMenu" selectedKeys={[state.currentMenuSelected]} mode="inline" disabledOverflow={true} items={state.menuItems} onClick={(info) => onMenuItemClick(info)} />
            }
          </Col>
        </Row>
        <DecorationBanner />
        <div className="weddingDetails">
          <h1>Valentine & Xavier</h1>
          <span>{formatWeddingDate()} • {config.weddingSettings.place}</span>
          <span><Plural id="wedding_detais_days_counter" value={getWeddingDaysCount()} /></span>
        </div>

        <Row>
          <Col xs={0} md={24}>
            <Menu className="mainMenu" selectedKeys={[state.currentMenuSelected]} mode="horizontal" items={state.menuItems} onClick={(info) => onMenuItemClick(info)} />
          </Col>
        </Row>
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