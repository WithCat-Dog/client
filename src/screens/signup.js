import * as React from 'react';
import {useState,Component} from 'react';
import {Image, SafeAreaView,View, Text,StyleSheet,TextInput,Button,Alert,TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


function signup ({navigation, routes}) {
    const [userName,setuserName] = useState('');
    const [userId,setuserId] = useState('');
    const [userPassword,setuserPassword] = useState('');
    const [confirmPw,setconfirmPw] = useState('');
    const [userNickname,setuserNickname] = useState('');
    const [userPhone,setuserPhone] = useState('');
    const [userEmail,setuserEmail] = useState('');

    
    return (
        <SafeAreaView  style={signupstyle.safe}>
            <View style = {signupstyle.topbar}>
                <Text style= {signupstyle.topbarfont}>회원 가입</Text>
            </View>
            
            <View style= {signupstyle.content}>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>이름</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="이름을 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserName(text);
                        }}
                    />
                </View>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>ID</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="아이디을 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserId(text);
                        }}
                    />
                </View>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>PW</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="비밀번호를 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserPassword(text);
                        }}
                    />
                </View>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>PW 확인</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="비밀번호를 다시 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setconfirmPw(text);
                        }}
                    />
                </View>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>닉네임</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="닉네임을 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserNickname(text);
                        }}
                    />
                </View>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>전화번호</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="이름을 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserName(text);
                        }}
                    />
                </View>
                <View style = {signupstyle.box}>
                    <Text style = {signupstyle.text}>이메일</Text>
                    <TextInput
                        style = {signupstyle.inputbox}
                        placeholder="이메일을 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserEmail(text);
                        }}
                    />
                </View>
                <View style={signupstyle.buttonView}> 
                    <TouchableOpacity style={signupstyle.button} onPress={()=>navigation.navigate('signup2',{
                        name : userName, id : userId, pw : userPassword, nickName : userNickname, tel : userPhone, email : userEmail
                    })}>
                        <Text style = {signupstyle.buttontext}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}




signupstyle= StyleSheet.create({
    safe:{
        flex:1
    },
    topbar:{
        backgroundColor:'#FFD8CC',
        flex:1,
        alignItems:'center',
        position:'relative',
    },
    topbarfont:{
        fontSize:20,
        top:15,
    },
    content:{
        backgroundColor:'white',
        flex:10,
    },  
    text:{
        textAlign:'center',
        textAlignVertical:'center',
            margin:5,
            fontSize:20,
            width:80,
            marginLeft:20,
            
       
    },
    inputbox:{
        borderColor:'gray',
        marginLeft:20,
        borderWidth:1,
        flex:1,
        width:120,
        margin:10,
        padding:3,
        paddingLeft:10,
        borderRadius:30,
        marginLeft:40,
        marginRight:40,
    },
    box:{
        flexDirection:'row',
        margin:5,
        top:3,
        flex:1,
    },
    button:{
        backgroundColor: '#DF5F5F',
        flexDirection:'row',
        alignContent:'center',
        height: 50,
        width: 140,
        borderRadius: 30,
        alignItems:'center',
        

    },
    buttontext :{
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign:'center',
        textAlignVertical:'center',
        paddingLeft:47,
    },
    buttonView:{
        flex:1,

        alignContent:'center',
        alignItems:'center',
    }
    

})
export default signup;