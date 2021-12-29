import React, { useEffect, useState } from 'react';
import {SafeAreaView, TouchableOpacity, View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';


const applier = ({route,navigation}) => {
    const {title, postIndex} = route.params;
    const [petSitters, setPetSitters] = useState([]);
    const [ownerNickname , setOwnerNickname] = useState();
    const [closed, setClosed] = useState(0); //0이 확정x, 1이 확정o.
    // const petSitters = [
    //     {id: 1, image: require('../assets/images/friends/dog.png'), equals: 3, nickname: '말티즈밥줘', con1: ['강아지', '소형', '여성'], con2: ['30대', '있음', '없음'], address: '서울특별시 용산구'},
    //     {id: 2, image: require('../assets/images/friends/dog2.png'), equals: 3, nickname: '뽀미맘', con1: ['강아지', '소형', '여성'], con2: ['40대', '있음', '없음'], address: '경기도 용인시 기흥구'},
    //     {id: 3, image: require('../assets/images/friends/cat.png'), equals: 3, nickname: '체다사랑', con1: ['고양이', '소형', '여성'], con2: ['20대', '있음', '없음'], address: '경기도 용인시 수지구'},
        
    // ];
    console.log("여기가 applier");

    useEffect( ()=>{
        setOwnerNickname(ownerNickname);
    },[ownerNickname])

    useEffect(()=>{
        try{
            console.log("지원자 확인 들어옴"+postIndex);
            fetch("http://localhost:3030/match/showList",{
                method : "POST",
                body : JSON.stringify({
                    postIndex : postIndex
                }),
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(res=>res.json())
            .then((res)=>{
                console.log(res);
                console.log("지원자 수 : "+res.data.length);

                if(res.success && res.data.length!=0) {
                    for(i=0;i<res.data.length;i++){
                        console.log("정보 : "+res.data[i].userId);
                        setPetSitters((petSitters)=>[...petSitters, res.data[i]]);
                    }
                }
                else if(res.success && res.data.length==0) {
                    Alert.alert("아직 지원자가 없습니다");
                }
            })
        }catch(err) {
            
        }
    },[]);
    
    const UserList = () => {
        return (
            <ScrollView style={{top: 120}}>
                {petSitters.map(list => (
                    <UserScroll {...list}/>
                ))}
            </ScrollView>
        );
    };
    
    
    const UserScroll = ({equals, image, nickname, age, type, experience, license, residence, sex, size}) => {
        return (

            <View style = {{marginBottom:10}}>
                <View style={[styles.box, styles.userBox]}>
                    <View style={styles.userProfile}>
                        <Image source={require('../assets/images/friends/dog.png')} style={styles.profileImg}/>
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
                                    <Text style={styles.text, {color: 'black'}}>{sex}</Text>
                                </View>
                            </View>
                            <View style={styles.userInfoSmall}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>연령대 : </Text>
                                    <Text style={styles.text, {color: 'black'}}>{age}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>펫 키워본 경험 : </Text>
                                    <Text style={styles.text, {color: '#DF5F5F'}}>{experience}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.text}>자격증 : </Text>
                                    <Text style={styles.text, {color: 'black'}}>{license}</Text>
                                </View>
                            </View>
                        </View>
    
                        <Text style={styles.textAddress}>{residence}</Text>
    
                        <View>
                            {closed ? (
                                <TouchableOpacity style={styles.choiceButton} onPress={()=>{console.log("sendmail에게 "+nickname+"전송");action(nickname)}}>
                                <Text style={styles.choiceButtonText}>내 펫을 부탁해요!</Text>
                                </TouchableOpacity>
                            ): (
                                <TouchableOpacity style={[styles.choiceButton, {backgroundColor:"white", borderColor:'black', borderWidth:1, borderRadius:300}]} onPress={()=>{console.log("sendmail에게 "+nickname+"전송");action(nickname)}}
                                disabled={true}>
                                    <Text style={[styles.choiceButtonText, {color:"black"}]}>이미 펫시터를 확정했어요!</Text>
                                </TouchableOpacity>
                            )}

                        </View>
    
                    </View>
                </View>
            </View>
        );
    };
    
    const action = (nickname) => {
        Alert.alert("", nickname+"님에게 펫시터를 요청하시겠습니까?", [
            {text: "취소", onPress: ()=>{console.log("취소 누름")}},
            {text: "확인", onPress: ()=>{console.log("확인 누름"); getOwner(nickname);}}
        ]);
    }
    
    const getOwner = (nickname)=> {
        try{
            fetch('http://localhost:3030/match/getOwnerNickname', {
                method : "POST",
                body : JSON.stringify({
                    postIndex : postIndex
                }),
                headers : {
                    'Content-Type' : 'application/json'}
                }.then(res=>res.json())
                .then(res=> {
                    console.log("닉네임:"+res.data);
                    sendMail(nickname, ownerNickname);
                })
            )
        }catch(err){
            console.log(err);
        }
    }

    const sendMail = (nickname, ownerNickname)=>{
        try{
            console.log("들어옴"+nickname);
            fetch('http://localhost:3030/match/sendmail', {
                method : "POST",
                body : JSON.stringify({
                    owner : ownerNickname,
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
    


    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.header}>
                <View style={styles.textHeader}>
                    <Text style={styles.textHeaderNickname}>{ownerNickname}</Text>
                    <Text style={[styles.text, {top: '4%'}]}>님의 {title} 게시글에 지원한 지원자 목록입니다.</Text>
                </View>
            </View>

            <View style={{flex: 1, top: '-20%',marginTop:20}}>
                <UserList/>
            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'white'
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
        width: '45%',
        height: '5%'
    },
    buttontext: {
        color: 'white',
        fontSize: 20
    } 
});

export default applier;