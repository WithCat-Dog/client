import * as React from 'react';
import {useState,Component} from 'react';
import {Image, SafeAreaView,View, Text,StyleSheet,TextInput,Button,Alert,TouchableOpacity} from 'react-native';

import {RadioButton} from 'react-native-paper';

// import RadioGroup from 'react-native-radio-buttons-group';
// import  Checkbox  from 'react-native-check-box';
// import { set } from 'react-native-reanimated';
// const genderadioData =[{id:'1',label:'여자',value:'여성',},{id:'2',label:'남자',value:'남성',}]
// const expData=[{id:1,label:'있음',value:1,},{id:2,label:'없음', value:0}]
// const certifiData=[{id:1,label:'있음',value:1,},{id:2,label:'없음', value:0}]
// const petkindsData = [{id:1,label:'강아지',value:"강아지",},{id:2,label:'고양이',value:"고양이",}]

function signuptwo({route, navigation}){
    const { name,id, pw, nickName, tel, email } = route.params;
    console.log("\nname:"+name+"\nid:"+id+"\npw"+pw+"\nnickName:"+nickName+"\ntel:"+tel+"\nemail:"+email);
    const [gendervalue,setgenderValue] = useState('여성');
    const [exprvalue,setexpValue] = useState("1");
    const [certifivalue,setcertifiValue] = useState("1");
    const [petkindvalue,setpetkindvalue]=useState("강아지");
    const [userAge, setuserAge] = useState(0);
    const [petSize,setPetSize] = useState('소형');
    console.log("\ngendervalue:"+gendervalue+"\nexprvalue:"+exprvalue+"\ncertivalue:"+certifivalue+"\npetKinds:"+petkindvalue+"\npetSize:"+petSize);


    const handleSignUpButton = ()=>{
        fetch('http://localhost:3030/auth/join', { 
                    method: "POST",
                    body: JSON.stringify({
                        id: id,
                        pw: pw,
                        name: name,
                        nickname: nickName,
                        tel: tel,
                        email: email,
                        sex: gendervalue,
                        age: userAge,
                        residence:"ex5",
                        experience: parseInt(exprvalue),
                        license: parseInt(certifivalue),
                        type: petkindvalue,
                        size:petSize,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }).then(res =>res.json())
                .then(res => { alert(res.data); })
        }
    return(
        <SafeAreaView style={{flex:1}}>
            <View style = {signupstyle2.topbar}>
                <Text style= {signupstyle2.topbarfont}>회원 가입</Text>
            </View>
            
            <View style= {signupstyle2.content}>
                <View style ={signupstyle2.box}>
                    <Text style = {signupstyle2.text}>성별</Text>
                    <View style={signupstyle2.radioBox}>
                        <RadioButton
                            style={signupstyle2.radio}
                            value="여성"
                            status={gendervalue==='여성'? 'checked':'unchecked'}
                            onPress={()=> setgenderValue('여성')}/>
                        <Text style = {signupstyle2.radioText}>여성</Text>
                        
                        <RadioButton
                            style={signupstyle2.radio}
                            value="남성"
                            status={gendervalue==='남성'? 'checked':'unchecked'}
                            onPress={()=> setgenderValue('남성')}/>
                        <Text style = {signupstyle2.radioText}>남성</Text>
                    </View>
                </View>
               
                
                
                <View style = {signupstyle2.box}>
                    <Text style = {signupstyle2.text}>나이</Text>
                    <TextInput
                        style = {signupstyle2.inputbox}
                        placeholder="나이를 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            setuserAge(text);
                        }}
                    />
                </View>
                <View style = {signupstyle2.box}>
                    <Text style = {signupstyle2.text}>거주지</Text>
                    <TextInput
                        style = {signupstyle2.inputbox}
                        placeholder="거주지를 입력해주세요"
                        onChange = {(e)=> {
                            const{eventCount,target,text}= e.nativeEvent;
                            //setuserPassword(text);
                        }}
                    />
                </View>
                <View style ={signupstyle2.box}>

                    <Text style = {signupstyle2.text}>반려동물키운경험</Text>
                    <View style={signupstyle2.radioBox}>
                        <RadioButton
                            style={signupstyle2.radio}
                            value="1"
                            status={exprvalue=='1'? 'checked':'unchecked'}
                            onPress={()=> setexpValue('1')}/>
                        <Text style = {signupstyle2.radioText}>있음</Text>
                        
                        <RadioButton
                            style={signupstyle2.radio}
                            value="0"
                            status={exprvalue=='0'? 'checked':'unchecked'}
                            onPress={()=> setexpValue('0')}/>
                        <Text style = {signupstyle2.radioText}>없음</Text>
                        </View>
                </View>
                <View style ={signupstyle2.box}>
                    <Text style = {signupstyle2.text}>자격증여부</Text>
                    <View style={signupstyle2.radioBox}>
                        <RadioButton
                            style={signupstyle2.radio}
                            value="1"
                            status={certifivalue=='1'? 'checked':'unchecked'}
                            onPress={()=> setcertifiValue('1')}/>
                        <Text style = {signupstyle2.radioText}>있음</Text>
                        
                        <RadioButton
                            style={signupstyle2.radio}
                            value="0"
                            status={certifivalue=='0'? 'checked':'unchecked'}
                            onPress={()=> setcertifiValue('0')}/>
                        <Text style = {signupstyle2.radioText}>없음</Text>
                    </View>
                </View>
                <View style ={signupstyle2.box}>
                    <Text style = {signupstyle2.text}>케어가능동물</Text>
                    <View style={signupstyle2.radioBox}>
                        <RadioButton
                            sstyle={signupstyle2.radio}
                            value="강아지"
                            status={petkindvalue=='강아지'? 'checked':'unchecked'}
                            onPress={()=> setpetkindvalue('강아지')}/>
                        <Text style = {signupstyle2.radioText}>강아지</Text>
                        
                        <RadioButton
                            style={signupstyle2.radio}
                            value="고양이"
                            status={petkindvalue=='고양이'? 'checked':'unchecked'}
                            onPress={()=> setpetkindvalue('고양이')}/>
                        <Text style = {signupstyle2.radioText}>고양이</Text>
                    </View>
                </View>
                <View style ={signupstyle2.box}>
                    <Text style = {signupstyle2.text}>케어가능동물사이즈</Text>
                    <View style={signupstyle2.radioBox}>
                        <RadioButton
                            style={signupstyle2.radio}
                            value="소형"
                            status={petSize=='소형'? 'checked':'unchecked'}
                            onPress={()=> setPetSize('소형')}/>
                        <Text style = {signupstyle2.radioText}>소형</Text>
                        <RadioButton
                            style={signupstyle2.radio}
                            value="중형"
                            status={petSize=='중형'? 'checked':'unchecked'}
                            onPress={()=> setPetSize('중형')}/>
                        <Text style = {signupstyle2.radioText}>중형</Text>
                        <RadioButton
                            style={signupstyle2.radio}
                            value="대형"
                            status={petSize=='대형'? 'checked':'unchecked'}
                            onPress={()=> setPetSize('대형')}/>
                        <Text style = {signupstyle2.radioText}>대형</Text>
                    </View>
                </View>

                

                <TouchableOpacity style={signupstyle2.button} onPress = {handleSignUpButton}>
                    <Text style = {signupstyle2.buttontext}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
signupstyle2= StyleSheet.create({
    liststyle:{
        flexDirection:'row',
        position:'relative',
        top:-10,
    },
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
    content:{
        backgroundColor:'white',
        height: 800,
    },  
    text:{
        textAlign:'center',
        textAlignVertical:'center',
        flex:2,
        marginTop:10,
        fontSize:20,
            // width:80
    },
    inputbox:{
        borderColor:'gray',
        marginLeft:20,
        borderWidth:1,
        height:40,
        width:180,
        margin:15,

    },
    box:{
        flexDirection:'row',
        marginTop:10,
        top:3,
    },
    button:{
        backgroundColor: '#DF5F5F',
        alignItems: 'center',
        height: 50,
        width: 140,
        position: 'relative',
        top:30,
        left: 130,
        borderRadius: 30,

    },
    buttontext :{
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 15,
        color: 'white',
    },
    radioText:{
        textAlign:'center',
        textAlignVertical:'center',
    },
    radio:{
        flex:1,
        alignContent:'flex-end'
    },
    radioBox:{
        flex:2,
        flexDirection:'row',
        alignItems:'center',
        margin:10,
    }
    

})
export default signuptwo;