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
  "last_word": "@me",
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
  "last_word": "@me",
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
  "last_word": "@me",
  "time": "1:34 AM",
  "message": "vehicula consequat",
  "isRead": true,
  "isViewed": false,
  "image": images[2]
}]

// var convos = async function () {
//   try {
//     var e = await AsyncStorage.getItem("convoList");
//     console.log(e)
//     if (e) {
//       global.convoList = e;
//       return e
//     }else{
//       return mock
//     }
//
//
//    } catch (error) {
//     return mock
//     console.log(error)
//    }
// }


// const images = R.range(1, 11).map(i => require(`../images/image${i}.jpeg`))
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class HomeScreen extends React.Component {


  componentWillUnmount() {
    //console.log("componentWillUnount")
  }

  componentWillMount(){
    //console.log("componentWillMount")

  }

  componentDidMount() {
    //console.log("componentDidMount")

    try {
      let m = AsyncStorage.getItem("convoList");
      m.then((e)=>{
        //console.log(e)
        if (e) {
          //console.log("nice")
          global.convoList = JSON.parse(e)
          this.setState({
            username: this.state.username ? this.state.username : "null",
            isLoading: false,
            convoList: JSON.parse(e)
          })

        }else{
          //console.log("null lmao")
          global.convoList = mock
          this.setState({
            username: this.state.username ? this.state.username : "null",
            isLoading: false,
            convoList: mock
          })
        }
      })
     } catch (error) {
       global.convoList = mock
       this.setState({
         username: this.state.username ? this.state.username : "null",
         isLoading: false,
         convoList: mock
       })
      console.log(error)
     }


      function SockIO(component){
        this.socket = SocketIOClient('https://torch-messenger.herokuapp.com/', { transports: ['websocket'], jsonp: false });

        this.component = component;
        this.connect = function(){
          this.socket.connect();
        }

        this.send = function(namespace, data = null){
          // DEBUG::  this is already a socketio object so that means this.state applies to this object
          // DEBUG::  and not the actual session so write a function that updates the state outside of this
          // DEBUG::  object so that itll be in the whole component state
          // DEBUG::
          // DEBUG::


          if (data){
            switch(namespace){
              case "private_message":
                //console.log(this.component.state)
                //console.log("wow lol")

                for (i = 0; i < this.component.state.convoList.length; i++) {
                  let item = this.component.state.convoList[i]
                  //console.log(data)
                  //console.log(item.username, ", ", data.to)
                  if (item.username == data.to){
                    //console.log("found it")
                    let newEntry = {
                      "id": Math.round(Math.random() * 1000000),
                      "first_name": item.first_name,
                      "last_name": item.last_name,
                      "username": item.username,
                      "last_word": "@me",
                      "time": "2:54 AM",
                      "message": data.body,
                      "isRead": false,
                      "isViewed": false,
                      "image": item.image
                    }
                    global.convoList.splice(i, 1);
                    global.convoList.unshift(newEntry);
                    //console.log(global.convoList)
                    let newState = this.component.state;
                    newState.convoList = global.convoList;
                    this.component.setState(newState)
                    // data = global.convoList
                    //console.log(this.component.state)
                    AsyncStorage.setItem("convoList", JSON.stringify(global.convoList.slice(0,200)));
                  }
                }

            }
            this.socket.emit(namespace, data);
          } else {
            this.socket.emit(namespace);
          }
        }

        this.authenticate = async function(){
          const userToken = await AsyncStorage.getItem('userToken');
          const username =  await AsyncStorage.getItem('username');
          // let newState = this.state;
          // newState.username = username;
          // this.setState(newState)
          let packet = { username: username, token: userToken }
          console.log(packet)
          this.send('authentication', packet);
        }
      }

      const sio = new SockIO(this);
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
        //return;
        this.state.convoList.forEach( (item, index) => {
          if (item.username == data.from){
            let newEntry = {
              "id": Math.round(Math.random() * 1000000),
              "first_name": item.first_name,
              "last_name": item.last_name,
              "username": item.username,
              "last_word": item.username,
              "time": "2:54 AM",
              "message": data.body,
              "isRead": false,
              "isViewed": false,
              "image": item.image
            }
            this.state.convoList.splice(index, 1);
            this.state.convoList.unshift(newEntry);
            //console.log(this.state.convoList)
            let newState = this.state;
            newState.convoList = this.state.convoList;
            this.setState(newState)
            // data = global.convoList
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
            const msgs = AsyncStorage.getItem(data.from + "_convo");
            msgs.then((e)=>{

              console.log(e)
              if (e) {
                let lol = GiftedChat.append(JSON.parse(e), lmao)
                AsyncStorage.setItem(data.from + "_convo", JSON.stringify(lol.slice(0,200)));

                //console.log("Saved: ", JSON.stringify(lol))

                global.messages = e;
              }else{
                let lol = GiftedChat.append([], lmao)
                //console.log(lol)

                AsyncStorage.setItem(data.from + "_convo", JSON.stringify(lol.slice(0,200)));
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
        //console.log(global.currentConvo)
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
    console.log("constructor")
    console.log("componentWillMount")
    this.state = {
      isLoading: true
    };
  }

  eachMessage(){
    const num = Math.floor(Math.random() * 3) + 1
    return this.state.convoList.map(x => {
      //console.log(x)
      if (x.last_word == "@me") {

        //console.log("micky has the last word")
        return (
        <TouchableOpacity key={x.id} onPress ={() => {this.props.navigation.navigate('Chat', { username: x.username }); }}>
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
        </TouchableOpacity>)

      } else {

        //console.log(this.state.username)

        return (
          //<TouchableOpacity>
          <TouchableOpacity key={x.id} onPress ={() => {this.props.navigation.navigate('Chat', { username: x.username }); }}>
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

    });

   //  if (num > 1) {
   //   return (
   //    // <TouchableOpacity onPress ={() => {this.props.navigator.push({id:'chat', image:x.image, name:x.first_name}) }}>
      // <TouchableOpacity onPress ={() => {this.props.navigation.navigate('Chat', { name: x.username }); }}>
      //   <View style={{ alignItems:'center', padding:10, flexDirection:'row', borderBottomWidth:1, borderColor:'#f7f7f7' }}>
      //     {
      //       renderImages(x.image)
      //     }
      //     <View>
      //       <View style={{ flexDirection:'row', justifyContent:'space-between', width:280 }}>
      //         <Text style={{ marginLeft:15, fontWeight:'600' }}>{x.first_name} {x.last_name}</Text>
      //         <Text style={{ color:'#333', fontSize:10 }}>{x.time}</Text>
      //       </View>
      //       <View style={{ flexDirection:'row', alignItems:'center' }}>
      //         <Text style={{ fontWeight:'400', color:'#333', marginLeft:15 }}>{x.message}</Text>
      //       </View>
      //     </View>
      //   </View>
      // </TouchableOpacity>
   //  )
   // }

    // return (
    //   //<TouchableOpacity>
    //   <TouchableOpacity onPress ={() => {this.props.navigation.navigate('Chat', { name: x.username }); }}>
    //     <View style={{ alignItems:'center', padding:10, flexDirection:'row', borderBottomWidth:1, borderColor:'#f7f7f7' }}>
    //       {
    //         renderImages(x.image)
    //       }
    //       <View>
    //         <View style={{ flexDirection:'row', justifyContent:'space-between', width:280 }}>
    //           <Text style={{ marginLeft:15, fontWeight:'600' }}>{x.first_name} {x.last_name}</Text>
    //           <Text style={{ color:'#333', fontSize:10 }}>{x.time}</Text>
    //         </View>
    //         <View style={{ flexDirection:'row', alignItems:'center' }}>
    //           <Icon name="done-all" size={15} color="#7dd5df" style={{ marginLeft:15, marginRight:5 }} />
    //           <Text style={{ fontWeight:'400', color:'#333' }}>{x.message}</Text>
    //         </View>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // )
  }

  render() {
    console.log("render")
    if (this.state.isLoading) {
      return <View><Text>Loading...</Text></View>;
    }

    //console.log("convolist: ", this.state.convoList)

    var Messages = this.eachMessage();
    //console.log(Messages)
    return (

      <View style={{ flex:1 }}>
      <ScrollView>
        {Messages}
        <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      </ScrollView>
      </View>

      // <ListView
      //   dataSource={this.state.dataSource}
      //   renderRow={(rowData) => this.eachMessage(rowData)}
      // />
      //<ListView>

      //</ListView

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
