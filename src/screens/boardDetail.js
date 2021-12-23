import React, {useCallback, useEffect, useMemo, useState,} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const boardDetail = ({route, navigation})=>{
    const { id,index,title,content,url ,time} = route.params;
    const [img,setImageSource ] = useState("");
    const [pickerResponse , setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);
    const [applier, setApplier] = useState(true);
    console.log(id,index,title,content, url);

    const handleApplyButton = ()=>{
        try{
            console.log("지원하기 함수 들어옴");
            fetch("http://localhost:3030/match/apply",{
                method : "POST",
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    id : "ex1", // <---- 현재 로그인되어있는 사용자의 아이디로 변경해야함
                    index : index
                })
            }).then(res=>res.json())
            .then(res=>{
                if(res.success) {
                    console.log("지원완료!");
                    Alert.alert("지원완료","구인글에 지원을 완료했어요!");
                }
                else if(!res.success) {
                    console.log("이미 지원한 게시글");
                    Alert.alert("이미 지원한 구인글입니다!");
                }
            });
        }catch(err){
            console.log(err);
        }
    }

    return (
        <SafeAreaView style={writeBoardDesign.safeView}>
            
                <View style={writeBoardDesign.boardView}>
                    <View style={writeBoardDesign.titleView}>
                            <Text style={writeBoardDesign.titleText} numberOfLines={3} >
                                {title}
                            </Text>   
                    </View>
                    <View style={{alignItems:'flex-end',margin:5}}>
                            <Text>
                                닉네임
                            </Text>
                    </View>
                    
                    <View style={writeBoardDesign.photoView}>

                            <Image style={{width:"100%", height : "100%"}}  source={{uri:url}}/>
                    </View>
                    <View style = {{alignItems:'flex-end',marginBottom:7}}>
                        <Text>
                            {time}
                        </Text>
                    </View>
                    <View style={writeBoardDesign.contentView}>
                        
                        <View style={writeBoardDesign.textView}>
                            <Text style={writeBoardDesign.text}>
                                {content}
                            </Text>
                            {/* <Image source={{uri:url}}/> */}
                        </View>
                    </View>
                    {applier ? 
                    (
                        <View style={writeBoardDesign.buttonView}>
                        <TouchableOpacity style={writeBoardDesign.button} onPress={()=>handleImg()} 
                            onPress={()=>navigation.navigate('applier',{title:title})}>
                            <Text style={writeBoardDesign.buttonText}>지원자 보기</Text>
                        </TouchableOpacity>
                    </View>
                    ):(
                        <View style={writeBoardDesign.buttonView}>
                        <TouchableOpacity style={writeBoardDesign.button} onPress={()=>handleImg()} 
                            onPress={()=>Alert.alert({id},"님에게 펫시터를 지원하시겠습니까?",
                                [{text:"아니요",onPress:()=>console.log("아니래"),},
                                {text:"네",onPress:()=>{console.log("지원한대"); handleApplyButton();}}])}>
                            <Text style={writeBoardDesign.buttonText}>지원하기</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                </View>  
        </SafeAreaView>

    );f
}
const writeBoardDesign = StyleSheet.create({
    safeView:{flex:1,alignItems:'center',backgroundColor:'white'},
    boardView:{top:'5%',flex:0.8, width:'90%',},
    titleView:{flex:6,padding:5,borderRadius:2 ,borderBottomColor:'gray', borderBottomWidth:1},
    contentView:{flex:17,borderRadius:10 ,  borderBottomColor:'gray',borderBottomWidth:1, backgroundColor:'white',borderTopColor:'gray',borderTopWidth:1,},
    photoView:{left:'10%',width:220,height:220, alignItems : 'center', margin : 30},
    cameraView:{flex:2},
    text:{fontSize:15},
    titleText:{fontSize:18,marginLeft:5,fontWeight:'bold'},
    textView:{flex:1,height:'100%',padding:5,numberOfLines:10},
    form:{},
    button:{
        backgroundColor: '#DF5F5F',
        flexDirection:'row',
        alignContent:'center',
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

export default boardDetail;