This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# General Task Description

Please develop a mobile application that consists of three sections/screens and a bottom menu.
When opening the app, it should detect the IP address and ISP provider of the current user and display them on the first screen. When any IP is entered in the form field, it should also determine and display the ISP provider and address.You can use this service to determine the location based on IP - `https://ipwho.is/`
Below the form, a slider should be placed, consisting of multiple images stored locally or in any accessible location of your choice. When one of the images is selected (clicked), it should be passed to the second screen.
On the second screen, the data obtained based on IP and the selected image from the first screen should be displayed.
On the third screen, market data should be displayed in real-time for a ticker of your choice, for example, "BTCUSDT". You can use this service to retreive the data - `https://www.tiingo.com/documentation/websockets/forex` . Or this source can be used (it does not require a key):
`wss://stream.binance.com:443/ws/btcusdt`
Subscribes to the server with the following message:
``
{
  "method": "SUBSCRIBE",
  "params": [
    "btcusdt@aggTrade"
  ],
  "id": 1
}
``

## To start the Application on Android
```
npm install && npx react-native start  
```
## Screen recording

<img width="376" alt="Screenshot 2024-07-08 at 10 15 28 AM" src="https://github.com/delfouly/IP_Tracker/assets/75304737/878227c1-38bc-4838-b25e-a516a770ef75">


https://github.com/delfouly/IP_Tracker/assets/75304737/fe691aba-1bcc-4119-acd8-054571f385c8

## NOTES
1. For handling network connections, I prefer using react query and custom hooks. But given the limited usage in this app, using axios directly was enough.
2. The graph still needs to be optimized to limit the number of rerenders. Throttling can be used to improve performance and multiple solutions can be explored to enhance performance. Due to submission time window this was the best implementation for the time being. 
3. The IP api reached its maximum monthly limit therefore the api response was not fully tested after code refactor. However, It was working perfectly before the api expiry and a screenshot above is attached. 



