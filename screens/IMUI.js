import React from 'react'
import {
  KeyboardAvoidingView,
  View
} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

class Example extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    sio.socket.on('echo', (data) => {
      console.log("echo: ", data);

      let lmao = {
        _id: this.state.messages.length,
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


      //socket.emit('ping');
    });
  }

  componentWillMount() {
    const { navigation } = this.props;
    const name = navigation.getParam('name', 'nemo')
    this.props.renderUsernameOnMessage = true;
    this.setState({
      name: name,
      messages: [
        {
          _id: "oneguy",
          text: name,
          createdAt: new Date(),
          user: {
            _id: "RN",
            name: 'React Native',
            avatar: 'http://placeimg.com/140/140/people',
          },
        },
        {
          _id: "fagboi",
          text: 'Hey no u',
          createdAt: new Date(),
          user: {
            _id: "Fag",
            name: 'Fag',
            avatar: 'http://placeimg.com/140/140/tech',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    sio.send('echo', { msg: messages[0].text})
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <View style={{flex:1}}>
        <GiftedChat
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
