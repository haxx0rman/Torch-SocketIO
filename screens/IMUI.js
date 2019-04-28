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

  componentDidMount(){
    //this.props.renderUsernameOnMessage = true;
    //this.props.alwaysShowSend= true;


    sio.socket.on('echo', (data) => {
      console.log("echo: ", data);
      console.log(global.currentConvo)

      let lmao = {
        _id: Math.round(Math.random() * 1000000),
        text: "Echo: " + data.msg,
        createdAt: new Date(),
        user: {
          _id: "echo",
          name: 'echo',
          avatar: 'http://placeimg.com/140/140/people',
        },
      }

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, lmao),
      }))
      try {
        AsyncStorage.setItem(global.currentConvo + "_convo", JSON.stringify(this.state.messages.slice(0,200)));
        global.messages = this.state.messages.slice(0,200);
        console.log("Saved: ", JSON.stringify(this.state.messages))
      } catch (error) {
        // Error saving data
        console.log(error)
      }
    });
  }
  componentWillMount() {
    try {
      const { navigation } = this.props;

      const name = navigation.getParam('name', 'nemo')

      global.currentConvo = name;
      const msgs = AsyncStorage.getItem(name + "_convo");
      msgs.then((e)=>{

        console.log(e)
        if (e) {
          console.log("nice")
          this.setState({
            name: name,
            messages: JSON.parse(e)
          })
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
      console.log("u gay lol")
      console.log(error)
     }
  }

  onSend(messages = []) {
    sio.send('echo', { msg: messages[0].text})
    console.log("lol ok")
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))



    try {
      AsyncStorage.setItem(this.state.name + "_convo", JSON.stringify(this.state.messages.slice(0,200)));
      global.messages = this.state.messages.slice(0,200);
      console.log("Saved: ", JSON.stringify(this.state.messages))
    } catch (error) {
      // Error saving data
    }

    // let kys = async function() {
    //  return await AsyncStorage.getItem(this.state.name + "_convo");
    // }
    // console.log(kys)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <GiftedChat
          alwaysShowSend={true}
          renderUsernameOnMessage={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: "ME",
          }}
          />
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
      </View>
    )
  }
}

export default Example;
