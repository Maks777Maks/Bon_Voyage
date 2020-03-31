export default {
    items: [
        {
            title: true,
            name: '����',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: '�������',
            url: '/manager/profile',
            icon: 'icon-user',
        },
        {
            name: '������',
            url: '/base/carousels',
            icon: 'icon-plane',

            children: [
                {
                    name: '�� �����',
                    url: '/base/carousels',
                    icon: 'icon-list',
                },
                {
                    name: '�������� ����',
                    url: '/base/cards',
                    icon: 'icon-plus',
                },
                {
                    name: '������ �����',
                    url: '/base/carousels',
                    icon: 'icon-credit-card',
                },
                {
                    name: '������ ����������',
                    url: '/base/carousels',
                    icon: 'icon-fire',
                }
            ]
        }
    ]
};
