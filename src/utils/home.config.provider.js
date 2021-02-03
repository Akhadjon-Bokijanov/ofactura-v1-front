export const get_home_config = doc => {
    switch (doc) {

        case 'act':
            return {
                title: "Aktlar",
                createTitle: "Akt yaratish",
                createUrl: "/cabinet/act/create",
                gridSourceUrl: "/api/v1/acts",
                gridConfig: {
                    deleteRequestPath: 'api/v1/atcs',
                    viewActionPath: '/cabinet/act/view',
                    editActionPath: '/cabinet/act/edit',
                    deleteConfirmText: "Shu akt ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Akt №",
                            dataIndex: 'actNo',
                            isSearchable: true,
                        },
                        {
                            title: "Kontrkt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }

        case 'contract':
            return {
                title: "Shartnomalar",
                createTitle: "Shartnoma yaratish",
                createUrl: "/cabinet/contract/create",
                gridSourceUrl: "/api/v1/contracts",
                gridConfig: {
                    deleteRequestPath: 'api/v1/contracts',
                    viewActionPath: '/cabinet/contracts/view',
                    editActionPath: '/cabinet/contract/edit',
                    deleteConfirmText: "Shu kontrakt ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Kontrkt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }

        case "empowerment":
            return {
                title: "Ishonchnomalar",
                createTitle: "Ishonchnoma yaratish",
                createUrl: "/cabinet/empowerment/create",
                gridSourceUrl: "/api/v1/empowerments",
                gridConfig: {
                    deleteRequestPath: 'api/v1/empowerments',
                    viewActionPath: '/cabinet/empowerment/view',
                    editActionPath: '/cabinet/empowerment/edit',
                    deleteConfirmText: "Shu ishonchnoma ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Ishonchnoma №",
                            dataIndex: 'empowermentNo',
                            isSearchable: true,
                            width: 100
                        },
                        {
                            title: "Kontrakt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }

        default:
            return {
                title: "Hisob fakturalar",
                createTitle: "Faktura yaratish",
                createUrl: "/cabinet/factura/create",
                gridSourceUrl: "/api/v1/facturas",
                gridConfig: {
                    deleteRequestPath: 'api/v1/facturas',
                    viewActionPath: '/cabinet/factura/view',
                    editActionPath: '/cabinet/factura/edit',
                    deleteConfirmText: "Shu faktura ochirilsinmi?",
                    actions: {
                        edit: true,
                        delete: true,
                        view: true
                    },
                    allColumns: [{
                            title: "Faktura №",
                            dataIndex: 'facturaNo',
                            isSearchable: true,
                        },
                        {
                            title: "Kontrakt №",
                            dataIndex: 'contractNo',
                            isSearchable: true,
                        },
                        {
                            title: "Oluvchi",
                            dataIndex: 'buyerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Oluvchi STIR",
                            dataIndex: "buyerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Sotuvchi",
                            dataIndex: 'sellerName',
                            isSearchable: true,
                            width: 150
                        },
                        {
                            title: "Sotuvchi STIR",
                            dataIndex: "sellerTin",
                            isSearchable: true,
                        },
                        {
                            title: "Holati",
                            dataIndex: 'status',
                            isFilterable: true,
                            filters: [
                                { value: 1, text: "1-Saqlangan" },
                                { value: 2, text: "2-Imzo kutilmoqda" },
                                { value: 3, text: "3-Jo'natilgan" },
                                { value: 4, text: "4-Xatolik yuzbergan" },
                                { value: 5, text: "5-Qaytarib yuborilgan" },
                                { value: 6, text: "6-Qabul qilingan" },
                                { value: 7, text: "7-Muaffaqiyatli" }
                            ]
                        },
                        {
                            title: 'Yaratilgan sanasi',
                            dataIndex: "created_at",
                            dataType: 'date',
                        },
                    ]
                }
            }
    }
}