import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'c77'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '808'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '462'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'a9d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/DataStructure/array/',
                component: ComponentCreator('/docs/DataStructure/array/', '2cf'),
                exact: true
              },
              {
                path: '/docs/DataStructure/linked_list/',
                component: ComponentCreator('/docs/DataStructure/linked_list/', '1e4'),
                exact: true
              },
              {
                path: '/docs/FocController/foc_controller',
                component: ComponentCreator('/docs/FocController/foc_controller', '8d3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/FreeRTOS/List/',
                component: ComponentCreator('/docs/FreeRTOS/List/', '3d1'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/FreeRTOS/Scheduler/',
                component: ComponentCreator('/docs/FreeRTOS/Scheduler/', 'ccb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/Linux/CPU Context/cou_context',
                component: ComponentCreator('/docs/Linux/CPU Context/cou_context', '11a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/Linux/Imx6ull/imx6ull_uboot_kernel/',
                component: ComponentCreator('/docs/Linux/Imx6ull/imx6ull_uboot_kernel/', '552'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/Linux/irq/',
                component: ComponentCreator('/docs/Linux/irq/', '481'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/Linux/platform/',
                component: ComponentCreator('/docs/Linux/platform/', 'ff9'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/Linux/vmm/',
                component: ComponentCreator('/docs/Linux/vmm/', 'd5b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/Makefile/introduce/introduce',
                component: ComponentCreator('/docs/Makefile/introduce/introduce', 'd41'),
                exact: true
              },
              {
                path: '/docs/Makefile/summary/',
                component: ComponentCreator('/docs/Makefile/summary/', '36d'),
                exact: true
              },
              {
                path: '/docs/ProgrammingTips/finite-state machine/fsm',
                component: ComponentCreator('/docs/ProgrammingTips/finite-state machine/fsm', 'adc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/quadruped-sim/eigen/',
                component: ComponentCreator('/docs/quadruped-sim/eigen/', '49a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/quadruped-sim/foot_swing_trajectory/',
                component: ComponentCreator('/docs/quadruped-sim/foot_swing_trajectory/', '0b8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/quadruped-sim/load_robot/',
                component: ComponentCreator('/docs/quadruped-sim/load_robot/', '9ee'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/StepperCtrl/simulation',
                component: ComponentCreator('/docs/StepperCtrl/simulation', 'c79'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/USB/usb_2/',
                component: ComponentCreator('/docs/USB/usb_2/', 'b50'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
