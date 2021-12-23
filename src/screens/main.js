import React, { Component,useEffect ,useState} from 'react';
import { SafeAreaView, TouchableOpacity,View, Text, StyleSheet, Image,ScrollView ,FlatList} from 'react-native';
import {Thumbnail} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCookie } from '../cookie/cookie';

const main =({navigation})=>{

    savepetdata=undefined;
    const [Mainnotices,SetMainnotices]=useState( []);
    const [Mainimages,setMainimages]=useState([
        {mId:1,image:require('../assets/images/friends/cat.png'),petName:'체다'},
       
    ]);
    useEffect( ()=>{
        SetMainnotices(Mainnotices)
        
    },[Mainnotices]);
    useEffect(()=>{
        try{
            fetch('http://localhost:3030/mypage/petfriends', { 
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .then((res)=> {      
                if(res===undefined){
                    alert('오류');
                }else{
                    for (let i =0;i<=res.data.length-1; i++){        
                        savepetdata = res.data[i];
                        console.log("savepetdata:"+res.data[i].petName);
                        setMainimages(Mainimages=>([...Mainimages, savepetdata]));                            
                    }    
                } 
            })
        }catch(e){
            console.log(e);
        }
    },[]);

    useEffect(()=>{
        try{
            fetch('http://localhost:3030/post/postList', { 
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
            .then((res)=> {      
                if(res===undefined){
                    alert('오류');
                }else{
                    for (let i =res.data.length-1;i>=res.data.length-3;i--){        
                        savedata = res.data[i];
                        console.log("savedata:"+res.data[i]);
                        console.log('logtincookiew',getCookie('rememberId'));
                        SetMainnotices(Mainnotices=>([...Mainnotices, savedata]));                            
                    }    
                } 
            })
        }catch(e){
            console.log(e);
        }
    },[]);
       
    const renderItem = ({item})=>(
        
        <TouchableOpacity style = {styles.contentstyle} onPress={()=>navigation.navigate('boardDetail',{id:item.pId, index:item.index,title:item.title,content:item.content,url:item.url,time:item.time})}>
                  <Text numberOfLines={1} style = {styles.noticetitle}>{item.title}</Text>

                  <Text numberOfLines={2}style = {styles.noticetext}>{item.content}</Text>


                  <View style ={{alignItems:'flex-end',top:'20%',left:'-8%'}}><Text>{item.time}</Text></View>
                  
        </TouchableOpacity>
        
    );
    
    //const [noticeboard,setnoticeboard] = useState('');
    
    
    const Imagescroll = ({item}) =>{
        return (
            <View>
            <Image style={styles.friendimage} source={{url:item.url}}/>
            <View style={{alignItems:'center'}}>
                <Text style = {{fontSize:15}}>{item.petName}</Text>
                {console.log(item.mId)}
            </View>
            </View>
            
        );
    }
    // const Imagelist = ()=>{
    //     return(
    //         <ScrollView
    //         horizontal={true}
    //         showsHorizontalScrollIndicator={true}
    //         scrollEnable={true}
    //         contentContainerStyle={{
    //             position:'relative',
    //             alignItems:'center',
    //             paddingStart:15,
    //             paddingEnd:5,
    //             height:120,
    //             marginTop:30,
    //             flex:1
                  
    //         }}
    //         >
            
    //         {Mainimages.map((images,id)=>(
    //             <Imagescroll key={id} {...images}/>
    
    //         ))}
            
            
    //         </ScrollView>
    //     )
    // }

    
                
    
    return(
        <SafeAreaView style = {styles.safearea}>
            <View style={styles.imagearea}>
                <View style={{top:80,flex:1}}>
                <Text style = {styles.headertext}>
                    펫 친구들 구경가기
                </Text>
                <TouchableOpacity style = {styles.petmorebutton} onPress={()=>navigation.navigate('petList')}><Text>더보기</Text></TouchableOpacity>
                </View>
                <View style={{height:120,flex:2}}>
                <FlatList 
                    data = {Mainimages}
                    renderItem={Imagescroll}
                    keyExtractor={(item)=>item.mId}
                    horizontal={true}
                    style = {{position:'relative', 
                                // alignItems:'center',
                               paddingStart:15,
                               paddingEnd:5,
                                 height:120,
                                 marginTop:30,
                                 flex:1}}
                />
                </View>
                
            </View>
            <View style= {{flex:0.9}}>
            <TouchableOpacity style = {styles.button} onPress = {()=>{navigation.navigate('search')}}>
            <Text style = {styles.buttontext}>맞춤 펫시터 검색하기</Text>
            </TouchableOpacity>
            </View>
                
            <View style = {{flex:6}}>
                <View style = {{flexDirection:'column',flex:0.1}}>
                <Text style = {[styles.noticeheadertext]}>펫시터 구인글 보기</Text>
                <TouchableOpacity style = {styles.morebutton} onPress={()=>navigation.navigate('notice')}><Text>더보기</Text></TouchableOpacity>
                </View>
                <FlatList
                data = {Mainnotices}
                renderItem = {renderItem}
                ketExtractor = {(item)=> item.id}
                style={{left:'6%',top:'3%',flex:3}}
           /> 
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safearea:{
        backgroundColor:'white',
        flex:1
        
    },
    imagearea:{
        height:100,
        flexDirection:'column',
        flex:4,
       
    },
    noticeheadertext:{
        fontSize:22,
        left:26,
       
        alignItems:'flex-start'

        

    },
    headertext:{
        fontSize:22,
        left:26,
        flex:2
    }
    ,
    button:{
        alignItems:'center',
        backgroundColor:'#DF5F5F',
        borderRadius:200,
        width:200,
        /*height:40,
        left:90,
        top:180,*/
        flex:1,
        left:90,
        marginBottom:10


        
    },
    buttontext:{
        color:'white',
        fontSize:20,
        top:8,

    },
    friendimage:{
        width:100,
        height:100,
        borderRadius:30,
        padding:10,
        paddingRight:30,
        margin :10,

    },
    contentstyle :{
        borderColor:'black',
        borderRadius:20,
        borderWidth:1,
        marginBottom:15,
        width:337,
        height:100,
        
    },
    noticestyle:{
        flex:2,
        left:20
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
    morebutton:{
        alignItems:'flex-end',
        top:'-30%',
        left:'-10%',
        marginBottom:10
    },
    petmorebutton : {
        alignItems:'flex-end',
        top:'-70%',
        left : '-10%',
        marginBottom:10,
        marginLeft : 300,
        width : 100,
        height : "20%",
    }
    
});

export default main;