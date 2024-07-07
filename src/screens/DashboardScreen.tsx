import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import axios from 'axios';

import {ImagesSlider, Button} from '../components';
import {SelectedItemData, SharedContext} from '../SharedContext';

const DashboardScreen = () => {
  const {selectedItem, setSelectedItem} = useContext(SharedContext);
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState(selectedItem.ipInfo);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get('https://ipwho.is/');
        setIpInfo(response.data);
        setSelectedItem((prevSelectedItem: SelectedItemData) => ({
          ...prevSelectedItem,
          ipInfo: response.data,
        }));
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    };
    fetchIpInfo();
  }, [setSelectedItem]);

  const handleIpSearch = async () => {
    try {
      const response = await axios.get(`https://ipwho.is/${ipAddress}`);
      setIpInfo(response.data);
      setSelectedItem((prevSelectedItem: SelectedItemData) => ({
        ...prevSelectedItem,
        ipInfo: response.data,
      }));
    } catch (error) {
      console.error('Error in IP searching:', error);
    }
  };

  const handleImageSelect = (imageIndex: number) => {
    setSelectedItem(selectedItem => ({
      ...selectedItem,
      selectedImageIndex: imageIndex,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.ipContainer}>
        <TextInput
          style={styles.ipInput}
          placeholder="Enter IP Address"
          value={ipAddress}
          onChangeText={setIpAddress}
        />
        <Button title="Search" onPress={handleIpSearch} />
      </View>
      {ipInfo && (
        <View style={styles.ipInfo}>
          <Text>IP Address: {ipInfo.ip}</Text>
          <Text>ISP: {ipInfo.connection.isp}</Text>
          <Text>
            Location: {ipInfo.city}, {ipInfo.region_code}
          </Text>
        </View>
      )}
      <ImagesSlider onSelectImage={handleImageSelect} />
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ipContainer: {},
  ipInput: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    marginHorizontal: 12,
    marginVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  ipInfo: {
    marginHorizontal: 12,
  },
  button: {
    marginHorizontal: 16,
  },
});
