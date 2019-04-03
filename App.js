import React from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import SocketIOClient from 'socket.io-client'

import SignInScreen from "./screens/SignIn"
import AuthLoadingScreen from "./screens/AuthLoad"

import HomeScreen from "./screens/Home"
import DetailsScreen from "./screens/Details"


const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
