

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

    docs: [

        'Home',

        {
            type: 'category',
            label: '【机器人】个人项目',
            link: {
                type: 'generated-index',
                
            },
            items: [
                {
                type: 'category',
                label: '【Pluto】四舵轮移动机器人',
                items: [
                    'PLUTO_SUMMARY' ,
                    'PLUTO_STRUCTURE',
                    'PLUTO_HARDWARE'


                ],
            }
            ],
        },

    {
        type : 'category',
        label: '【嵌入式】',
        items: [
                'FocController',
                'SteerNode'
        ],
    }
    ],
};

module.exports = sidebars;
