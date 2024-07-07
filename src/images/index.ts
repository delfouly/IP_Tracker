import {ImageSourcePropType} from 'react-native';

export type ImageData = {
  source: ImageSourcePropType;
  id: string;
};

export const IMAGES: ImageData[] = [
  {
    id: '1',
    source: require('./img1.png'),
  },
  {
    id: '2',
    source: require('./img2.png'),
  },
  {
    id: '3',
    source: require('./img3.png'),
  },
  {
    id: '4',
    source: require('./img4.png'),
  },
  {
    id: '5',
    source: require('./img5.png'),
  },
];
