import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IP} from '../SharedContext';

type IpDetailsProps = {
  ipInfo: IP;
};
const IpDetails = ({ipInfo}: IpDetailsProps) => {
  return (
    <View style={styles.ipInfo}>
      <Text style={styles.ipData}>IP Address: {ipInfo.ip ?? 'N/A'}</Text>
      <Text style={styles.ipData}>ISP: {ipInfo.connection.isp ?? 'N/A'}</Text>
      <Text style={styles.ipData}>
        Location: {ipInfo.city ?? 'N/A'}, {ipInfo.region_code ?? 'N/A'}
      </Text>
    </View>
  );
};

export default IpDetails;

const styles = StyleSheet.create({
  ipInfo: {
    marginHorizontal: 12,
  },
  ipData: {
    color: '#000',
  },
});
