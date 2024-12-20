import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '9ca'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '4a5'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '985'),
            routes: [
              {
                path: '/docs/',
                component: ComponentCreator('/docs/', 'a9d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/docs/FocController/foc_controller',
                component: ComponentCreator('/docs/FocController/foc_controller', '8d3'),
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
