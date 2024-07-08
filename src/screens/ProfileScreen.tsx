import {Image, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';

import {SharedContext} from '../SharedContext';
import {IMAGES} from '../images';
import {IpDetails} from '../components';

const ProfileScreen = () => {
  const {selectedItem} = useContext(SharedContext);
  const {ipInfo, selectedImageIndex} = selectedItem;

  return (
    <View style={styles.container}>
      {ipInfo && <IpDetails ipInfo={ipInfo} />}
      <Image
        source={IMAGES[selectedImageIndex].source}
        style={styles.selectedImage}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ipInfo: {
    margin: 12,
  },
  selectedImage: {
    marginHorizontal: 12,
    alignSelf: 'center',
    width: '95%',
  },
});
