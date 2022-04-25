// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'XXX\'s Wiki',
    tagline: '^_^',
    url: 'https://XXXXX.top',
    baseUrl: '/',
    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/earth.svg',
    organizationName: 'XXXX', // Usually your GitHub org/user name.
    projectName: 'XXXX', // Usually your repo name.

    themes: [
        // ... Your other themes.
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            {
                // ... Your options.
                // `hashed` is recommended as long-term-cache of index file is possible.
                hashed: true,
                // For Docs using Chinese, The `language` is recommended to set to:
                // ```
                language: ["en", "zh"],
                // ```
                indexDocs: true,
                indexBlog: true,
                indexPages: true,
            },
        ],
    ],

    presets: [
        [
            '@docusaurus/preset-classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({

                gtag: {
                    trackingID: 'G-XXXXXXXX',
                    anonymizeIP: false, 
                },

                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    sidebarCollapsible: true,
                    routeBasePath: "/",
                    showLastUpdateTime: false,
                    showLastUpdateAuthor: false,
                    breadcrumbs: false,
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    stylesheets: [{
        href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
        type: 'text/css',
        integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
        crossorigin: 'anonymous',
    },],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            autoCollapseSidebarCategories: true,
            hideableSidebar: false,

            navbar: {
                title: 'XXXXX',
                hideOnScroll: true,
                logo: {
                    alt: "explore",
                    src: "img/explore.svg",
                },

                items: [{
                    href: "https://space.bilibili.com/35171315",
                    label: "B站主页",
                    position: "right",
                },
                {
                    href: "https://github.com/yltzdhbc",
                    label: "GITHUB",
                    position: "right",
                },
                ],
            },

            footer: {
                style: 'light',
                links: [{
                    title: '友人帐',
                    items: [{
                        href: 'https://zhangshitao.top',
                        label: '强烈推荐！：张工的博客',
                    },
                    {
                        href: 'https://blog.csdn.net/qq_44343584',
                        label: '强烈推荐！：周工的博客',
                    },
                    ],
                },
                ],
            },

            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
                additionalLanguages: ['powershell'],
            },
        }),
};

module.exports = config;