import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  ListView,
  Image,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import renderImages from '../assets/mock/mockImage';

// instead of this, write to a databse and to achive message reordering, just delete the
// element from a username when it sends a new message and send the new messge
// to the top every time kinda like shufflling cards, this would also sort as messages are received
// instead of by timestamp making it harder to manipulate chats list order like people do in kik
import { images, data } from '../assets/mock/mockChatList';

// const images = R.range(1, 11).map(i => require(`../images/image${i}.jpeg`))
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class Chats extends Component {
  constructor(props){
    super(props)

    this.state = {
      dataSource: ds.cloneWithRows(data),
    }
  }

  eachMessage(x){
    const num = Math.floor(Math.random() * 3) + 1

    if (num > 1) {
     return (
      <TouchableOpacity onPress ={() => {this.props.navigator.push({id:'chat', image:x.image, name:x.first_name}) }}>
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
              <Text style={{ fontWeight:'400', color:'#333', marginLeft:15 }}>Can I come over to yours tonight?</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
   }

    return (
      <TouchableOpacity>
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
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.eachMessage(rowData)}
        />
      </View>
    );
  }
}

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
