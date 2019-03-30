import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator, createStackNavigator, createAppContainer } from 'react-navigation';;
import SocketIOClient from 'socket.io-client';



const screens = {
  Home: "./screens/HomeScreen.js",
  User: "./screens/UserScreen.js",
  Contractor: "./screens/ContractorScreen.js"
}


const RootStack = createStackNavigator(
  {
  ({
      Home: {
        screen: screens.Home
      },
      Signup: {
        screen: screens.User
      }
    })
  },
  {
    initialRouteName: 'Home'
  }

);

class App extends React.Component {
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
    return <RootStack />;
  }
}

export default createAppContainer(RootStack);
