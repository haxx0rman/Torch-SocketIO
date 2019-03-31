import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import SocketIOClient from 'socket.io-client'

class HomeScreen extends React.Component {
  componentDidMount() {

      function SockIO(){
        this.socket = SocketIOClient('http://robocock.herokuapp.com', { transports: ['websocket'], jsonp: false });

        this.connect = function(){
          this.socket.connect();
        }

        this.send = function(name, data = null){
          if (data){
            this.socket.emit(name, data);
          } else {
            this.socket.emit(name);
          }
        }

      }

      const sio = new SockIO();
      global.sio = sio;
      sio.connect()
      //global.socket = socket;
      sio.socket.on('connect', () => {
        console.log('connected to socket server');
        //socket.emit('ping');
      });
      sio.socket.on('ping', () => {
        console.log('ping');
        //console.log(this.props)
        //socket.emit('ping');
      });
      sio.socket.on('no u', () => {
        console.log('kys');
        //socket.emit('ping');
      });
      sio.socket.on('gay', () => {
        console.log('fuck u werre rite fuck');
        //socket.emit('ping');
      });
      sio.socket.on('pong', (data) => {
        console.log(data);
        console.log('pong');
      });
    }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}


// import React from 'react';
// import { Platform, StatusBar, StyleSheet, View } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
// import AppNavigator from './navigation/AppNavigator';
// import SocketIOClient from 'socket.io-client'
//
// import Home from './screens/HomeScreen';
//
//
//
// export default class App extends React.Component {
//   state = {
//     isLoadingComplete: false,
//   };
//
//
//   componentDidMount() {
//
//     function SockIO(){
//       this.socket = SocketIOClient('http://robocock.herokuapp.com', { transports: ['websocket'], jsonp: false });
//
//       this.connect = function(){
//         this.socket.connect();
//       }
//
//       this.send = function(name, data = null){
//         if (data){
//           this.socket.emit(name, data);
//         } else {
//           this.socket.emit(name);
//         }
//       }
//
//     }
//
//     const sio = new SockIO();
//     global.sio = sio;
//     sio.connect()
//     //global.socket = socket;
//     sio.socket.on('connect', () => {
//       console.log('connected to socket server');
//       //socket.emit('ping');
//     });
//     sio.socket.on('ping', () => {
//       console.log('ping');
//       console.log(this.props)
//       //socket.emit('ping');
//     });
//     sio.socket.on('no u', () => {
//       console.log('kys');
//       //socket.emit('ping');
//     });
//     sio.socket.on('gay', () => {
//       console.log('fuck u werre rite fuck');
//       //socket.emit('ping');
//     });
//     sio.socket.on('pong', (data) => {
//       console.log(data);
//       console.log('pong');
//     });
//   }
//
//   render() {
//     if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
//       return (
//         <AppLoading
//           startAsync={this._loadResourcesAsync}
//           onError={this._handleLoadingError}
//           onFinish={this._handleFinishLoading}
//         />
//       );
//     } else {
//       return (
//         <View style={styles.container}>
//           {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
//           <Home />
//         </View>
//       );
//     }
//   }
//
//   _loadResourcesAsync = async () => {
//     return Promise.all([
//       Asset.loadAsync([
//         require('./assets/images/robot-dev.png'),
//         require('./assets/images/robot-prod.png'),
//       ]),
//       Font.loadAsync({
//         // This is the font that we are using for our tab bar
//         ...Icon.Ionicons.font,
//         // We include SpaceMono because we use it in HomeScreen.js. Feel free
//         // to remove this if you are not using it in your app
//         'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
//       }),
//     ]);
//   };
//
//   _handleLoadingError = error => {
//     // In this case, you might want to report the error to your error
//     // reporting service, for example Sentry
//     console.warn(error);
//   };
//
//   _handleFinishLoading = () => {
//     this.setState({ isLoadingComplete: true });
//   };
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });
