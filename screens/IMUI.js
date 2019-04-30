import React from 'react'
import {
  KeyboardAvoidingView,
  View,
  AsyncStorage,
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'



class Example extends React.Component {
  state = {
    messages: [],
  }

  componentWillUnmount(){
    console.log("Chat closed")
    global.currentConvo = "@none"
  }



  componentDidMount(){
    //this.props.renderUsernameOnMessage = true;
    //this.props.alwaysShowSend= true;


    sio.socket.on('private_message', (data) => {
      //console.log("echo: ", data);
      //console.log(global.currentConvo)
      //return;
      let lmao = {
        _id: Math.round(Math.random() * 1000000),
        text: data.body,
        createdAt: new Date(),
        user: {
          _id: data.from,
          username: data.from,
          avatar: 'http://placeimg.com/140/140/people',
        },
      }

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, lmao),
      }))
      try {
        AsyncStorage.setItem(global.currentConvo + "_convo", JSON.stringify(this.state.messages.slice(0,200)));
        //console.log("Saaaved: ", JSON.stringify(this.state.messages))
      } catch (error) {
        // Error saving data
        console.log(error)
      }
    });
  }
  componentWillMount() {
    try {
      const { navigation } = this.props;

      const name = navigation.getParam('username', 'nemo')

      global.currentConvo = name;
      const msgs = AsyncStorage.getItem(name + "_convo");
      msgs.then((e)=>{

        console.log(e)
        if (e) {
          //console.log("nice")
          this.setState({
            name: name,
            messages: JSON.parse(e)
          })
        }else{
          //console.log("null lmao")
          this.setState({
            name: name,
            messages: []
          })
        }
      })

     } catch (error) {
      //console.log("u gay lol")
      console.log(error)
     }
  }

  onSend(messages = []) {
    sio.send('private_message', { to: this.state.name, body: messages[0].text})
    console.log(messages[0].text)

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))


    // let kys = async function() {
    //  return await AsyncStorage.getItem(this.state.name + "_convo");
    // }
    // console.log(kys)
  }

  render() {
    try {
      AsyncStorage.setItem(this.state.name + "_convo", JSON.stringify(this.state.messages.slice(0,200)));
      //console.log(global.currentConvo)

      console.log("Saved: ", JSON.stringify(this.state.messages))
    } catch (error) {
      // Error saving data
      console.log(error)
    }
    return (
      <View style={{flex:1}}>
        <GiftedChat
          alwaysShowSend={true}
          renderUsernameOnMessage={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: "@me",
            username: "@me",
          }}
          />
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
      </View>
    )
  }
}

export default Example;
