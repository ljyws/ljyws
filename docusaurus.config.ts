import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Hello!',
  tagline: 'This is KeysLee’s homepage',
  favicon: 'img/sheep.ico',
  url: 'https://ljyws.com',
  baseUrl: '/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ljyws', // Usually your GitHub org/user name.
  projectName: 'ljyws', // Usually your repo name.

  deploymentBranch: 'gh-pages',
  // plugins: ['@docusaurus/theme-live-codeblock'],
  i18n: {
    defaultLocale: 'ljyws',
    locales: ['ljyws'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          editUrl:
            'https://github.com/ljyws',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/ljyws',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    {
      href: '/static/katex.min.css',
      type: 'text/css',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'HOME',
      logo: {
        alt: 'My Site Logo',
        src: 'img/home_logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'HOME',
          position: 'left',
          label: 'BLOG',
        },
        {
          href: 'https://github.com/ljyws',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Blog',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Partner Links',
          items: [
            {
              label: 'flame.yu',
              href: 'https://www.yltzdhbc.top/',
            },
            {
              label: '苏工',
              href: 'https://disnox.top/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/docs',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ljyws',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light', 
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
