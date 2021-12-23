import React, { Component,useEffect ,useState} from 'react';
import { SafeAreaView, TouchableOpacity,View, Text, StyleSheet, Image,ScrollView ,FlatList} from 'react-native';
import {Thumbnail} from 'native-base';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const main =({navigation})=>{

    const [Mainnotices,SetMainnotices]=useState( []);
    const [Mainpets,SetMainpets] = useState([]);

    useEffect( ()=>{
        SetMainnotices(Mainnotices)
    },[Mainnotices]);


    useEffect(()=>{ //펫시터 구인글 보기 
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

                        console.log("savedata:"+savedata);

                        SetMainnotices(Mainnotices=>([...Mainnotices, savedata]));                            
                    }    
                } 
            })
        }catch(e){
            console.log(e);
        }
    },[]);

    useEffect(()=>{ //펫 친구들 구경가기 
        try{
            fetch('http://localhost:3030/match/petfriends', { 
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

                        console.log("savedata:"+savedata);

                        SetMainpets(Mainpets=>([...Mainpets, savedata]));                            
                    }    
                } 
            })
        }catch(e){
            console.log(e);
        }
    },[]);
       
    const renderItem = ({item})=>(
        <TouchableOpacity style = {item.closed?(styles.unabledContentstyle):(styles.contentstyle)} onPress={()=>navigation.navigate('boardDetail',{id:item.pId, index:item.index,title:item.title,content:item.content,url:item.url,time:item.time})}>
                  <Text numberOfLines={1} style = {styles.noticetitle}>{item.title}</Text>

                  <Text numberOfLines={2}style = {styles.noticetext}>{item.content}</Text>


                  <View style ={{alignItems:'flex-end',top:'20%',left:'-8%'}}><Text>{item.time}</Text></View>
                  
        </TouchableOpacity>
        
    );
    
    //const [noticeboard,setnoticeboard] = useState('');
    const Mainimages=[
        {id:1,image:require('../assets/images/friends/cat.png'),petname:'체다'},
        {id:2,image:require('../assets/images/friends/dog.png'),petname:'제로'},
        {id:3,image:require('../assets/images/friends/dog2.png'),petname:'판다'},
        {id:4,image:require('../assets/images/friends/cat2.jpeg'),petname:'쫀떡'},
    
    ];
    
    const Imagescroll = ({image,petname}) =>{
        return (
            <View>
            <Image style={styles.friendimage} source={image}/>
            <View style={{alignItems:'center'}}>
                <Text style = {{fontSize:15}}>{petname}</Text>
            </View>
            </View>
            
        );
    }
    const Imagelist = ()=>{
        return(
            <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            scrollEnable={true}
            contentContainerStyle={{
                position:'relative',
                alignItems:'center',
                paddingStart:15,
                paddingEnd:5,
                height:120,
                marginTop:30,
                flex:1
                  
            }}
            >
            
            {Mainimages.map((images,id)=>(
                <Imagescroll key={id} {...images}/>
    
            ))}
            
            
            </ScrollView>
        )
    }

    
                
    
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
                    <Imagelist/>
                </View>
                
            </View>
            <View style= {{margin:5,marginTop : 20, marginBottom:30,flex:1.2,alignItems:'center',justifyContent:'center',height:200}}>
                <TouchableOpacity style = {styles.button} onPress = {()=>{navigation.navigate('search')}}>
                    <Text style = {styles.buttontext}>맞춤 펫시터 검색하기</Text>
                </TouchableOpacity>
            </View>
            <View style = {{flex:4}}>
                <View style = {{flexDirection:'column',flex:0.1}}>
                <Text style = {[styles.noticeheadertext]}>펫시터 구인글 보기</Text>
                <TouchableOpacity style = {styles.morebutton} onPress={()=>navigation.navigate('notice')}><Text>더보기</Text></TouchableOpacity>
                </View>
                <FlatList
                data = {Mainnotices}
                renderItem = {renderItem}
                ketExtractor = {(item)=> item.id}
                style={{left:'6%',top:'3%',flex:2}}
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
        borderRadius:20,
        width:'90%',
        /*height:40,
        left:90,
        top:180,*/
        flex:1,
        marginBottom:10,
        textAlignVertical:'center',
        
    },
    buttontext:{
        color:'white',
        fontSize:25,
        fontWeight : "500",
        top:20,
        textAlign:'center',
        textAlignVertical:'center'
        

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
    unabledContentstyle :{
        borderColor:'black',
        borderRadius:20,
        borderWidth:1,
        marginBottom:15,
        width:337,
        height:120,
        opacity : 0.4
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