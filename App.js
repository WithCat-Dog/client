import * as React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { Component } from 'react';
import signupPage from './src/screens/signupPage';
import loginPage from './src/screens/loginPage';
import mainPage from './src/screens/mainPage';
import { createAppContainer } from 'react-navigation';
import * as Font from 'expo-font';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitioningView } from 'react-native-reanimated';
const Tabs = createBottomTabNavigator();

const Stack = createStackNavigator();
/*일단 하단탭 네비게이션 보여줄라고 임의로 함수 작성한거!! Petsitter MyPage 등등 나중에 작성하면 그걸로 바꿔야해*/ 
function noticeboard({navigation}){
  return(
    <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>noticeboard!</Text>

    </View>
  );
}
function Petsitter({navigation}){
  return(
    <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Petsitter!</Text>
    </View>
  );
}
function Mypage({navigation}){
  return (
    <View style ={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text>Mypage!</Text>
    </View>
  );
}
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
    /*하단 네비게이션 탭바*/ 
    <NavigationContainer>
      <Tabs.Navigator 
        screenOptions ={({route}) => ({

          tabBarIcon :({focused, color, size})=>{
            let iconName;
            if (route.name == 'Home'){
              iconName ='home'

            }else if (route.name =='Petsitter'){
              iconName = 'paw'

            }else if(route.name == 'noticeboard'){
              iconName = focused ? 'file-text':'file-text-o'
            }else if(route.name == 'Mypage'){
              iconName = focused ? 'user':'user-o'
            }

            return <FontAwesome name={iconName} size={size} color= {color}/>;
          },
          tabBarActiveTintColor:'white',
          tabBarInactiveTintColor:'gray',
          tabBarStyle:{
            backgroundColor:'#FFD8CC',
          },
          headerShown:false
        })}
      
      >
        <Tabs.Screen name ="Home" component={mainPage}/>
        <Tabs.Screen name = "Petsitter" component={Petsitter}/>
        <Tabs.Screen name = "noticeboard" component={noticeboard}/>
        <Tabs.Screen name = "Mypage" component={Mypage}/>
        </Tabs.Navigator>
      
    
      

    </NavigationContainer>
    
  );

    }
}


export default App;
