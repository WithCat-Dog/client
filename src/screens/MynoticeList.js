import React, {useCallback, useState, useMemo, useEffect, useRef} from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, Image,FlatList } from "react-native";
import { getCookie } from '../cookie/cookie';
import ActionButton from 'react-native-action-button';

const MynoticeList = ({navigation})=>{
    useEffect(()=>{
        try{
            console.log("부르는 함수 &", getCookie("rememberId"));
            fetch('http://localhost:3030/post/myPosts', { 
                method: "POST",
                body: JSON.stringify({ //request에 실을 데이터(객체타입)
                    pId:getCookie('rememberId')
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .then((res)=> {      
                if(res.success===false){
                    alert('오류');
                }else if(res.success === true){
                    if(res.data){
                    for (let i =res.data.length-1;i>=0;i--){        
                        savedata = res.data[i];
                        SetNoticearray(Noticearray=>([...Noticearray, savedata]));                            
                    }    
                    }
                    else{alert("작성한 게시물이 없습니다.")}
                } 
            })
        }catch(e){
            console.log(e);
        }
    },[]);
    const [Noticearray,SetNoticearray]= useState([
             ]);

    const renderItem = ({item})=>(
        

        <TouchableOpacity style = {styles.contentstyle} onPress={()=>navigation.navigate('boardDetail',{id:item.pId, index:item.index,title:item.title,content:item.content,url:item.url,time:item.time,wanttime:item.targetDate})}>
                  <Text numberOfLines={1} style = {styles.noticetitle}>{item.title}</Text>
                  <Text numberOfLines={2}style = {styles.noticetext}>{item.content}</Text>
                  <View style ={{position:'absolute',top:'80%',left:'70%'}}><Text>{item.time}</Text></View>
                  
        </TouchableOpacity>
        
    );

    return(
        
        <SafeAreaView style = {styles.safearea}>
            {headers()}
            <FlatList
                data = {Noticearray}
                renderItem = {renderItem}
                ketExtractor = {(item)=> item.id}
           /> 
          
       </SafeAreaView>
    )


}
const styles = StyleSheet.create({
    safearea:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',

    },
    contentstyle :{
        borderColor:'#DF5F5F',
        borderRadius:20,
        borderWidth:1,
        marginBottom:15,
        width:337,

        height:120,

        
        
    },
    noticetitle :{
        fontSize:17, 
        top:8,
        marginLeft:10,
        fontWeight:'bold'
        

    },
    noticetext:{
        marginTop:10,
        top:8,
        left:8,
        fontSize:13,


    },
    Button:{
        position:'absolute',
        top:'85%',
        left:'80%',
        width:45,
        height:45,
        borderRadius:20,
        alignItems:'center',
    }

})

export default MynoticeList;