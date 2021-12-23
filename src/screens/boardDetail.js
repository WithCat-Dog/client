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
    const { id,index,title,content,url ,time,wanttime} = route.params;
    console.log('want time',wanttime);
    console.log('board detail ',url);
    const [img,setImageSource ] = useState("");
    const [pickerResponse , setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);
    const [applier,applierChecked] = useState(false); //펫시터 찾는 사람인지 지원하는 사람인지에 따라 다른
    console.log(id,index,title,content, url);

    const deletepost = ()=>{
        try{
        fetch("http://localhost:3030/post/delete", {
            method: "POST",
            body: JSON.stringify({ //request에 실을 데이터(객체타입)
                index: index
            }),
            headers: { //HTTP header와 대응되는 객체 
                'Content-type': 'application/json'
            }})
        // .then(response => console.log("response"))
        .then(res => res.json()) //fetch를 호출하면 가져올 객체 
        .then ((res)=>{
            if(res.success){
                alert('게시물 삭제 완료');
                navigation.navigate('noticelist');
            }
            else{
                alert('게시물 삭제 실패');
                console.log(res.success);

            }
        })
    }catch(e){
        console.log(e);
    }
    }
    return (
        <SafeAreaView style={writeBoardDesign.safeView}>
            
                <View style={writeBoardDesign.boardView}>
                    <View style={writeBoardDesign.titleView}>
                            <Text style={writeBoardDesign.titleText} numberOfLines={3} >
                                {title}
                            </Text>
                            <View style = {{alignItems:'flex-end'}}>   
                                <TouchableOpacity onPress={()=>Alert.alert("수정","수정하시겠습니까?",[{text:"취소",onPress:()=>console.log("수정안한대"),},{text:'수정',onPress:()=>console.log('수정한대')}])}>

                                </TouchableOpacity>
                                <TouchableOpacity  onPress={()=>Alert.alert("삭제","삭제하시겠습니까?",[{text:"취소",onPress:()=>console.log("아니래"),},{text:"삭제",onPress:()=>{deletepost()}},],)}>
                                    <Text>삭제</Text>
                                </TouchableOpacity>
                              </View>
                    </View>
                    <View style={{alignItems:'flex-end',margin:5}}>
                            <Text>
                                닉네임
                            </Text>
                    </View>
                    
                    <View style={writeBoardDesign.photoView}>

                            <Image style={{width:'100%',height:'100%'}}  source={{uri:url}}/>
                    </View>
                    <View style = {{alignItems:'flex-end',marginBottom:7}}>
                        <Text>
                            {time}
                        </Text>
                    </View>
                    <View style = {{textAlign:'row'}}>
                        <Text style = {{fontSize:19,fontWeight:'bold'}}>내 펫을 부탁해요! 기간:</Text>
                        <Text style = {{fontSize:17,marginLeft:15,marginTop:5,marginBottom:5}}>{wanttime}</Text>
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
                        <TouchableOpacity style={writeBoardDesign.button} onPress={()=>handleImg()} onPress={()=>navigation.navigate('applier',{title:title})}>
                            <Text style={writeBoardDesign.buttonText}>지원자 보기</Text>
                        </TouchableOpacity>
                    </View>
                    ):(
                        <View style={writeBoardDesign.buttonView}>
                        <TouchableOpacity style={writeBoardDesign.button} onPress={()=>handleImg()} onPress={()=>Alert.alert({id},"님에게 펫시터를 지원하시겠습니까?",[{text:"아니요",onPress:()=>console.log("아니래"),},{text:"네",onPress:()=>console.log("지원한대"),}])}>
                            <Text style={writeBoardDesign.buttonText}>지원하기</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                </View>  
        </SafeAreaView>

    );
}
const writeBoardDesign = StyleSheet.create({
    safeView:{flex:1,alignItems:'center',backgroundColor:'white'},
    boardView:{top:'2%',flex:0.8, width:'90%',},
    titleView:{height:50,padding:5,borderRadius:2 ,borderBottomColor:'gray', borderBottomWidth:1},
    contentView:{height:150,borderRadius:10 ,  borderBottomColor:'gray',borderBottomWidth:1, backgroundColor:'white',borderTopColor:'gray',borderTopWidth:1,},
    photoView:{left:'10%',width:200,height:200, alignItems : 'center', margin : 30},
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