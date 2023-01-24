import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import ProtectedRoute from './ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ManageBuilding = Loadable(lazy(() => import('views/manage-building')));
const ManageRoomType = Loadable(lazy(() => import('views/manage-room-type')));
const RequestRoom = Loadable(lazy(() => import('views/request-room')));
const Officer = Loadable(lazy(() => import('views/officer')));
const ManageOfficer = Loadable(lazy(() => import('views/manage-officer')));
const Profile = Loadable(lazy(() => import('views/profile')));
const RoomTypeTable = Loadable(lazy(() => import('views/request-room/RoomTypeTable')));
const RequestRoomTable = Loadable(lazy(() => import('views/request-room/RequestRoomTable')));
const RequestList = Loadable(lazy(() => import('views/request-list')));
const RoomTracking = Loadable(lazy(() => import('views/room-tracking')));
const ManageRoom = Loadable(lazy(() => import('views/manage-room')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (isAllowed) => ({
    path: '/',
    element: <ProtectedRoute isAllowed={isAllowed} children={<MainLayout />} />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                },
                {
                    path: 'util-color',
                    element: <UtilsColor />
                },
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                },
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'manage-building',
            element: <ManageBuilding />
        },
        {
            path: 'manage-room-type',
            element: <ManageRoomType />
        },
        {
            path: 'manage-officer',
            element: <ManageOfficer />
        },
        {
            path: 'manage-room',
            element: <ManageRoom />
        },
        {
            path: 'request-room',
            element: <RequestRoom />,
            children: [
                {
                    path: '',
                    element: <RoomTypeTable />
                },
                {
                    path: 'default',
                    element: <RoomTypeTable />
                },
                {
                    path: ':_buildingId/:floorId',
                    element: <RequestRoomTable />
                }
            ]
        },
        {
            path: 'request-list',
            element: <RequestList />
        },
        {
            path: 'room-tracking',
            element: <RoomTracking />
        },
        {
            path: 'officer',
            element: <Officer />
        },
        {
            path: 'profile',
            element: <Profile />
        }
    ]
});

export default MainRoutes;
