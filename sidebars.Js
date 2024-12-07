

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  docs: [

    'HOME',

    {
      type: 'category',
      label: 'Quadruped-Sim',
      items: [
        'quadruped-sim/eigen/eigen',
        'quadruped-sim/load_robot/load_robot',
        'quadruped-sim/foot_swing_trajectory/foot_swing_trajectory'

      ],
    },

    // {
    //   type: 'category',
    //   label: 'FocController',
    //   items: [


    //   ],
    // },

    {
      type: 'category',
      label: 'Linux',
      items: [
        {
          type: 'category',
          label: 'Imx6ull',
          items: [
            'Linux/Imx6ull/imx6ull_uboot_kernel/Imx6ull_uboot_kernel',
          ],
        }

      ],
    }

    
  ],
  
};

module.exports = sidebars;