

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

    docs: [

        'Home',

        {
            type: 'category',
            label: '高效工作指南',
            link: {
                type: 'generated-index',
            },
            items: [
                'MODELS3D_VIEW',
            ],
        },
    ],
};

module.exports = sidebars;
