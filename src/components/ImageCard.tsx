import {Image, ImageSourcePropType, Pressable, StyleSheet} from 'react-native';
import React from 'react';

type ImageCardProps = {
  imageSource: ImageSourcePropType;
  onPress: () => void;
};

const ImageCard = ({imageSource, onPress}: ImageCardProps) => {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image
        source={imageSource}
        resizeMethod="scale"
        resizeMode="contain"
        style={styles.image}
      />
    </Pressable>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  card: {
    marginEnd: 12,
    height: 100,
  },
  image: {
    width: 150,
    height: 100,
  },
});
