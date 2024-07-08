import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import axios from 'axios';

import {ImagesSlider, Input, Button} from '../components';
import {IP, SelectedItemData, SharedContext} from '../SharedContext';
import {checkIsValideIp} from '../utils/checkIsValideIp';
import {IpDetails} from '../components';

const DashboardScreen = () => {
  const {selectedItem, setSelectedItem} = useContext(SharedContext);
  const [ipAddress, setIpAddress] = useState('');
  const [ipInfo, setIpInfo] = useState(selectedItem.ipInfo);
  const [isValidIp, setIsValidIp] = useState(true);

  const handleIPdata = useCallback(
    (ipResponse: IP) => {
      setIpInfo(ipResponse);
      setSelectedItem((prevSelectedItem: SelectedItemData) => ({
        ...prevSelectedItem,
        ipInfo: ipResponse,
      }));
    },
    [setSelectedItem],
  );

  const fetchIpInfo = useCallback(
    async (ip = '') => {
      try {
        const response = await axios.get(`https://ipwho.is/${ip}`);
        handleIPdata(response.data);
      } catch (error) {
        console.error('Error fetching IP:', error);
      }
    },
    [handleIPdata],
  );

  useEffect(() => {
    fetchIpInfo();
  }, [fetchIpInfo]);

  const handleIpSubmit = () => {
    if (!checkIsValideIp(ipAddress)) {
      setIsValidIp(false);
      return;
    }
    setIsValidIp(true);
    fetchIpInfo(ipAddress);
  };

  const handleImageSelect = (imageIndex: number) => {
    setSelectedItem(prevSelectedItem => ({
      ...prevSelectedItem,
      selectedImageIndex: imageIndex,
    }));
  };

  const handleTextChange = (value: string) => {
    setIpAddress(value);

    if (value.length === 0) {
      setIsValidIp(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.ipContainer}>
        <Input
          value={ipAddress}
          onChangeText={handleTextChange}
          placeholder="Enter IP Address"
          errorMessage={
            !isValidIp ? 'Please type a valid IP address' : undefined
          }
        />

        <Button title="Search" onPress={handleIpSubmit} />
      </View>
      {ipInfo && <IpDetails ipInfo={ipInfo} />}
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
});
