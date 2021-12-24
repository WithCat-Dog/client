import { SimpleGrid } from 'native-base';
import React ,{useEffect, useState}from 'react';
import {SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image, ScrollView, Alert, ListViewBase} from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import logo from '../assets/images/mung.png'
import Header from '../theme/Header';

const matching = ({route,navigation}) => {

    const [applied,appliedSet] = useState(false);
    const {owner,petSitterArray,result} = route.params;
    console.log("여기부터 matching.js");
    console.log('result',result);

    console.log("owner : "+owner.nickname);


    const action = (nickname) => {
        Alert.alert(owner.nickname, "님에게 펫시터를 요청하시겠습니까?", [
            {text: "취소", onPress: ()=>{console.log("취소 누름")}},
            {text: "확인", onPress: ()=>{console.log("확인 누름"); sendMail(nickname);}}
        ]);
    }

    const sendMail = (nickname)=>{
        try{
            console.log("들어옴"+nickname);
            fetch('http://localhost:3030/match/sendmail', {
                method : "POST",
                body : JSON.stringify({
                    owner : owner.nickname,
                    sitter : nickname
                }),
                headers : {
                    'Content-Type' : 'application/json',
                },
            }).then(res=>res.json())
            .then((res)=>{
                console.log(res);
                if(res.success){
                    Alert.alert("회원님의 메일함을 확인해주세요!\n"+nickname+"님의 메일 주소를 보내드렸어요!\n(스팸함도 확인 부탁드려요!)");
                }
            })
        }catch(err){
            console.log(err);
        }
    }
    //owner 배열 
    //petSitter 배열 [{sid,snickname,sresidence,stype,ssex,sage,sexperience,slicense}]

    const UserList = () => { //조건에 맞는 펫시터 하나씩 달아주는 함수 
        return (
            <ScrollView style={{top: 120}}>
                {petSitterArray.map((list) => (
                    <UserScroll key={list.id} {...list}/>
                ))}
            </ScrollView>
        );
    };

    const UserScroll =({age, experience, id, license, nickname, residence, sex, size, type }) => {
        return (
            <View style = {{marginBottom:10}}>
                {/* <View style={styles.numberOfequal}>
                    <Text style={styles.text}>일치하는 조건 : </Text>
                    <Text style={styles.text, {color: 'black'}}>{equals}개</Text>
                </View> */}
    
                <View style={[styles.box, styles.userBox]}>
                    <View style={styles.userProfile}>
                        <Image source={logo} style={styles.profileImg}/>
                        <Text style={[styles.text, styles.profileNickname]}>{nickname}</Text>
                    </View>
    
                    <View style={styles.userContent}>
                        <View style={styles.userInfoBig}>
                            <View style={styles.userInfoSmall}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>가능한 펫 : </Text>
                                    <Text style={[styles.text, {color: '#DF5F5F'}]}>{type}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>가능한 크기 : </Text>
                                    <Text style={styles.text, {color: '#DF5F5F'}}>{size}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>성별 : </Text>
                                    <Text style={styles.text, {color: '#DF5F5F'}}>{sex}</Text>
                                </View>
                            </View>
                            <View style={styles.userInfoSmall}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>연령대 : </Text>
                                    <Text style={styles.text, {color: '#DF5F5F'}}>{age}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>펫 키워본 경험 : </Text>
                                    <Text style={styles.text, {color: '#DF5F5F'}}>{experience == 1? "있음"  :"없음"}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>자격증 : </Text>
                                    <Text style={styles.text, {color: 'black'}}>{license == 1?"있음":"상관없음"}</Text>
                                </View>
                            </View>
                        </View>
    
                        <Text style={styles.textAddress}>{residence}</Text>
    
                        <View>
                            <TouchableOpacity style={[styles.choiceButton, {backgroundColor:'#df5f5f'}]} onPress={()=>{action(nickname);}}>
                                <Text style={styles.choiceButtonText}>내 펫을 부탁해요!</Text>
                            </TouchableOpacity>
                        </View>
    
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <Header/>
            <View style={styles.header}>
                 <View style={[styles.box, styles.conditionBox]}>
                     <View  style={{flexDirection: 'row'}}>
                         <Text style={styles.conditiontext}>부탁할 펫: </Text>
                         <Text style={[styles.conditiontext, {color: 'black'}]}>{owner.type} </Text>
                         <Text style={styles.conditiontext}>펫의 크기: </Text>
                         <Text style={[styles.conditiontext, {color: 'black'}]}>{owner.size}  </Text>
                         <Text style={styles.conditiontext}>선호하는 펫시터의 성별: </Text>
                         <Text style={[styles.conditiontext, {color: 'black'}]}>{owner.sex}     </Text>
                     </View>
                     <View  style={{flexDirection: 'row'}}>
                         <Text style={styles.conditiontext}>선호하는 펫시터의 연령대: </Text>
                         <Text style={[styles.conditiontext, {color: 'black'}]}>{owner.age} </Text>
                         <Text style={styles.conditiontext}>펫 키워본 경험: </Text>
                         <Text style={[styles.conditiontext, {color: 'black'}]}>{owner.experience == 1 ? "있음":"없음"} </Text>
                         <Text style={styles.conditiontext}>자격증 유무: </Text>
                         <Text style={[styles.conditiontext, {color: 'black'}]}>{owner.license == 1 ?"있음" :"상관없음"}</Text>
                     </View>
                 </View>
                 <View style={styles.textHeader}>
                     <Text style={styles.textHeaderNickname}>{owner.nickname}</Text>
                     <Text style={[styles.text, {top: '4%',flex:1},]}>님의 펫시터 맞춤 검색 결과예요.</Text>
                 </View>
             </View>
            {result ? (
                 
             <View style={{flex: 1, top: '-30%'}}>
                <UserList/>
             </View>
            ):(
                <View style = {{flex:0.8,borderWidth:1,borderRadius:10,borderColor:'gray',width:'90%',alignItems:'center'}}>
                    <View style = {{flex:1,width:'90%',top:'30%',alignItems:'center'}}>
                        <Text style = {{ fontSize:20}}>조건에 맞는 펫시터가 없어요. </Text>
                        <Text style = {{fontSize:20}}>직접 구인글을 올려보는건 어떨까요?</Text>
                    </View>
                    <View style = {{flex:1,width:'60%'}}>
                        <TouchableOpacity style = {[styles.button,{width:'90%',height:'19%'}]} onPress={()=>navigation.navigate('upload')}>
                            <Text style ={styles.buttontext}>구인글 올리러 가기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                

            )}
            
            <TouchableOpacity style={[styles.button,{width: '45%',height: '5%',top:'7%'}]} onPress={()=>navigation.goBack()}>
                <Text style = {styles.buttontext}>다시 검색하기</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:'center'

    },
    box: {
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        width: '92%'
    },
    text: {
        fontSize: 14
    },
    header: {
        top: '3%'
    },
    textHeader: {
        flexDirection: 'row',
        left: '9%'
    },
    textHeaderNickname: {
        fontSize: 24,
        color: '#DF5F5F',
        textDecorationStyle: 'solid',
        marginTop:10,
    },
    conditionBox: {
        height: '23%',
        justifyContent: 'center'
    },
    conditiontext: {
        fontSize: 11
    },
    userBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: 'black',
        height: 135,
    },
    numberOfequal: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        left: '-10%'
    },
    userProfile: {
        alignItems: 'center',
        width: '32%'
    },
    profileImg: {
        borderRadius: 1000,
        top: '10%',
        width: 90,
        height: 90
    },
    profileNickname: {
        bottom: '-10%'
    },
    userContent: {
        flex: 1
    },
    userInfoBig: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '58%',
        left: -2
    },
    userInfoSmall: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        top: -3
    },
    textAddress: {
        color: 'black',
        textDecorationLine: 'underline',
        top: -2,
        left: -2
    },
    choiceButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 300,
        backgroundColor: '#FDD2BF',
        marginTop: '2%',
        width: '85%',
        height: '45%'
    },
    choiceButtonText: {
        color: 'white',
        fontSize: 16
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: '3%',
        borderRadius: 200,
        backgroundColor: '#DF5F5F',
        

    },
    buttontext: {
        color: 'white',
        fontSize: 20,
        top:'7%'
    } 
});

export default matching;