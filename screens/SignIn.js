import React from 'react';
import axios from 'axios';
import {
  Image,
  TextInput,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  View,
  Alert,
} from 'react-native';


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    return (
      // <View>
      //   <Button title="Sign in!" onPress={this._signInAsync} />
      //   <Button title="Go to Details"  onPress={() => this.props.navigation.navigate('SignUp')} />
      // </View>
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <Button
          title={'Login'}
          style={styles.input}
          onPress={this._signInAsync}
        />
        <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={80} />
      </View>
    );
  }

  _signInAsync = async () => {
    const { username, password } = this.state;
    axios.post('https://torch-messenger.herokuapp.com/login', {
      username: username,
      password: password
    })
    .then((res) => {
      console.log(res.data)

      if (res.data.status == "ok"){
        const token = res.data.user_data.token;
        AsyncStorage.setItem('userToken', token);
        AsyncStorage.setItem('username', username);
        Alert.alert('Success', `You are now logged in!`);
        this.props.navigation.navigate('App');

      } else {
        Alert.alert('Error', `${res.data.error}`);
      }
    })
    //await AsyncStorage.setItem('userToken', token);

  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});

export default SignInScreen;
// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome to the app!',
//   };
//
//   render() {
//     return (
//       <View>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }
//
//   _showMoreApp = () => {
//     this.props.navigation.navigate('Other');
//   };
//
//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

// More code like OtherScreen omitted for brevity
