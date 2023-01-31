import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

// 404 not found routing
const Page404 = Loadable(lazy(() => import('views/not-found')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const NotFoundRoutes = {
    path: '*',
    element: <Page404 />
};

export default NotFoundRoutes;
