import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';
import  React,{useCallback, useEffect,useState} from 'react';
import { FlatList,SafeAreaView, TouchableOpacity,View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
import Ionicons from 'react-native-vector-icons/Ionicons';

const petList =({navigation})=>{
    var savedata=undefined;
    

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
                    for (let i =res.data.length-1;i>=0;i--){        
                        savedata = res.data[i];
                        SetNoticearray(Noticearray=>([...Noticearray, savedata]));                            
                    }    
                } 
            })
        }catch(e){
            console.log(e);
        }
    },[]);
        
    
    const [Noticearray,SetNoticearray]= useState([]);

    const renderItem = ({item})=>(
        <TouchableOpacity style = {styles.contentstyle} onPress={()=>navigation.navigate('petdetail',{id:item.mId, nickname:item.nickname, petName:item.petName, petIntro:item.content,url:item.url})}>
            {console.log('itme',item.nickname)}
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <View>
                    <Image style={styles.petImage} source={{uri:item.url}}/>
                </View>
                <View>
                    <Text numberOfLines={1} style={styles.noticeId}>{item.mId}님의</Text>
                    <Text numberOfLines={1} style = {styles.noticetitle}>{item.petName}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );

    // const Icon = ()=>{
    //     return(
    //     <Ionicons name = 'ios-pencil' color='white'  size={35}/>
    //     );
    // }
    
    return(
       <SafeAreaView style = {styles.safearea}>
            <FlatList
                data = {Noticearray}
                renderItem = {renderItem}
                ketExtractor = {(item)=> item.id}
           /> 
           <View style = {styles.Button}>
                   
             
               
           </View>
       </SafeAreaView>
    );
    


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
        width:300,
        height:100,
    },
    noticeId : {
        fontSize:15,
        //marginLeft:10
    },
    noticetitle :{
        fontSize:20, 
        top:8,
        //marginLeft:10,
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
    },
    petImage : {
        width : 80,
        height : 80, 
        margin : 10,
        borderRadius : 20
    }
})
export default petList;