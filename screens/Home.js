import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  AsyncStorage,
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

    state = {
      names: [
         {
            id: 0,
            name: 'Ben',
         },
         {
            id: 1,
            name: 'Susan',
         },
         // {
         //    id: 2,
         //    name: 'Robert',
         // },
         {
            id: 3,
            name: 'Mary',
         }
      ]
   }
   alertItemName = (item) => {
      alert(item.name)
   }

  render() {
    return (
      <View style={
        { flex: 1,
          //alignItems: 'center',
          justifyContent: 'center',

          flexDirection: 'column',
          alignItems: 'stretch',
        }}>
        <Text>Home Screen</Text>
        <Button title="Go to Details" onPress={() => this.props.navigation.navigate('ConvoList')} />

        <Button title="Show me more of the app" onPress={this._showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        {
               this.state.names.map((item, index) => (
                 <View>
                  <TouchableOpacity
                     key = {item.id}
                     style = {styles.container}
                     onPress = {() => this.alertItemName(item)}>
                     <Text style = {styles.text}>
                        {item.name}
                        {item.id}
                     </Text>
                  </TouchableOpacity>
                  <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, }} />
                  </View>

               ))
            }
      </View>

    );
  }
  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default HomeScreen;

const styles = StyleSheet.create ({
   container: {
      padding: 10,
      height: 50,
      //marginTop: 1,
      backgroundColor: 'skyblue',
      alignItems: 'center',
   },
   text: {
      color: '#4f603c'
   }
})
