import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
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

export default HomeScreen;
