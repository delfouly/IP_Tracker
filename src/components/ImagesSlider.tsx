import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

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
      contentContainerStyle={styles.contentContainer}
      style={styles.list}
      renderItem={({_image, index}: {image: ImageData; index: number}) => (
        <ImageCard
          imageSource={IMAGES[index].source}
          onPress={() => onSelectImage(index)}
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
  contentContainer: {},
});
