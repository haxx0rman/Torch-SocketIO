import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AppRegistry,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  ListView,
  Button,
  Image,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import SocketIOClient from 'socket.io-client'

import renderImages from '../assets/mock/mockImage';
import { GiftedChat } from 'react-native-gifted-chat'

// instead of this, write to a databse and to achive message reordering, just delete the
// element from a username when it sends a new message and send the new messge
// to the top every time kinda like shufflling cards, this would also sort as messages are received
// instead of by timestamp making it harder to manipulate chats list order like people do in kik
import { images } from '../assets/mock/mockChatList';

var mock = [{
  "id": 2,
  "first_name": "Amanda",
  "last_name": "Grant",
  "username": "lmfaogrant",
  "time": "2:54 AM",
  "message": "rutrum",
  "isRead": false,
  "isViewed": false,
  "image": images[0]
}, {
  "id": 1,
  "first_name": "Gloria",
  "last_name": "Hicks",
  "username": "hicksrgay",
  "time": "11:56 AM",
  "message": "viverra pede",
  "isRead": false,
  "isViewed": true,
  "image": images[1]
}, {
  "id": 3,
  "first_name": "Gloria",
  "last_name": "Lane",
  "username": "stayinyourlane",
  "time": "1:34 AM",
  "message": "vehicula consequat",
  "isRead": true,
  "isViewed": false,
  "image": images[2]
}]

var convos = async function () {
  try {
    var e = await AsyncStorage.getItem("convoList");
    console.log(e)
    if (e) {
      global.convoList = e;
      return e
    }else{
      return [{
        "id": 2,
        "first_name": "Amanda",
        "last_name": "Grant",
        "username": "lmfaogrant",
        "time": "2:54 AM",
        "message": "rutrum",
        "isRead": false,
        "isViewed": false,
        "image": images[0]
      }, {
        "id": 1,
        "first_name": "Gloria",
        "last_name": "Hicks",
        "username": "hicksrgay",
        "time": "11:56 AM",
        "message": "viverra pede",
        "isRead": false,
        "isViewed": true,
        "image": images[1]
      }, {
        "id": 3,
        "first_name": "Gloria",
        "last_name": "Lane",
        "username": "stayinyourlane",
        "time": "1:34 AM",
        "message": "vehicula consequat",
        "isRead": true,
        "isViewed": false,
        "image": images[2]
      }]
    }


   } catch (error) {
    return [{
      "id": 2,
      "first_name": "Amanda",
      "last_name": "Grant",
      "username": "lmfaogrant",
      "time": "2:54 AM",
      "message": "rutrum",
      "isRead": false,
      "isViewed": false,
      "image": images[0]
    }, {
      "id": 1,
      "first_name": "Gloria",
      "last_name": "Hicks",
      "username": "hicksrgay",
      "time": "11:56 AM",
      "message": "viverra pede",
      "isRead": false,
      "isViewed": true,
      "image": images[1]
    }, {
      "id": 3,
      "first_name": "Gloria",
      "last_name": "Lane",
      "username": "stayinyourlane",
      "time": "1:34 AM",
      "message": "vehicula consequat",
      "isRead": true,
      "isViewed": false,
      "image": images[2]
    }]
    console.log(error)
   }
}


