import  React,{useEffect} from 'react';
import {Image, SafeAreaView,View, Text,StyleSheet,TextInput,Button,Alert,TouchableOpacity} from 'react-native';

import { get } from '../../../server/routes/auth';
import { getCookie } from '../cookie/cookie';


export default Loading = ({navigation})=>{
    useEffect(()=>{
        setTimeout(()=>{
            if(getCookie('rememberId')){
                navigation.navigate('main')
            }else {
                console.log('logtincoolie',getCookie('rememberId'));
                navigation.navigate('login');
            }
        },2000);
    },[getCookie('rememberId')])
    return (
         
        <SafeAreaView style = {{backgroundColor:'#E98580',flex:1,alignItems:'center'}}>
            
                <View style={{flex:1}}>
                    <Image  source={require('../assets/images/SplashScreen.gif')}/>
                </View>
            
        </SafeAreaView>
    )

}

styles = StyleSheet.create({

    imgView:{flex:5,marginTop:30,},
    imageView : {
        borderRadius : 140,
        width : 300,
        height : 300,
        backgroundColor : 'white'
    },
    imageStyle : {
        width : 300,
        height : 300
    },
})