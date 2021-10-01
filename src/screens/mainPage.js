import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { render } from 'react-dom';
import { createStackNavigator } from '@react-navigation/stack';
import Maintopbar from './Maintopbar';
import { createAppContainer } from 'react-navigation';

function mainPage({navigation}){
    return(
         
        
        <View style={styles.total}>
            
            <Maintopbar/> 
            <View style={styles.AppName}>
                <Text style ={{fontSize:50},{fontFamily:'BM'}}>
                    멍이랑 냥이랑 
                </Text>
            </View>
            <View style={styles.Buttons}>
                <Button
                    type="OutLine"
                    title="로그인"
                    containerStyle={{width:110,height:45,margin:10}}
                    titleStyle={{fontSize:25}}
                    onPress = {() =>navigation.navigate('loginPage')}
                    />
                  
                <Button
                    type="OutLine"
                    title="회원가입"
                    containerStyle={{width:110,height:45,margin:10}}
                    titleStyle={{fontSize:25}}
                    onPress={()=>navigation.navigate('signupPage')}
                    />

                
            </View>
    
        </View>
    );   
    
    
}

/*
const AppNavigator = createStackNavigator(
    {
        Home: mainPage,
        signupPage : signupPage
    },
    {
        initialRouteName:'Home',
    }
);*/
const styles = StyleSheet.create({
    total:{
        height:700,
        top:52,
    },
    AppName:{
        fontFamily:'BM',
        flex:4,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'pink',
    },
    Buttons:{
        flex:4.5,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
    },
});
export default mainPage;