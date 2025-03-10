/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { NetworkInfo } from "react-native-network-info";


let localIp = '';
NetworkInfo.getIPV4Address().then((ip) => {
  console.log("Device IP Address:", ip);
  localIp = ip || '';
});

import {
  Colors,
  Header,
} from 'react-native/Libraries/NewAppScreen';

import TcpSocket from 'react-native-tcp-socket';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function connect() {
    console.log('connect tcp socket')

    const options = {
      port: 5002,
      host: '192.168.1.3', // ip may mac
      localAddress: localIp, // ip may android
      reuseAddress: true,
      // localPort: 20000,
      // interface: "wifi",
    };

    console.log('connect tcp socket to', options)
    // Create socket
    const client = TcpSocket.createConnection(options, () => {
      // Write on the socket
      client.write('Hello server!');

      // Close socket
      client.destroy();
    });

    client.on('data', function(data) {
      console.log('message was received', data);
    });

    client.on('error', function(error) {
      console.log(error);
    });

    client.on('close', function(){
      console.log('Connection closed!');
    });
  }

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}>
        <View style={{paddingRight: safePadding}}>
          <Header/>
        </View>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>
          <Button title={'Click'} onPress={connect}/>
        </View>
      </ScrollView>
    </View>
  );
}

export default App;
