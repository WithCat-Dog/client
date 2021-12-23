import {Text} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; //아이콘 불러오기 
import { TouchableOpacity } from 'react-native-gesture-handler';
const writenoticebar={
    headerTitleAlign:'center',
    hederTintColor:'#ffd8cc',
    headerStyle:{
        backgroundColor:'#ffd8cc',
        

    },
    headerTitleStyle:{
        flex:1,
        paddingTop:10
    },
   
    headerLeft:()=>(
        <TouchableOpacity>
        <Icon style={{marginLeft:20}} size={25} name="chevron-back"/>
        </TouchableOpacity>
    ),
    headerTitle:'내가 원하는 펫시터 구하기'
}

export default writenoticebar;