// const images = R.range(1, 11).map(i => require(`../images/image${i}.jpeg`))
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class HomeScreen extends React.Component {

  componentWillMount(){


  }

  componentDidMount() {
      function SockIO(){
        this.socket = SocketIOClient('https://torch-messenger.herokuapp.com/', { transports: ['websocket'], jsonp: false });


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

        this.authenticate = async function(){
          const userToken = await AsyncStorage.getItem('userToken');
          const username =  await AsyncStorage.getItem('username');
          let packet = { username: username, token: userToken }
          console.log(packet)
          this.send('authentication', packet);
        }
      }

      const sio = new SockIO();
      global.sio = sio;
      sio.connect()
      //global.socket = socket;
      sio.socket.on('connect', () => {
        sio.authenticate()
        console.log('connected to socket server');
        //socket.emit('ping');
      });
      sio.socket.on('connected', () => {

        console.log('connectedddd');
        //socket.emit('ping');
      });

      sio.socket.on('oops', (data) => {
        console.log(data);
        //socket.emit('ping');
      });

      sio.socket.on('echo', (data) => {
        console.log("echo: ", data)
        console.log(global.currentConvo)

        //socket.emit('ping');
      });

      sio.socket.on('authenticated', () => {
        console.log('authenticated')
      })

      sio.socket.on('private_message', (data) => {

        //console.log(this.state.convoList)

        convoList.forEach( (item, index) => {
          if (item.username == data.username){
            let newEntry = {
              "id": 9,
              "first_name": item.first_name,
              "last_name": item.last_name,
              "username": item.username,
              "time": "2:54 AM",
              "message": data.body,
              "isRead": false,
              "isViewed": false,
              "image": images[0]
            }
            this.state.convoList.splice(index, 1);
            this.state.convoList.unshift(newEntry);
            console.log(this.state.convoList)
            // data = global.convoList
            this.state.dataSource = ds.cloneWithRows(this.state.convoList)
            AsyncStorage.setItem("convoList", JSON.stringify(this.state.convoList.slice(0,200)));
          }
        })



        if (data.from == global.currentConvo) {
          // update convo list and nothing else lmao
        } else {
          let lmao = {
            _id: Math.round(Math.random() * 1000000),
            text: data.body,
            createdAt: new Date(),
            user: {
              _id: data.from,
              name: data.from,
              avatar: 'http://placeimg.com/140/140/people',
            },
          }


          try {
            const msgs = AsyncStorage.getItem(data.username + "_convo");
            msgs.then((e)=>{

              console.log(e)
              if (e) {
                let lol = GiftedChat.append(e, lmao)
                AsyncStorage.setItem(global.currentConvo + "_convo", JSON.stringify(lol.slice(0,200)));

                console.log("Saved: ", JSON.stringify(lol))

                global.messages = e;
              }else{
                console.log("null lmao")
                this.setState({
                  name: name,
                  messages: []
                })
              }
            })

          } catch (error) {
            // Error saving data
            console.log(error)
          }
        }

      });

      sio.socket.on('ping', () => {
        console.log('ping');
        global.stuff = Math.round(Math.random() * 1000000);
        console.log(global.currentConvo)
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


  constructor(props){
    super(props)

    let m = convos()
    while(m == null){

    }
    console.log(m)
    this.state = {
      dataSource: ds.cloneWithRows(mock),
    }
  }

  eachMessage(x){
    const num = Math.floor(Math.random() * 3) + 1

    if (num > 1) {
     return (
      // <TouchableOpacity onPress ={() => {this.props.navigator.push({id:'chat', image:x.image, name:x.first_name}) }}>
      <TouchableOpacity onPress ={() => {this.props.navigation.navigate('Chat', { name: x.username }); }}>
        <View style={{ alignItems:'center', padding:10, flexDirection:'row', borderBottomWidth:1, borderColor:'#f7f7f7' }}>
          {
            renderImages(x.image)
          }
          <View>
            <View style={{ flexDirection:'row', justifyContent:'space-between', width:280 }}>
              <Text style={{ marginLeft:15, fontWeight:'600' }}>{x.first_name} {x.last_name}</Text>
              <Text style={{ color:'#333', fontSize:10 }}>{x.time}</Text>
            </View>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
              <Text style={{ fontWeight:'400', color:'#333', marginLeft:15 }}>{x.message}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
   }

    return (
      //<TouchableOpacity>
      <TouchableOpacity onPress ={() => {this.props.navigation.navigate('Chat', { name: x.username }); }}>
        <View style={{ alignItems:'center', padding:10, flexDirection:'row', borderBottomWidth:1, borderColor:'#f7f7f7' }}>
          {
            renderImages(x.image)
          }
          <View>
            <View style={{ flexDirection:'row', justifyContent:'space-between', width:280 }}>
              <Text style={{ marginLeft:15, fontWeight:'600' }}>{x.first_name} {x.last_name}</Text>
              <Text style={{ color:'#333', fontSize:10 }}>{x.time}</Text>
            </View>
            <View style={{ flexDirection:'row', alignItems:'center' }}>
              <Icon name="done-all" size={15} color="#7dd5df" style={{ marginLeft:15, marginRight:5 }} />
              <Text style={{ fontWeight:'400', color:'#333' }}>{x.message}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (

      <View style={{ flex:1 }}>
      <ScrollView>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.eachMessage(rowData)}
        />
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
        </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
