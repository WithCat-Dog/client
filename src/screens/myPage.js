import React, {useCallback, useState, useMemo, useEffect, useRef} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import DialogInput from 'react-native-dialog-input';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import logo from '../assets/images/mung.png'
import { CommonActions } from '@react-navigation/native';

import { getCookie,removeCookie } from '../cookie/cookie';
const header = ()=>{
    return(
    <View style = {styles.header}>
        <Text style={styles.headertext}>마이페이지</Text>
    </View>
    )


}
const myPage = ({navigation})=>{

    const mounted = useRef(false);


    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [tel, setTel] = useState(''); 

    const [pw, setPw] = useState("");
    
    const [nicknameDialog, setNicknameDialog] = useState(false);
    const [telDialog, setTelDialog] = useState(false);
    const [pwDialog, setPwDialog] = useState(false);


    // useEffect( ()=>{
    //     // if(!mounted.current){
    //     //     mounted.current=true;
    //     // }else{
    //         setNickname(nickname);
    //         console.log("닉넹:"+nickname);
    //         handleChangeNick();
        
    // },[nickname]);  

    useEffect(()=>{
        try{
            console.log('마이페이지 아이디',getCookie('rememberId'));
            fetch('http://localhost:3030/mypage/userInfo', { 
                method: "POST",
                body: JSON.stringify({ //request에 실을 데이터(객체타입)
                    id:getCookie('rememberId')
                }), 
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .then((res)=> {      
                if(res.success===false){
                    alert('개인정보 불러오기 오류');
                   
                }else if(res.success === true){
                    console.log('회원가입 정보 불러오기 성공');
                    
                    setNickname(res.data[0].nickname);
                    setName(name =>res.data[0].name);
                    setTel(tel => res.data[0].tel);
                    setEmail(tel=> res.data[0].email);
                    setId(getCookie('rememberId'));
                } 
            }) 
        }catch(e){
            console.log(e);
        }
    },[]);  


    const changeInfo = useCallback((menu)=>{
        if(menu=="PW"){
            setPwDialog(true);
        }else if(menu=="전화번호"){
            setTelDialog(true);
        }else if(menu=="닉네임"){
            setNicknameDialog(true);
        }
    },[]);

    const logoutbutton = ()=>{
        try{
            fetch('http://localhost:3030/auth/logout', { 
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .then((res)=> {      
                if(res.success){
                    alert('로그아웃 성공');
                    removeCookie('rememberId');
                    navigation.dispatch(
                        CommonActions.reset({
                            index:0,
                            routes : [{name:'login'}]
                        })
                    )
                }else{
                    alert('로그아웃 실패')  
                } 
            })
        }catch(e){
            console.log(e);
        }

    }

    const Buttons = ({menu})=>{
        return(
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>changeInfo(menu)}>
                {/* <Text style={{fontSize:16}}>{menu}</Text> */}
                <Text style={{fontSize:16,color:'white'}}>변경하기</Text>
            </TouchableOpacity>
        )
    };

    const Info = useCallback( ({infoName, info}) => { 
        return(
            <View style={styles.infos}>
                <Text style={styles.infoNameStyle}>{infoName}</Text>
                <Text style={styles.infoTextStyle}>{info}</Text>
            </View>
        )
    },[nickname, tel, pw]);

     
    const handleChangeNick = useCallback((nick)=>{
        if(!mounted.current){
            mounted.current=true;
        }else{
            try{
            fetch('http://localhost:3030/mypage/changeNickname', { 
                        method: "POST",
                        body: JSON.stringify({
                            id : getCookie('rememberId'),
                            newNickname : nick

                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(res=>res.json())
                    .then(res=>{console.log(res)})

            }catch(e){
                console.log(e);
            }
        } 
    },[]);

    const handleChangeTel= useCallback((phone)=>{
        if(!mounted.current){
            mounted.current=true;
        }else{
            try{
            fetch('http://localhost:3030/mypage/changeTel', { 
                        method: "POST",
                        body: JSON.stringify({
                            id : getCookie('rememberId'),
                            newTel : phone

                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(res=>res.json())
                    .then(res=>{console.log(res)})
            }catch(e){
                console.log(e);
            }

        }
    },[]);
     
    return(
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <View style={styles.topView}>
                {header()}

                <View style={{ flex:1.5,marginTop:10, justifyContent : 'center',alignItems : 'center'}}>
                    <View style={styles.imageView}>
                        <Image source={logo} style={styles.imageStyle}/>
                    </View>
                    <View style = {{top:'10%' ,alignItems:'flex-end'}}>
                    <Text style = {{fontSize:18}}onPress={()=>{navigation.navigate('myPageAboutPet')}}>내 펫 정보보기 (click!)</Text>
                    </View>
                </View>
                <View style = {{alignItems:'center', top:'2%'}}>
                    <TouchableOpacity onPress={logoutbutton} style={{alignItems:'center',width:120,borderRadius:15,backgroundColor:'#df5f5f',height:45}}>
                        <Text style={{top:10,color:'white',fontSize:20}}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoView}>
                    <Info infoName="이름" info={name} />
                    <Info infoName="ID" info={id}/>
                    <Info infoName="Email" info={email}/>
                        <Info infoName="닉네임" info={nickname}/>
                
                        <Info infoName="전화번호" info={tel}/>
                    
                </View>
            </View>
           
           <View style = {{position:'absolute', top:'68%',left:'68%'}}>
               <View style = {{marginBottom:18}}><Buttons menu="닉네임"/></View>
             <View style ={{marginTop:18}}><Buttons  menu="전화번호"/></View>
             
           </View>
           <View style ={{flex:0.9,left:'10%'}}>

               <TouchableOpacity style = {{flex:1}} onPress={()=>navigation.navigate('mynoticelist')}>

                   <Text style ={{fontSize:20,fontWeight:'bold'}}>
                       내가 쓴 게시글 보러가기
                   </Text>
               </TouchableOpacity>

           </View> 

            <DialogInput isDialogVisible={pwDialog}
                title={"비밀번호 변경"}
                message={"새 비밀번호를 입력하세요"}
                hintInput={"비밀번호 입력"}
                submitInput = {(inputText) => {setPw(inputText); setPwDialog(false); }}
                closeDialog={()=>{setPwDialog(false)}}>
            </DialogInput>  
            
            <DialogInput isDialogVisible={telDialog}
                title={"전화번호 변경"}
                message={"새 전화번호를 입력하세요"}
                hintInput={"전화번호 입력"}
                submitInput = {(inputText) => {setTel(inputText); setTelDialog(false);handleChangeTel(inputText);}}
                closeDialog={()=>{setTelDialog(false)}}>


            </DialogInput>  

            <DialogInput isDialogVisible={nicknameDialog}
                title={"닉네임 변경"}
                message={"새 닉네임을 입력하세요"}
                hintInput={"닉네임 입력"}
                submitInput = {(inputText) => {setNickname(inputText);setNicknameDialog(false);handleChangeNick(inputText)}}

                closeDialog={()=>{setNicknameDialog(false); }}>
            </DialogInput>  
        </SafeAreaView>
    )
}
 
const styles = StyleSheet.create({
    topView : {
        flex:8,
    },
    bottomView : {
        flex : 2,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
    }, 
    infoView : {
        // left:20,
        flex : 3,
        top:45,
        borderTopWidth:1,
        borderRadius:25,
        alignItems:'center',      
    
    },
    infoNameStyle : {
        flex : 3, 
        paddingLeft : 30, 
        fontSize :18,
        color:"black",
        fontWeight:'bold'
    },
    infoTextStyle : {
        borderBottomWidth:3,
        borderBottomColor : 'gray',
        //borderRadius : 10,
        flex : 7,
        marginRight: 30,
        fontSize : 17,
        color:"black",
        padding : 5
    },
    infos : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        // flex : 0.2,
        height:60,
        borderBottomColor:'gray',
        borderBottomWidth:1,
        width:'85%'



    },
    buttonStyle :{ 
        backgroundColor : "#df5f5f",
        margin : 10,
        borderRadius : 20,
        width:80,
        height:20,
        alignItems : "center"
        
    },
    imageView : {
        borderWidth:1,
        borderRadius : 75,
        width : 120,
        height : 120,
        backgroundColor : 'white'
    },
    imageStyle : {
        width : 120,
        height : 120
    },
    header:{
        alignItems:'center',
        height:60,
        backgroundColor:'#FFD8CC',
        width:'100%',

    },
    headertext:{
        alignItems:'center',
        fontSize:20,
        top:15
       

    },
    
})

export default myPage;