import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';

import { toNamespacedPath } from 'path/posix';

import  React,{useCallback, useEffect,useState} from 'react';
import { FlatList,SafeAreaView, TouchableOpacity,View, Text, StyleSheet, Image,ScrollView } from 'react-native';
import ActionButton from 'react-native-action-button';
//mport { Item } from 'react-native-paper/lib/typescript/components/List/List';
import Ionicons from 'react-native-vector-icons/Ionicons';
const header = ()=>{
    return(
    <View style = {styles.header}>
        <Text style={styles.headertext}>펫시터 구인글 게시판</Text>
    </View>
    )


}
const noticeList =({navigation})=>{
    var savedata=undefined;
    

    let today = new Date();
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
       
        
    
    const [Noticearray,SetNoticearray]= useState([
    //        {index:'1',pid:'ss',title:'(11월 24일) 책임감을 갖고 봐줄 펫시터 분 구해요',content:'서울 성북구, 강아지 3시간정도 봐줄 분 구합니다, 반려견 키워본 경험이 있는 사람으로 원합니다. 펫은 말티즈로 소형견입니다 똥오줌 잘가리고 물지도 않아요 잘 봐주실 분~~~',time:'2021-11-21'},
    //        {index:'2',pid:'ss',title:'(11월 23일) 책임감을 갖고 봐줄 펫시터분 구해요',content:'서울 성북구, 강아지 3시간 정도 봐주세요',time:'2021-11-21'},
    //        {index:'3',pid:'ss',title:'(11월 22일) 코숏 고등어태비 봐주실 분 있나요', content:'4~6시 사이에 화장실 갈아주기, 사냥놀이 해주기',time:'2021-11-21'},
    //        {index:'4',pid:'ss',title:'(11월 21일) 말티즈 강쥐 봐주실분 있나요', content:'4~6시 사이에 화장실 갈아주기, 사냥놀이 해주기',time:'2021-11-21'},
    //        {index:'5',pid:'ss',title:'(11월 21일) 러시안 블루 3일 밥 놔주기, 사냥놀이 해주실 분', content:'4~6시 사이에 화장실 갈아주기, 사냥놀이 해주기',time:'2021-11-21'},
    //        {index:'6',pid:'ss',title:'(11월 21일) 골든리트리버 산책시켜주실 분 구합니다.', content:'4~6시 사이에 화장실 갈아주기, 사냥놀이 해주기',time:'2021-11-21'},
    //        {index:'7',pid:'ss',title:'(11월 21일) 코숏 치즈냥이 애기 봐주실 분 있나요', content:'4~6시 사이에 화장실 갈아주기, 사냥놀이 해주기',time:'2021-11-21'}
      ]);

    const renderItem = ({item})=>(

            <TouchableOpacity style = {item.closed?(styles.unabledContentstyle):(styles.contentstyle)} 
                disabled={item.closed?(true):(false)}
                onPress={()=>navigation.navigate('boardDetail',{id:item.pId, index:item.index,title:item.title,content:item.content,url:item.url,time:item.time,wanttime:item.targetDate})}>
                <Text style={{top:'5%',left:'30%' ,fontSize:16}}>{item.targetDate}</Text>
                <Text numberOfLines={1} style = {styles.noticetitle}>{item.title}</Text>
                <Text numberOfLines={2}style = {styles.noticetext}>{item.content}</Text>
                <View style ={{position:'absolute',top:'80%',left:'70%'}}><Text>{item.time}</Text></View>
            </TouchableOpacity>

    );

    const Icon = ()=>{
        return(
        <Ionicons name = 'ios-pencil' color='white'  size={35}/>
        );
    }
    
    return(
       <SafeAreaView style = {styles.safearea}>
           {header()}
            <FlatList
                data = {Noticearray}
                renderItem = {renderItem}
                ketExtractor = {(item)=> item.id}
           /> 
           <View style = {styles.Button}>

               <ActionButton size={50} buttonColor='#DF5F5F'  renderIcon={Icon} onPress={()=> navigation.navigate('writenotice',{date:today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()})}/>

                   
             
               
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
        width:337,

        height:120,
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
    noticetitle :{
        fontSize:17, 
        top:10,
        marginLeft:10,
        fontWeight:'bold'
        

    },
    noticetext:{
        marginTop:10,
        top:10,
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
    header:{
        alignItems:'center',
        height:50,
        backgroundColor:'#FFD8CC',
        width:'100%',

    },
    headertext:{
        alignItems:'center',
        fontSize:20,
        top:15
       

    },

})
export default noticeList;