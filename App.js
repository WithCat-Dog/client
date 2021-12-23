/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as React from 'react';
import {View,Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import signup from './src/screens/signup';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import signuptwo from './src/screens/signuptwo';
import loginPage from './src/screens/loginPage';
import searchPage from './src/screens/searchPage';
import mainPage from './src/screens/main';
import myPage from './src/screens/myPage';
import myPageAboutPet from './src/screens/myPageAboutPet';
import matching from './src/screens/matching';
import writeBoard from './src/screens/writeBoard';
import writenoticebar from './src/components/writenoticeBar';
import noticeList from './src/screens/noticeList';
import boardDetail from './src/screens/boardDetail';
import applier from './src/screens/applier';
import petDetail from './src/screens/petDetail';
import petList from './src/screens/petList';
<<<<<<< HEAD
import { setCookie,getCookie } from './src/cookie/cookie';
import Loading from './src/screens/Loading';
import Calendar from './src/screens/calendar';
=======
>>>>>>> feature_seoyoung
const signupnavigation = createStackNavigator();
const mainnavigation = createStackNavigator();
const myPagenavigation = createStackNavigator();
const searchnavigation = createStackNavigator();
const noticenavigation = createStackNavigator();
const splashnavigation = createStackNavigator();


// function splashStackScreen(){
//   return(
//     <splashnavigation.Navigator screenOptions = {({route})=>({headerShown:false})}>
//       <splashnavigation.Screen name = 'splash' component = {SplashScreen}/>
//       <splashnavigation.Screen name = 'auth' component = {signupStackScreen}/>
//       <splashnavigation.Screen name =  'mainstack' component = {mainpageStackScreen}/>
//     </splashnavigation.Navigator>
//   )
// }
<<<<<<< HEAD

=======
>>>>>>> feature_seoyoung
function signupStackScreen(){

  return(
    <signupnavigation.Navigator screenOptions = {({route})=>({headerShown:false})}>
<<<<<<< HEAD
      <signupnavigation.Screen name = 'loading' component ={Loading}/>
      <signupnavigation.Screen name = 'login' component ={loginPage}/>
      <signupnavigation.Screen name ="main" component ={mainpageStackScreen}/>
=======
      <signupnavigation.Screen name ="main" component ={mainpageStackScreen}/>
      <signupnavigation.Screen name = 'login' component ={loginPage}/>
>>>>>>> feature_seoyoung
      
      <signupnavigation.Screen name = "signup1" component = {signup}/>
      <signupnavigation.Screen name = "signup2" component ={signuptwo}/>
      
    </signupnavigation.Navigator>
  );
}
function mainpageStackScreen(){
  return(
    <mainnavigation.Navigator screenOptions = {({route})=>({headerShown:false})}>
<<<<<<< HEAD
     <mainnavigation.Screen name="mainpage" component={mainPage}/> 
=======
      <mainnavigation.Screen name="mainpage" component={mainPage}/>
>>>>>>> feature_seoyoung
      <mainnavigation.Screen name = "search" component={searchStackScreen}/>
      <mainnavigation.Screen name = "notice" component={noticeStackScreen}/>
      <mainnavigation.Screen name = "petList" component={petList}/>
      <mainnavigation.Screen name = 'petdetail' component={petDetail}/>
    </mainnavigation.Navigator>
  )

  
}

function searchStackScreen(){
  return (
    <searchnavigation.Navigator screenOptions = {({route})=>({headerShown:false})}>
      <searchnavigation.Screen name = "searchpage" component={searchPage}/>
      <searchnavigation.Screen name = "searchresult" component={matching}/>
      <searchnavigation.Screen name = "upload" component={noticeStackScreen}/>
    </searchnavigation.Navigator>
  )
}
function myPageStackScreen() {
  return(
    <myPagenavigation.Navigator>
      <myPagenavigation.Screen name = 'myPage' component={myPage} />
      <myPagenavigation.Screen name = 'myPageAboutPet' component={myPageAboutPet}/>
      <myPagenavigation.Screen name = 'petdetail' component={petDetail}/>
    </myPagenavigation.Navigator>
  )
}

function noticeStackScreen(){
  return(
    <noticenavigation.Navigator>
      <noticenavigation.Screen name ='noticelist' component={noticeList}/>
      <noticenavigation.Screen name ='writenotice' component={writeBoard} options={writenoticebar}/>
      <noticenavigation.Screen name ='boardDetail' component={boardDetail}/>
      <noticenavigation.Screen name ='applier' component={applier}/>
<<<<<<< HEAD
      <noticenavigation.Screen name ='calendar' component={Calendar}/>

=======
>>>>>>> feature_seoyoung
    </noticenavigation.Navigator>
  )
}



const Tabs = createBottomTabNavigator();
class App extends React.Component{
  render(){
<<<<<<< HEAD
    // const islogin = false;
    // if (getCookie('rememberId')){
    //   islogin=true;

    // }else{
    //   islogin=false;
    // }
    
    return (
      <NavigationContainer>
        <Tabs.Navigator
                
           initialRouteName='Home'
          
=======
    return (
      <NavigationContainer>
        <Tabs.Navigator
          initialRouteName='Home'
>>>>>>> feature_seoyoung
          screenOptions = {({route})=> ({
            tabBarIcon :({focused, color, size})=> {
              let iconName;
              if(route.name =='Notice'){
                iconName='clipboard-outline'
              }else if (route.name =='Home'){
                iconName = focused? 'home-sharp':'home-outline'
              }else if (route.name == 'Mypage'){
                iconName= 'person-outline'
              }

              return <Ionicons name ={iconName} size={size} color ={color} />;
            },
            tabBarActiveTintColor:'white',
            tabBarInactiveTintColor:'gray',
            tabBarStyle:{
              backgroundColor:'#FFD8CC',
            },
            headerShown:false
          })}
          
        >
            <Tabs.Screen name = "Notice" component={noticeStackScreen}/>
<<<<<<< HEAD
           <Tabs.Screen name = "Home"  component={signupStackScreen}/> 
              
            <Tabs.Screen name = "Mypage" component={myPageStackScreen}/>
            </Tabs.Navigator>
=======
            <Tabs.Screen name = "Home" component={signupStackScreen}/>
            <Tabs.Screen name = "Mypage" component={myPageStackScreen}/>
        </Tabs.Navigator>
>>>>>>> feature_seoyoung

      </NavigationContainer>
    );
  }
}

export default App;