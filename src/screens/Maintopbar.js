import React from "react";
import { Container,Content , Header,Left,Right,Body, render, Column } from 'native-base';
import { StyleSheet,View,Text, Image,Fragment,SafeAreaView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Maintopbar(){
        return(
            <SafeAreaView style ={{backgroundColor:'#FFD8CC',height:52}}>
                <View style={topbarstyle.topbar}>
                <Icon style= {topbarstyle.iconStyle} name='bars' size={30} color='white'/>
                <Icon style= {topbarstyle.iconStyle} name='bell-o' size={30} color='white'/>
                
                </View>
            </SafeAreaView>
        );
        
    
    
}

const topbarstyle = StyleSheet.create({
    topbar : {
        flexDirection:'row-reverse'
    },
    iconStyle : {
        top:7,
        padding:7,

    }
})

