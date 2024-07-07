import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

const STREAM_URL = 'wss://stream.binance.com:443/ws/btcusdt@aggTrade';
const SUBSCRIPTION_MESSAGE = JSON.stringify({
  method: 'SUBSCRIBE',
  params: ['btcusdt@aggTrade'],
  id: 1,
});

function addAndSortNumber(numberArray: number[], newNumber: number) {
  if (!numberArray.includes(newNumber)) {
    numberArray.push(newNumber);
    numberArray.sort((a, b) => a - b);
  }

  return numberArray;
}

const MarketScreen = () => {
  const [prices, setPrices] = useState<number[]>([]);
  const [latestPrice, setLatestPrice] = useState(0);
  const [lineData, setLineData] = useState<{value: number}[]>([]);

  // const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     console.log('Tab component unmounted');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  useEffect(() => {
    const handleWebSocketMessage = (event: WebSocketMessageEvent) => {
      const data = JSON.parse(event.data);
      if (data.e === 'aggTrade' && data.s === 'BTCUSDT') {
        const price = parseFloat(data.p);
        setLatestPrice(price);
        setLineData(prevLineData => [...prevLineData, {value: price}]);

        setPrices(prev => addAndSortNumber(prev, price));
      }
    };

    const webSocket = new WebSocket(STREAM_URL);

    webSocket.onopen = () => {
      webSocket.send(SUBSCRIPTION_MESSAGE);
    };

    webSocket.onmessage = event => {
      handleWebSocketMessage(event);
    };

    return () => {
      webSocket.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelKey}>BTCUSDT</Text>
        <Text style={styles.labelValue}>{latestPrice}</Text>
      </View>

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
          />
        </View>
      )}
    </View>
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
    marginEnd: 30,
  },
  loader: {
    margin: 50,
  },
  labelContainer: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
    borderWidth: 4,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    marginVertical: 20,
  },
  labelKey: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
  },
  labelValue: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
});
