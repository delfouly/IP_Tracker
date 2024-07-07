import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';

import {SharedContext} from '../SharedContext';
import {IMAGES} from '../images';

const ProfileScreen = () => {
  const {selectedItem} = useContext(SharedContext);
  const {ipInfo, selectedImageIndex} = selectedItem;

  return (
    <View style={styles.container}>
      <View style={styles.ipInfo}>
        <Text>IP Address: {ipInfo.ip}</Text>
        <Text>ISP: {ipInfo.connection.isp}</Text>
        <Text>
          Location: {ipInfo.city}, {ipInfo.region_code}
        </Text>
      </View>
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
