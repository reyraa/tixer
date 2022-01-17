import Home from './components/pages/home';
import Destination from './components/pages/destination';
import Hotel from './components/pages/hotel';
import Terms from './components/pages/terms';
import Privacy from './components/pages/privacy';
import Unsubscribe from './components/pages/unsubscribe';
import Error500 from './components/pages/500';
import Error404 from './components/pages/404';

const routes = [
  {
    path: '/destinations/:id/:path?',
    canonicalPath: (state) => `/destinations/${state.destinations.destination.info.id}/${state.destinations.destination.info.path}`,
    component: Destination,
    initState: Destination.initState,
    exact: false,
  },
  {
    path: '/hotels/:id/:path?',
    canonicalPath: (state) => `/hotels/${state.hotels.hotel.id}/${state.hotels.hotel.path}`,
    component: Hotel,
    initState: Hotel.initState,
    exact: false,
  },
  {
    path: '/terms',
    canonicalPath: () => '/terms',
    component: Terms,
    initState: Terms.initState,
  },
  {
    path: '/privacy',
    canonicalPath: () => '/privacy',
    component: Privacy,
    initState: Privacy.initState,
  },
  {
    path: '/unsubscribe',
    canonicalPath: () => '/unsubscribe',
    component: Unsubscribe,
    initState: Unsubscribe.initState,
  },
  {
    path: '/404',
    canonicalPath: () => '/404',
    component: Error404,
    initState: Error404.initState,
  },
  {
    path: '/500',
    canonicalPath: () => '/500',
    component: Error500,
    initState: Error500.initState,
  },
  {
    path: '/',
    canonicalPath: () => '/',
    component: Home,
    initState: Home.initState,
    exact: true,
  },
];

export default routes;
