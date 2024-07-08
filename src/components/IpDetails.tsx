import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IP} from '../SharedContext';

type IpDetailsProps = {
  ipInfo: IP;
};
const IpDetails = ({ipInfo}: IpDetailsProps) => {
  return (
    <View style={styles.ipInfo}>
      {ipInfo?.ip && <Text>IP Address: {ipInfo.ip}</Text>}
      {ipInfo?.connection?.isp && <Text>ISP: {ipInfo.connection.isp}</Text>}
      {ipInfo?.city && ipInfo?.region_code && (
        <Text>
          Location: {ipInfo.city}, {ipInfo.region_code}
        </Text>
      )}
    </View>
  );
};

export default IpDetails;

const styles = StyleSheet.create({
  ipInfo: {
    marginHorizontal: 12,
  },
});
