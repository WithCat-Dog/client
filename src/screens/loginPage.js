import * as React from 'react';
import {useState,Component} from 'react';
import signupPage from '../screens/signupPage';
import mainPage from '../screens/mainPage'
import { Image,SafeAreaView,View,Text,StyleSheet,TextInput, Button,Alert,TouchableOpacity ,CheckBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { render } from 'react-dom';
import { createStackNavigator } from '@react-navigation/stack';


import { createAppContainer } from 'react-navigation';
// const handleSubmitButon = () => {
//     //입력 안할 시 
//     if (!userId){
//         alert('id를 입력해주세요');
//         return;
//     }
//     if(!userPassword){
//         alert('비밀번호를 입력해주세요');
//         return;
//     }
//     //fetch 사용 
//     fetch("http://localhost:3001/api", {
//         method: "POST",
//         headers: { //HTTP header와 대응되는 객체 
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({ //request에 실을 데이터(객체타입)
//             email: loginID,
//             password: loginPw})
//     })
//     // .then(response => console.log("response"))
//     .then(response => response.json()) //fetch를 호출하면 가져올 객체 
//     .then(response => {
//         if (response.success) {
//             console.log('%{loginID}');
//             alert('login 성공');
//             this.loginStatus.
//             this.props.history.push("mainPage"); //잘 받아오면 mainPage로 이동
//         } else if (!response.success) { //확인 
//             alert("올바른 회원이 아닙니다");
//             this.props.history.push("loginPage");
//         }
//     });
// }

const loginPage = (props) => {
    const [userId , setUserId] = useState('');
    const [userPW , setUserPW] = useState('');
    // 회원정보 데이터 넘기는 함수 
    const handleSubmitButton = () => {
        //입력 안할 시 
        if (!userId){
            alert('id를 입력해주세요');
            return;
        }
        if(!userPW){
            alert('비밀번호를 입력해주세요');
            return;
        }
        //fetch 사용 
        fetch("http://localhost:3030/auth/login", {
            method: "POST",
            headers: { //HTTP header와 대응되는 객체 
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ //request에 실을 데이터(객체타입)
                id: userId,
                pw: userPW})
        })
        // .then(response => console.log("response"))
        .then(res => res.json()) //fetch를 호출하면 가져올 객체 
        .then(res => {
            if (res.success) {
                console.log('%{userID}');
                alert('login 성공');
                //this.loginStatus;
                //this.props.history.push("MainPage"); //잘 받아오면 mainPage로 이동
            } else if (!res.success) { //확인 
                alert("올바른 회원이 아닙니다");
                this.props.history.push("loginPage");
            }
        });
    }
    
    return(
        <SafeAreaView style={loginStyle.total}>
            <View style ={loginStyle.topbar}>
                <Text style={loginStyle.pagetextstyle}>
                            LOGIN
                </Text>
                <Image style={loginStyle.logoImage}
                    source={require('../../assets/IconImage.png')}
               />
            </View>
            <View style = {loginStyle.contents}>
                <View style={loginStyle.textinput}>
                    <TextInput
                        type="userId"
                        style={loginStyle.idTextInput}
                        placeholder="아이디를 입력해주세요"
                        onChange={(e) => {
                            const { eventCount, target, text } = e.nativeEvent;
                            setUserId(text);
                        }}
                    />
                    <TextInput 
                        type = "userPassword"
                        style={loginStyle.pwTextInput}
                        placeholder="비밀번호를 입력해주세요"
                        onChange={(e) => {
                            const { eventCount, target, text } = e.nativeEvent;
                            setUserPW(text);
                        }}

                    />
                    <View style = {loginStyle.smallText}>
                        <Button
                            type="signUpButton"
                            title="회원가입"
                            style={loginStyle.signUpButton}
                            onPress={()=>navigation.navigate('signupPage')}
                        />
                        <Button
                            type="OutLine"
                            title="ID/PW 찾기"
                            style={loginStyle.findIDPWButton}
                            onPress={()=>navigation.navigate('signupPage')}
                            />
                    </View>
                    
                    
                    
                </View>
                <View style ={loginStyle.belowbar}>
                    <TouchableOpacity style={loginStyle.button} onPress = {handleSubmitButton}>
                        <Text style={loginStyle.buttontext}>LOGIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
       
    );
}
const loginStyle = StyleSheet.create({
    total:{
        backgroundColor: '#FFEEDB',
    },
    topbar:{
        alignItems:'center',
        backgroundColor:'#FFEEDB',
        height:250,
        alignItems:'center',
    },
    pagetextstyle:{
        color:'black',
        alignItems:'center',
        fontSize:30,
        position:'relative',
        paddingTop:20,
    },
    logoImage:{
        width:320,
        height:160,
        resizeMode: 'contain' ,
    },
    contents:{
        alignItems:'center',
        borderRadius:50,
        backgroundColor:'#FFFFFF',
        position:'relative',
        top:-20,
        height:700,
        borderColor:'black',
        padding:20
    },    
    idTextInput:{
        padding:5, margin:5, marginTop:30,
        height:50,
        width:320,
        backgroundColor:'#FFEEDB',
        position:'relative',
        fontSize:15,
        top:-20,
        borderColor:'black',
    },
    pwTextInput:{
        padding:5, margin:5,
        height:50,
        width:320,
        backgroundColor:'#FFEEDB',
        position:'relative',
        fontSize:15,
        top:-20,
        borderColor:'black',
    },
    smallText:{
        flexDirection: 'row',  
    },
    signUpButton:{
        fontSize:10,
        margin:5,
    },
    findIDPWButton:{
        fontSize:10,
        margin:5,
    },
    belowbar:{
        flex:1,
    },
    button:{
        margin:10,
        backgroundColor:'#DF5F5F',
        alignItems:'center',
        height:50,
        width:320,
        position:'relative',
        borderRadius:30,
    },
    buttontext:{
        alignItems:'center',
        fontWeight:'bold',
        fontSize:20,
        marginTop:15,
        color:'white',


    },
})

export default loginPage;