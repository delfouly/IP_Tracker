import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';

import ImageCard from './ImageCard';
import {ImageData, IMAGES} from '../images';

type ImagesSliderProps = {
  onSelectImage: (imageIndex: number) => void;
};

const ImagesSlider = ({onSelectImage}: ImagesSliderProps) => {
  return (
    <FlatList
      data={IMAGES}
      keyExtractor={image => image.id}
      horizontal
      style={styles.list}
      renderItem={({item, index}: ListRenderItemInfo<ImageData>) => (
        <ImageCard
          imageSource={IMAGES[index].source}
          onPress={() => onSelectImage(index)}
          {...item}
        />
      )}
    />
  );
};

export default ImagesSlider;

const styles = StyleSheet.create({
  list: {
    marginHorizontal: 12,
  },
});
