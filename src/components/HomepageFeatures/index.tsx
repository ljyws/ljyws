import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';


type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: ' Who am I',
    Svg: require('@site/static/img/whoami.svg').default,
    description: (
      <div className={clsx(styles.featureDescription)}>
        <h4>· CQU student</h4>
        <h4>· Passionate about robot/embedded technology</h4>
        <h4>· Participate in the 2018-2022 ROBOCON</h4>
      </div>
    ),
  },
   
  {
    title: ' My Skills ',
    Svg: require('@site/static/img/skill.svg').default,
    description: (
      <div className={clsx(styles.featureDescription)}>
        <h4>· C/C++、Py、Matlab、Maybe a little java</h4>
        <h4>· Familiar with robotic motion control</h4>
        <h4>· Familiar with 32-bit MCU such as ST or AT</h4>
        <h4>· Beginner in Linux drivers</h4>
      </div>
    ),
  },

  {
    title: ' Endeavor ',
    Svg: require('@site/static/img/earth.svg').default,
    description: (
      <div className={clsx(styles.featureDescription)}>
        <h4>· Starting a business with friends</h4>
        <h4>· Make people's lives better</h4>
      </div>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
