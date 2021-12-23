import React, {useCallback, useState, useMemo, useEffect, useRef} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput} from "react-native";
import logo from '../assets/images/mung.png'
import ImagePicker, {launchImageLibrary,showImagePicker} from 'react-native-image-picker';
import { Flex } from 'native-base';


const myPageAboutPet = ({navigation})=>{
    const mounted = useRef(false);

    const [petInfo, setPetInfo] = useState(false);
    const [buttonText, setButtonText] = useState('등록하기');
    const [petName, setPetName] = useState('');
    const [petIntro, setPetIntro] = useState('');
    const [source, setSource] = useState();
    const [url, setUrl] = useState('');

    useEffect( ()=>{
        setPetIntro(petIntro);
    },[petIntro]);

    useEffect( ()=>{
        setPetName(petName);
    },[petName]);

    useEffect( ()=>{
        setUrl(url);
        console.log("url은 " +url);
    },[url]);


    const loading = useEffect(async()=>{
        // if(!mounted.current){
                await fetch('http://localhost:3030/mypage/myPetInfo', { 
                    method: "POST",
                    body : JSON.stringify({
                    id : "ex2" 
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                .then((res)=> {      
                    if(res===undefined){
                        alert('오류');
                    }else{
                        if(res.data!="0"){
                            console.log(res.data);
                            console.log("name : "+res.data.petName+" content : "+res.data.content);
                            setPetName(res.data.petName);
                            setPetIntro(res.data.content);
                            setUrl(res.data.url);
                            setSource(res.data.url);
                        } 
                    } 
                })
        // }
        // else {
        //     mounted.current=true;
        // }
    },[]);


    useEffect( ()=>{
        if(source!=undefined){
            console.log("여기서 : "+source);
            setSource(source);
            console.log("source: "+ source);
            handlePetImg();
        }
     },[source]);

    // const clickButton = useCallback(()=>{
    //     console.log(petInfo);
    //     setPetInfo( (petInfo)=> !petInfo);
    //     Alert.alert("이름 : "+petName + ", 소개 : "+petIntro); 
    //     console.log("변경 후 : "+petInfo);     
    // },[petName, petIntro]);


    const handlePetImg = useCallback(()=>{
        if(source!=undefined){
            console.log("uri:"+url);
            var body = new FormData();
            body.append('imgs', { uri: source.uri, type:'multipart/form-data', name:source.fileName})
            fetch('http://localhost:3030/mypage/img', { 
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

    const handlePetContents = async()=>{
        if(petIntro!=''){
            console.log(url);
            await fetch('http://localhost:3030/mypage/contents', {
                method : "POST",
                body : JSON.stringify({
                    mId : 'ex2',
                    urls : url,
                    petName : petName,
                    content : petIntro,
                }),
                headers : {
                    'Content-Type': 'application/json',
                }
            })
            .then(res=>res.json())
            .then(res=>{Alert.alert("내펫정보 업로드 성공");})
        }
    };

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

    return(
        <SafeAreaView style={styles.safeView}>
            <View style={styles.topView}>
                <View style={styles.imageView}>
                    <TouchableOpacity onPress={onImageLibraryPress}> 
                            {url!='' ? (
                                <Image source={{uri:url}} style = {styles.imageStyle}/>
                            )
                            :
                            (
                                <Image style = {styles.imageStyle} source={require('../assets/images/mung.png')} />                                
                            )
                            }
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={styles.bottomView}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    {/* <Text style={[styles.textStyle,{flex:3,alignItems:'center'}]}>이름</Text> */}
                    <TextInput 
                        defaultValue={petName} style={[styles.textInputStyle,{width:'40%',borderBottomWidth:1,borderTopWidth:0,borderLeftWidth:0,borderRightWidth:0,fontSize:15}]}
                        onChangeText={(text)=>{setPetName(text)}}
                    />
                </View>
                <View style={styles.InfoViewStyle}>
                    <Text style={styles.textStyle}>소개하기</Text>
                    <TextInput
                        defaultValue={petIntro} style={[styles.textInputStyle, {height:250,borderRadius:10,borderColor:'gray'}]}
                        onChangeText={(text)=>{setPetIntro(text)}}
                        multiline={true}
                        maxLength={255}
                    />
                </View>
  
                <TouchableOpacity style={styles.buttonStyle} onPress={()=>{handlePetContents()}}>
                    <Text style={{color:'white',fontSize:17}}>{buttonText}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeView : {
        flex:1,
        backgroundColor:'white'
    },
    topView : {
        flex:4,
        marginTop : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor:'#FFD8CC'
    },
    bottomView : {
        top:'-3%',
        flex : 7,
        justifyContent : 'center',
        alignItems : 'center',
        width:'100%',flex:7,backgroundColor:'white',borderTopRightRadius:30,borderTopLeftRadius:30,
    },
    imageView : {
        borderWidth:1,
        borderRadius : 75,
        width : 150,
        height : 150,
        backgroundColor : 'white'
    },
    imageStyle : {
        width : 150,
        height : 150,
        borderRadius : 75,
    },
    InfoViewStyle : {
         justifyContent : 'center',
         alignItems : 'center',
      
    },
    textStyle : {
        fontSize : 17,
        fontWeight:'bold',
       
    },  
    textInputStyle : {
        borderWidth : 1,
        // borderRadius : 20,
        width : 300,
        height : 30,
        margin : 10,
        fontSize : 20,
        
    },
    buttonStyle :{ 
        backgroundColor : "#df5f5f",
        margin : 10,
        paddingTop : 10,
        borderRadius : 20,
        flex:0.5,
        width : 130,
        alignItems : "center"
    },
})
export default myPageAboutPet;