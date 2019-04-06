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

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 2,
          text: 'Hey Daddy',
          createdAt: new Date(),
          user: {
            _id: "RN",
            name: 'React Native',
            avatar: 'http://placeimg.com/140/140/people',
          },
        },
        {
          _id: 1,
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
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <View style={{flex:1}}>
        <GiftedChat
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
