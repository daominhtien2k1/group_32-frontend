// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'sample-page',
            title: 'Sample Page',
            type: 'item',
            url: '/sample-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://codedthemes.gitbook.io/berry/',
            icon: icons.IconHelp,
            external: true,
            target: true
        },
        {
            id: 'manage-building',
            title: 'Quản lý tòa nhà',
            type: 'item',
            url: '/manage-building',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'manage-room-type',
            title: 'Quản lý loại phòng',
            type: 'item',
            url: '/manage-room-type',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'manage-officer',
            title: 'Quản lý cán bộ',
            type: 'item',
            url: '/manage-officer',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'manage-room',
            title: 'Quản lý phòng',
            type: 'item',
            url: '/manage-room',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'request-room',
            title: 'Đăng kí phòng',
            type: 'item',
            url: '/request-room',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'request-list',
            title: 'Xem đăng kí',
            type: 'item',
            url: '/request-list',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'room-tracking',
            title: 'Theo dõi phòng',
            type: 'item',
            url: '/room-tracking',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'officer',
            title: 'Cán bộ',
            type: 'item',
            url: '/officer',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'profile',
            type: 'item',
            url: '/profile',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default other;
