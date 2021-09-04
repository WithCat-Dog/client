import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { Component } from 'react';
import signupPage from './src/screens/signupPage';
import loginPage from './src/screens/loginPage';
import mainPage from './src/screens/mainPage';
import { createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';
const Stack = createStackNavigator();


class App extends React.Component{

  state = {
    isReady : false
  }
  componentDidMount = async() => {
    await Font.loadAsync({
      BM: require("./assets/fonts/BMYEONSUNG_otf.otf")
    });
    this.setState({isReady:true});
  }
  render(){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions = {{
        headerShown:false,
      }}>
        <Stack.Screen name="mainPage" component={mainPage}/>
        <Stack.Screen name="loginPage" component={loginPage}/>
        <Stack.Screen name="signupPage" component={signupPage}/>
      </Stack.Navigator>

    </NavigationContainer>
  )

    }
}
export default App;
