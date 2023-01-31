import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

import ProtectedRoute from './ProtectedRoute';
import ManageNotification from 'views/manage-notification';
import Complaints from 'views/complaints';

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
const ManageRoom = Loadable(lazy(() => import('views/manage-room')));
const ManageRoomType = Loadable(lazy(() => import('views/manage-room-type')));
const RequestRoom = Loadable(lazy(() => import('views/request-room')));
const Officer = Loadable(lazy(() => import('views/officer')));
const ManageOfficer = Loadable(lazy(() => import('views/manage-officer')));
const Profile = Loadable(lazy(() => import('views/profile')));
const RoomTypeTable = Loadable(lazy(() => import('views/request-room/RoomTypeTable')));
const RequestRoomTable = Loadable(lazy(() => import('views/request-room/RequestRoomTable')));
const RequestList = Loadable(lazy(() => import('views/request-list')));
const RoomTracking = Loadable(lazy(() => import('views/room-tracking')));
const ManageBill = Loadable(lazy(() => import('views/manage-bill')));
const RoomDetailBill = Loadable(lazy(() => import('views/manage-bill/RoomDetailBill')));
const RoomListTable = Loadable(lazy(() => import('views/manage-bill/RoomListTable')));
const ManageRequest = Loadable(lazy(() => import('views/manage-request')));
const ManageContract = Loadable(lazy(() => import('views/manage-contract')));
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
            path: 'manage-room',
            element: <ManageRoom />
        },
        {
            path: 'manage-request',
            element: <ManageRequest />
        },
        {
            path: 'manage-contract',
            element: <ManageContract />
        },
        {
            path: 'manage-notification',
            element: <ManageNotification />
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
            path: 'manage-bill',
            element: <ManageBill />
            // children: [
            //     {
            //         path: '',
            //         element: <RoomListTable />
            //     },
            //     {
            //         path: 'default',
            //         element: <RoomListTable />
            //     },
            //     {
            //         path: ':monthId/:buildingId/:floorId',
            //         element: <RoomListTable />
            //     },
            //     {
            //         path: ':monthId/:buildingId/:floorId/:roomId',
            //         element: <RoomDetailBill />
            //     }
            // ]
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
                    path: ':buildingId',
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
            path: 'complaints',
            element: <Complaints />
        },
        {
            path: 'profile',
            element: <Profile />
        }
    ]
});

export default MainRoutes;
