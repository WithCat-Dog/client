import React, {useCallback, useEffect, useMemo, useState, useRef} from 'react';
import {
    Modal,
    KeyboardAvoidingView, 
    TouchableWithOutFeedback,
    Image,SafeAreaView,
    View,
    Text,
    StyleSheet,
    TextInput, 
    Button,
    Alert,
    TouchableOpacity ,
    CheckBox, 
    Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; //아이콘 불러오기 

import { getCookie } from '../cookie/cookie';





const writeBoard = ({route,navigation}) => {


    const {date} = route.params;

    const [title ,setTitle] = useState('');
    const [content , setContent] = useState('');
    const [imageis,setImageis] = useState(false);
    const [pickerResponse,setPickerResponse] = useState(null);
    const [source, setSource] = useState();
    const [all, setAll] = useState();
    const [url, setUrl] = useState(undefined);
    const [time, setTime] = useState('');
    let today = new Date();

     useEffect( ()=>{
        if(source!=undefined){
            console.log("여기서 : "+source);
            setSource(source);
            console.log("source: "+ source);
            handleImg();
        }
     },[source]);

     useEffect( ()=>{
        setTitle(title);
     },[title]);

     useEffect( ()=>{
         setContent(content);
     },[content]);

     useEffect( ()=>{
         setUrl(url);
         console.log("wwww"+url);
     },[url]);


    const handleImg = useCallback(()=>{
        if(source!=undefined){
            console.log("uri:"+url);
            var body = new FormData();
            body.append('imgs', { uri: source.uri, type:'multipart/form-data', name:source.fileName})
            fetch('http://localhost:3030/post/img', { 
                        method : "POST",
                        body : body,
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
            })
            .then(res=>res.json())
            .then(res=>{console.log(res); alert(res.data); console.log("res.data:"+res.data); setUrl(res.data)});
        }    
    },[source]);

    
    const handleContents = async()=>{
        console.log(url);

        await fetch('http://localhost:3030/post/contents', {
            method : "POST",
            body : JSON.stringify({

                pId : getCookie('rememberId'),


                urls : url,
                title : title,
                content : content,
                time : (today.getMonth()+1)+'-'+today.getDate(),
                targetDate:(date+'  '+time)

            }),
            headers : {
                'Content-Type': 'application/json',
            }
        })
        .then(res=>res.json())
        .then(res=>{console.log(res);})
    }


    const onImageLibraryPress = useCallback (()=> {
        const options = {
            selectionLimit :1,
            mediaType:'photo',
            includeBase64:false,
            maxWidth:200,
            maxHeigh:200,
        };
        launchImageLibrary(options,(response) =>{
            if(response.didCancel){
                console.log('User cancelled image picker');
            }else if(response.error){
                console.log('ImagePicker Error: ', response.error);
            }else{
                console.log(response.assets[0]);
                setSource(response.assets[0]);             
            }
            
        });
        
    },[]);
    
   

    return (
        <SafeAreaView style={writeBoardDesign.safeView}>
                <View style={writeBoardDesign.boardView}>
                    <View style={writeBoardDesign.titleView}>
                        <TextInput style={writeBoardDesign.titleText}
                                placeholder = "제목을 입력하세요."
                                onChangeText = { (text) => {setTitle(text)}}
                                onBlur = {() => {console.log("On Blur");}}
                                maxLength={100}
                                multiline = {true}
                                />


                    </View>

                    <View style = {{flexDirection:'row',alignItems:'center',marginTop:5}}>
                        <Text style = {{fontSize:17,fontWeight:'bold',marginRight:5,}}>날짜 선택{'>'}</Text>
                        <TouchableOpacity  style ={writeBoardDesign.cameraIcon}> 
                                <Icon color='gray' size={25} name="calendar"style={writeBoardDesign.camera} onPress={()=>navigation.navigate('calendar')}/>
                        </TouchableOpacity>
                        <Text >{date}</Text>
                        <View style = {{flexDirection:'row',marginLeft:7}}>
                        <Text style = {{fontSize:17,fontWeight:'bold'}}>시간 선택</Text>
                        <View  style = {{width:100,borderBottomWidth:1,marginLeft:5}}>
                        <TextInput 
                            placeholder='ex) 17:00~22:00'
                            onChangeText={(text)=>(setTime(text))}
                           
                        
                        />
                        </View>
                        </View>
                    </View>

                    <View style={writeBoardDesign.contentView}>

                        <View style={writeBoardDesign.photoView}>
                            {source ? (
                                <Image source={{uri:source.uri}} style = {{width:100,height:100}}/>
                            )
                            :
                            (
                                <Image style = {{width:100,height:100}}source={require('../assets/images/mung.png')}/>                                
                            )
                            }
                        </View>
                        <View style={writeBoardDesign.textView}>
                        <TextInput 
                                        placeholder = "내용을 입력하세요.ex) 지역,원하는 요구사항, 펫의 종류, 지역, 펫시터 페이 등 상세하게 작성할 수록 펫시터 지원률이 높아집니다."
                                        onChangeText = { (text)=>{setContent(text)}}
                                        maxLength={200}
                                        multiline={true}
                                        
                                        />
                        </View>
                        <View style={writeBoardDesign.cameraView}>
                            <TouchableOpacity  style ={writeBoardDesign.cameraIcon}> 
                                <Icon color='gray' size={30} name="camera"style={writeBoardDesign.camera} onPress={onImageLibraryPress}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={writeBoardDesign.buttonView}>
                        <TouchableOpacity style={writeBoardDesign.button} onPress={()=>{
                            handleContents();              
                            navigation.navigate('boardDetail',{id:'ex2',title:title,content:content,url:url,time:(today.getMonth()+1)+'-'+today.getDate(),wanttime:(date+'  '+time)})

                        }}>
                            <Text style={writeBoardDesign.buttonText}>게시</Text>
                        </TouchableOpacity>
                    </View>
                </View> 

                
        </SafeAreaView>

    );
}
const writeBoardDesign = StyleSheet.create({
    safeView:{flex:1,alignItems:'center',backgroundColor:'white'},
    boardView:{marginTop:20,flex:0.9, width:'90%',backgroundColor:'white'},
    titleView:{flex:1.4,padding:5,borderRadius:20 , borderColor:'#ffd8cc', borderWidth:3},
    contentView:{flex:13,marginTop:10,borderRadius:20 , borderColor:'#ffd8cc', borderWidth:3},
    photoView:{flex:3,margin:20,},
    cameraView:{flex:2},
    text:{},
    titleText:{marginLeft:5},
    textView:{flex:8,height:'100%',padding:5},
    form:{},
    cameraIcon:{},
    picture: {width:100,height:100,left:'20%'},
    button:{
        backgroundColor: '#DF5F5F',
        flexDirection:'row',
        
        height: 50,
        width: 140,
        borderRadius: 30,
        alignItems:'center',
        marginTop:10,
    },
    buttonText :{
        flex:1,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        textAlign:'center',
        textAlignVertical:'center',
        
       
    },
    buttonView:{
        padding:20,
        flex:1,
        alignContent:'center',
        alignItems:'center',
        

    }
})

export default writeBoard;