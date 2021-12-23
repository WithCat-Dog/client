import React, {useCallback, useMemo, useState, component} from 'react';
import { Image,SafeAreaView,View,Text,StyleSheet,TextInput, Button,Alert,TouchableOpacity ,CheckBox} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //아이콘 불러오기 


import signup from './signup';
import {setCookie,getCookie}from '../cookie/cookie';
//import {withRouter} from 'react-router-dom';

var islogin = false;
const loginPage = ({navigation}) => {
    const [userId , setUserId] = useState('');
    const [userPW , setUserPW] = useState('');
    //const [cookeis,setCookie,removeCookie]=(['rememberId'])
   
    const handleSubmitButton = () => {
        //입력 안할 시 
        if (!userId){alert('id를 입력해주세요');return;}
        if(!userPW){alert('비밀번호를 입력해주세요');return;}
         
        fetch("http://localhost:3030/auth/login", {
            method: "POST",
            body: JSON.stringify({ //request에 실을 데이터(객체타입)
                id: userId,
                pw: userPW
            }),
            headers: { //HTTP header와 대응되는 객체 
                'Content-type': 'application/json'
            }})
        // .then(response => console.log("response"))
        .then(res => res.json()) //fetch를 호출하면 가져올 객체 
        .then(res => {
            if (res.success) {
            ;
                alert('login 성공');
                //navigation.navigate('mainPage');
                //this.loginStatus; //이슈넘버(?) test
                //this.props.history.push("MainPage"); //잘 받아오면 mainPage로 이동

               
                setCookie('rememberId',res.cookie, {maxAge:10000*60});
                console.log(res.cookie);
                console.log('로그인성공'+getCookie('rememberId'));

                navigation.navigate ('main')
                

            } else if (!res.success) { //확인 
                alert("올바른 회원이 아닙니다");
                //this.props.history.push("loginPage");
                //토큰 저장
                console.log(res.success);
                

            }
        }).catch(err=>{
            alert(err)
            return false;
        })
    }




    
    return(
        <SafeAreaView style = {loginStyle.SafeArea}>
            <View style = {loginStyle.topbar}>
                <Text style= {loginStyle.topbarfont}>로그인</Text>
            </View>
            <View style = {loginStyle.wholebox}>
                <View style = {loginStyle.box}>
                    <Icon name = "person" size = {30} /> 
                    <TextInput
                        type="userName"
                        style={loginStyle.textInputBox}
                        placeholder ="아이디를 입력하시오."
                        onChange={(e) => {
                            const { eventCount, target, text } = e.nativeEvent;
                            setUserId(text);
                        }}
                    />
                    
                </View>
                <View style={loginStyle.box}>
                    <Icon name = "key" size = {30} /> 
                    <TextInput
                            type="passWord"
                            style={loginStyle.textInputBox}
                            placeholder ="비밀번호를 입력하시오."
                            onChange={(e) => {
                                const { eventCount, target, text } = e.nativeEvent;
                                setUserPW(text);
                            }}
                        />
                </View>
                <View style = {{left:-80}}>
                <View style = {loginStyle.submitButton}>
                    <TouchableOpacity style={loginStyle.button} onPress = {handleSubmitButton}>
                        <Text style={loginStyle.buttontext}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style = {loginStyle.signup}>
                    <TouchableOpacity style={loginStyle.submitButton} onPress={()=>{navigation.navigate('signup1')}}>
                            <Text style={loginStyle.buttontext}>회원 가입</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            
        </SafeAreaView>
       
    );
}


loginStyle= StyleSheet.create({
    topbar:{
        backgroundColor:'#FFD8CC',
        height:60,
        alignItems:'center',
        position:'relative',
    },
    topbarfont:{
        fontSize:20,
        top:15,
    },
    SafeArea:{ 
        backgroundColor:'white',
        height:800
    },
    wholebox:{
        margin:80,
        marginTop:200,

    },
    textInputBox:{
        borderColor:'gray',
        borderWidth:1,
        height:40,
        width:220,
        marginLeft:10,

    },
    box:{
        flexDirection:'row',
        margin:5,

    },
    icon:{
        backgroundColor:'grey',

    },
    submitButton:{
        backgroundColor: '#DF5F5F',
        alignItems: 'center',
        height: 50,
        width: 140,
        position: 'relative',
        top: 10,
        left: 130,
        borderRadius: 30,

    },
    
    buttontext:{
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15,
        color: 'white',
    },
    signup:{
        margin:5,
    },
    signupBtn:{
        alignItem:'flex-end',

    },
    signupText:{
        fontSize:10,
        fontColor:'gray',
        textDecorationLine:'underline',
    },

});
export default loginPage;