export const adminMenu = [
    { //quản lý người dùng
        name: 'menu.admin.manage',
        menus: [
            {
                name: 'menu.admin.manage-user', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            { 
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    },
    { //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    { //quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/handbook'
            },
        ]
    },
];

export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            //quản lý kế hoạch khám bệnh của bác sĩ
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule'
            },
        ]
    }
]