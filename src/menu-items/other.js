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
            id: 'manage-bill',
            title: 'Quản lý hóa đơn',
            type: 'item',
            url: '/manage-bill',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'manage-contract',
            title: 'Quản lý hợp đồng',
            type: 'item',
            url: '/manage-contract',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'manage-request',
            title: 'Quản lý yêu cầu',
            type: 'item',
            url: '/manage-request',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'manage-notification',
            title: 'Quản lý thông báo',
            type: 'item',
            url: '/manage-notification',
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
            id: 'bill-tracking',
            title: 'Lịch sử hóa đơn',
            type: 'item',
            url: '/bill-tracking',
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
            id: 'complaints',
            title: 'Hỗ trợ, Phản ánh',
            type: 'item',
            url: '/complaints',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'profile',
            title: 'Thông tin cá nhân',
            type: 'item',
            url: '/profile',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        }
    ]
};

export default other;
