import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

import {addAndSortNumber} from '../utils/addAndSortNumber';

const STREAM_URL = 'wss://stream.binance.com:443/ws/btcusdt@aggTrade';
const TRADE_TYPE = 'aggTrade';
const SYMBOL_TYPE = 'BTCUSDT';
const WS_SUBSCRIPTION_MESSAGE = JSON.stringify({
  method: 'SUBSCRIBE',
  params: ['btcusdt@aggTrade'],
  id: 1,
});

const MarketScreen = () => {
  const [prices, setPrices] = useState<number[]>([]); // unique & sorted prices array to be displayed on Y-axis
  const [latestPrice, setLatestPrice] = useState(0); // displayed in the main centered circle
  const [lineData, setLineData] = useState<{value: number}[]>([]); //actual transaction prices represented by points inside the chart

  const handleWebSocketMessage = useCallback((event: WebSocketMessageEvent) => {
    const data = JSON.parse(event.data);
    if (data.e === TRADE_TYPE && data.s === SYMBOL_TYPE) {
      const price = parseFloat(data.p);
      setLatestPrice(price);
      setLineData(prevLineData => [...prevLineData, {value: price}]);
      setPrices(prevPrices => addAndSortNumber(prevPrices, price));
    }
  }, []);

  useEffect(() => {
    const webSocket = new WebSocket(STREAM_URL);

    webSocket.onopen = () => webSocket.send(WS_SUBSCRIPTION_MESSAGE);
    webSocket.onmessage = event => handleWebSocketMessage(event);

    return () => {
      webSocket.close();
    };
  }, [handleWebSocketMessage]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelKey}>{SYMBOL_TYPE}</Text>
        <Text style={styles.labelValue}>{latestPrice}</Text>
      </View>

      {/* loading while propagating prices */}
      {prices.length < 5 ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <View style={styles.chart}>
          <LineChart
            data={lineData}
            yAxisLabelTexts={prices.map(price => price.toFixed(2).toString())}
            showXAxisIndices
            yAxisLabelWidth={100}
            scrollToEnd
            yAxisOffset={Math.min(...prices)}
            hideDataPoints
            spacing={30}
            thickness={5}
            yAxisColor="#0BA5A4"
            verticalLinesColor="rgba(14,164,164,0.5)"
            xAxisColor="#0BA5A4"
            color="#0BA5A4"
            stepHeight={40}
            yAxisTextStyle={styles.labels}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chart: {
    marginVertical: 12,
    backgroundColor: '#ddd',
    flex: 1,
  },
  loader: {
    margin: 50,
  },
  labelContainer: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 4,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    marginVertical: 20,
  },
  labelKey: {
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
    color: '#000',
  },
  labelValue: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    color: '#000',
  },
  labels: {
    color: '#000',
  },
});
